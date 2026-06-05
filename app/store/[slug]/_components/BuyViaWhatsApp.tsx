import { UNIT } from "@/lib/constants";
import { formatCents } from "@/lib/types";
import { ShoppingBag } from "lucide-react";

interface Props {
  productName: string;
  productSlug: string;
  priceCents: number;
}

export function BuyViaWhatsApp({ productName, productSlug, priceCents }: Props) {
  const price = formatCents(priceCents);
  const msg = `Olá! Vim pela Store Xô Varal e quero comprar:\n\n• Produto: ${productName}\n• Valor: ${price}\n• Link: https://castelo.xovaral.com/store/${productSlug}\n\nComo faço pra pagar e retirar?`;
  const url = `https://wa.me/${UNIT.contact.whatsapp}?text=${encodeURIComponent(msg)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-white shadow-md hover:brightness-110 transition"
    >
      <ShoppingBag size={16} />
      Comprar por {price} via WhatsApp
    </a>
  );
}
