"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ImagePlus, Trash2, ChevronLeft, ChevronRight, Star } from "lucide-react";
import {
  uploadProductImage,
  deleteProductImage,
  moveProductImage,
} from "../../_store-actions";
import type { ProductImage } from "@/lib/types";

interface Props {
  productId: string;
  images: ProductImage[];
}

export function ImageManager({ productId, images }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  function upload(files: FileList | null) {
    if (!files || files.length === 0) return;
    setError(null);
    startTransition(async () => {
      // Uma por vez: cada upload precisa saber a posição da anterior.
      for (const file of Array.from(files)) {
        const fd = new FormData();
        fd.append("file", file);
        const res = await uploadProductImage(productId, fd);
        if (!res.ok) {
          setError(`${file.name}: ${res.error}`);
          break;
        }
      }
      router.refresh();
    });
  }

  function remove(id: string) {
    setError(null);
    startTransition(async () => {
      const res = await deleteProductImage(id);
      if (!res.ok) setError(res.error);
      router.refresh();
    });
  }

  function move(id: string, direction: "up" | "down") {
    startTransition(async () => {
      await moveProductImage(id, direction);
      router.refresh();
    });
  }

  return (
    <div className="space-y-4 max-w-3xl">
      {error ? (
        <div
          role="alert"
          className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200"
        >
          {error}
        </div>
      ) : null}

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          upload(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className={`rounded-2xl border-2 border-dashed px-6 py-10 text-center cursor-pointer transition ${
          dragOver
            ? "border-xv-orange bg-xv-orange-bg/60"
            : "border-xv-gray-300 hover:border-xv-orange hover:bg-xv-gray-50"
        }`}
      >
        <ImagePlus size={32} className="mx-auto text-xv-gray-400" />
        <p className="mt-3 font-display font-bold text-xv-navy">
          {isPending ? "Enviando…" : "Arraste fotos aqui ou clique para escolher"}
        </p>
        <p className="mt-1 text-xs text-xv-gray-500">
          JPG, PNG, WebP ou AVIF · até 5 MB cada · a primeira foto é a capa
        </p>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          multiple
          hidden
          onChange={(e) => {
            upload(e.currentTarget.files);
            e.currentTarget.value = "";
          }}
        />
      </div>

      {images.length === 0 ? (
        <p className="text-sm text-xv-gray-500 text-center py-4">
          Nenhuma foto ainda. Produto sem foto não vende.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img, i) => (
            <div
              key={img.id}
              className="group relative rounded-2xl overflow-hidden ring-1 ring-xv-gray-200 bg-white"
            >
              <div className="aspect-square bg-xv-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.url}
                  alt={img.alt ?? ""}
                  className="h-full w-full object-cover"
                />
              </div>

              {i === 0 ? (
                <span className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-full bg-xv-navy px-2.5 py-1 text-[10px] font-bold text-white">
                  <Star size={10} />
                  CAPA
                </span>
              ) : null}

              <div className="flex items-center justify-between px-2 py-2 border-t border-xv-gray-200">
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => move(img.id, "up")}
                    disabled={i === 0 || isPending}
                    className="rounded-lg p-1.5 text-xv-gray-700 hover:bg-xv-gray-100 disabled:opacity-30"
                    aria-label="Mover para a esquerda"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => move(img.id, "down")}
                    disabled={i === images.length - 1 || isPending}
                    className="rounded-lg p-1.5 text-xv-gray-700 hover:bg-xv-gray-100 disabled:opacity-30"
                    aria-label="Mover para a direita"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => remove(img.id)}
                  disabled={isPending}
                  className="rounded-lg p-1.5 text-red-600 hover:bg-red-50 disabled:opacity-40"
                  aria-label="Excluir foto"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
