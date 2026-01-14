import { useEffect, useRef } from "react";
import { useAds } from "@/hooks/useAds";

interface AdSlotProps {
  position: "header" | "sidebar" | "content" | "footer" | "article-top" | "article-middle" | "article-bottom";
  className?: string;
}

export function AdSlot({ position, className = "" }: AdSlotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { getAdByPosition, trackImpression, trackClick } = useAds();
  const ad = getAdByPosition(position);

  useEffect(() => {
    if (ad) {
      trackImpression(ad.id);
    }
  }, [ad?.id]);

  useEffect(() => {
    // Inject AdSense code if it's an adsense type
    if (ad?.type === "adsense" && ad.adsense_code && containerRef.current) {
      containerRef.current.innerHTML = ad.adsense_code;
      
      // Trigger AdSense script
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("AdSense error:", e);
      }
    }
  }, [ad?.adsense_code, ad?.type]);

  if (!ad) return null;

  if (ad.type === "banner" && ad.banner_image) {
    const content = (
      <img
        src={ad.banner_image}
        alt={ad.name}
        className="w-full h-auto rounded-lg"
      />
    );

    if (ad.banner_link) {
      return (
        <div className={`ad-slot ${className}`}>
          <a
            href={ad.banner_link}
            target="_blank"
            rel="noopener noreferrer sponsored"
            onClick={() => trackClick(ad.id)}
            className="block"
          >
            {content}
          </a>
          <span className="text-[10px] text-muted-foreground mt-1 block text-center">
            Publicidade
          </span>
        </div>
      );
    }

    return (
      <div className={`ad-slot ${className}`}>
        {content}
        <span className="text-[10px] text-muted-foreground mt-1 block text-center">
          Publicidade
        </span>
      </div>
    );
  }

  if (ad.type === "adsense") {
    return (
      <div className={`ad-slot ${className}`}>
        <div ref={containerRef} />
        <span className="text-[10px] text-muted-foreground mt-1 block text-center">
          Publicidade
        </span>
      </div>
    );
  }

  return null;
}
