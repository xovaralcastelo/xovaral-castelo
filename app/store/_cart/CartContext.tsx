"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

// ============================================================
// Carrinho da Store — estado no client, persistido em localStorage.
//
// O item guarda um SNAPSHOT de exibição (nome, preço, imagem) só para
// renderizar. O preço final NUNCA vem daqui: o fn_create_order recalcula
// tudo a partir do banco no momento do pedido. Se o admin mudar o preço,
// a confirmação mostra o valor real.
// ============================================================

const STORAGE_KEY = "xv-cart-v1";
const MAX_QTY = 10;

export interface CartItem {
  /** productId + ":" + (variantId ?? "") — identidade da linha */
  key: string;
  productId: string;
  slug: string;
  name: string;
  image: string | null;
  variantId: string | null;
  variantLabel: string | null;
  unitPriceCents: number;
  quantity: number;
  /** estoque conhecido no momento em que foi adicionado (teto do seletor) */
  maxStock: number | null;
  allowPickup: boolean;
  allowDelivery: boolean;
}

export type NewCartItem = Omit<CartItem, "key" | "quantity">;

interface CartContextValue {
  items: CartItem[];
  ready: boolean;
  count: number;
  subtotalCents: number;
  addItem: (item: NewCartItem, quantity?: number) => void;
  setQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function cartKey(productId: string, variantId: string | null): string {
  return `${productId}:${variantId ?? ""}`;
}

function clampQty(q: number, max: number | null): number {
  const ceiling = Math.min(MAX_QTY, max ?? MAX_QTY);
  return Math.max(1, Math.min(q, ceiling || 1));
}

function isValid(i: any): i is CartItem {
  return (
    i &&
    typeof i.key === "string" &&
    typeof i.productId === "string" &&
    typeof i.unitPriceCents === "number" &&
    typeof i.quantity === "number"
  );
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  // Carrega do localStorage só depois de montar (evita mismatch de hidratação).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setItems(parsed.filter(isValid));
      }
    } catch {
      // localStorage indisponível ou corrompido — começa vazio.
    }
    setReady(true);
  }, []);

  // Persiste a cada mudança (após o load inicial).
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignora quota/modo privado
    }
  }, [items, ready]);

  // Sincroniza entre abas.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return;
      try {
        const parsed = e.newValue ? JSON.parse(e.newValue) : [];
        setItems(Array.isArray(parsed) ? parsed.filter(isValid) : []);
      } catch {
        setItems([]);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const addItem = useCallback((item: NewCartItem, quantity = 1) => {
    const key = cartKey(item.productId, item.variantId);
    setItems((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) =>
          i.key === key
            ? { ...i, quantity: clampQty(i.quantity + quantity, item.maxStock) }
            : i,
        );
      }
      return [...prev, { ...item, key, quantity: clampQty(quantity, item.maxStock) }];
    });
  }, []);

  const setQuantity = useCallback((key: string, quantity: number) => {
    setItems((prev) =>
      prev.map((i) =>
        i.key === key ? { ...i, quantity: clampQty(quantity, i.maxStock) } : i,
      ),
    );
  }, []);

  const removeItem = useCallback((key: string) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((s, i) => s + i.quantity, 0);
    const subtotalCents = items.reduce(
      (s, i) => s + i.unitPriceCents * i.quantity,
      0,
    );
    return {
      items,
      ready,
      count,
      subtotalCents,
      addItem,
      setQuantity,
      removeItem,
      clear,
    };
  }, [items, ready, addItem, setQuantity, removeItem, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart precisa estar dentro de <CartProvider>");
  return ctx;
}
