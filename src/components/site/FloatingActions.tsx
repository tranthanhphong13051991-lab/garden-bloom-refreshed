import { Phone, MessageCircle } from "lucide-react";
import { SITE } from "@/data/site";

export function FloatingActions() {
  return (
    <div className="fixed bottom-5 right-5 z-30 flex flex-col gap-3">
      <a
        href={SITE.zalo}
        target="_blank"
        rel="noopener"
        aria-label="Chat Zalo"
        className="flex h-13 w-13 items-center justify-center rounded-full bg-[#0068ff] p-3.5 text-white shadow-elegant transition hover:scale-105"
      >
        <MessageCircle className="h-5 w-5" />
      </a>
      <a
        href={`tel:${SITE.phones[0]}`}
        aria-label="Gọi điện"
        className="flex h-13 w-13 items-center justify-center rounded-full bg-primary p-3.5 text-primary-foreground shadow-elegant transition hover:scale-105"
      >
        <Phone className="h-5 w-5" />
      </a>
    </div>
  );
}
