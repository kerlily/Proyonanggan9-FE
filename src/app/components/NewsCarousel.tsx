"use client"

import React, { useRef, useEffect } from "react";
import NewsCard from "./NewsCard";

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  date: string;
}

export default function NewsCarousel({ items }: { items: NewsItem[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const noop = () => {};
    // keep the scroll listener minimal (no state updates) to allow visual indicators if needed later
    el.addEventListener("scroll", noop, { passive: true });
    return () => el.removeEventListener("scroll", noop);
  }, [items]);

  return (
    <div>
      <div
        ref={containerRef}
        className="overflow-x-auto overflow-y-hidden scroll-smooth no-scrollbar py-10"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <div className="flex gap-4 px-4">
          {items.map((it) => (
            <div key={it.id} className="snap-start shrink-0 w-full sm:w-1/2 lg:w-1/3 overflow-visible">
              <div className="overflow-visible">
                <NewsCard {...it} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
