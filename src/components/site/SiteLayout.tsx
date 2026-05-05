import { useEffect } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CartDrawer } from "@/components/site/CartDrawer";
import { FloatingActions } from "@/components/site/FloatingActions";
import { ChatBot } from "@/components/site/ChatBot";
import { useCart } from "@/store/cart";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => { useCart.persist.rehydrate(); }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
      <FloatingActions />
      <ChatBot />
    </div>
  );
}

