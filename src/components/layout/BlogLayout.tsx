import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { AdSlot } from "@/components/AdSlot";

interface BlogLayoutProps {
  children: ReactNode;
  showTopAd?: boolean;
}

export function BlogLayout({ children, showTopAd = false }: BlogLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      {showTopAd && (
        <div className="container py-4">
          <AdSlot position="header" />
        </div>
      )}

      <main className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
}
