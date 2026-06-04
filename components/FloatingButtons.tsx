"use client";

import { MessageCircle, MapPin } from "lucide-react";
import { whatsappUrl, googleMapsRouteUrl } from "@/lib/constants";

export default function FloatingButtons() {
  return (
    <div className="fixed bottom-4 left-4 right-4 z-40 flex gap-2 lg:hidden">
      <a
        href={googleMapsRouteUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 items-center justify-center gap-2 rounded-full bg-xv-navy py-3 text-sm font-bold text-white shadow-lg"
      >
        <MapPin size={18} />
        Como chegar
      </a>
      <a
        href={whatsappUrl("home")}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] py-3 text-sm font-bold text-white shadow-lg"
      >
        <MessageCircle size={18} />
        WhatsApp
      </a>
    </div>
  );
}
