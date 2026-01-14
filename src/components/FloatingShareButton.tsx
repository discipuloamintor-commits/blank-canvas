import { useState } from "react";
import { Share2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SocialShareButtons } from "./SocialShareButtons";

interface FloatingShareButtonProps {
  url: string;
  title: string;
  description?: string;
}

export function FloatingShareButton({ url, title, description }: FloatingShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 md:hidden">
      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-card border border-border rounded-lg p-4 shadow-xl animate-in slide-in-from-bottom-2">
          <SocialShareButtons url={url} title={title} description={description} />
        </div>
      )}
      <Button
        size="icon"
        className="h-14 w-14 rounded-full shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Share2 className="h-6 w-6" />}
      </Button>
    </div>
  );
}
