"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import Image from "next/image";
import SplitText from "./SplitText";

const HeroSlide: React.FC = () => {
  const images: string[] = useMemo(
    () => [
      "/heroslide1.jpg",
      "/heroslide2.jpg",
      "/heroslide3.jpg",
      "/heroslide4.jpg",
    ],
    []
  );

  const [current, setCurrent] = useState<number>(0);

  const handleAnimationComplete = useCallback(() => {
    console.log("All letters have animated!");
  }, []);

  // memoize animation objects so they don't get re-created on each render
  const splitFrom = useMemo(() => ({ opacity: 0, y: 40 }), []);
  const splitTo = useMemo(() => ({ opacity: 1, y: 0 }), []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="w-full h-[40vh] md:h-[60vh] relative overflow-hidden">
      {/* Images (stacked, crossfade) */}
      {images.map((src, idx) => (
        <div
          key={src}
          aria-hidden={idx !== current}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            idx === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={src}
            alt={`Hero slide ${idx + 1}`}
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
            quality={60} // turunkan quality untuk file size lebih kecil
            priority={idx === current} // pre-load slide aktif
            loading={idx === current ? "eager" : "lazy"}
          />
        </div>
      ))}

      {/* Overlay gelap + teks */}
      <div className="w-full h-full bg-black/40 flex flex-col items-center justify-center px-4 py-8 relative z-20">
        <SplitText
          text="Selamat Datang di Web"
          className="text-white text-3xl md:text-5xl font-semibold text-center block whitespace-normal break-words leading-tight"
          delay={100}
          duration={1}
          ease="elastic.out"
          splitType="chars"
          from={splitFrom}
          to={splitTo}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
          onLetterAnimationComplete={handleAnimationComplete}
        />
        <SplitText
          text="SD Negeri Proyonanggan 9 Batang"
          className="text-white text-3xl md:text-5xl font-semibold text-center block whitespace-normal break-words leading-tight"
          delay={50}
          duration={1}
          ease="elastic.out"
          splitType="chars"
          from={splitFrom}
          to={splitTo}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
          onLetterAnimationComplete={handleAnimationComplete}
        />
      </div>
    </div>
  );
};

export default HeroSlide;
