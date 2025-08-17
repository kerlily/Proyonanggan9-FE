"use client";
import { useState, useEffect } from "react";

const HeroSlide: React.FC = () => {
  const images: string[] = [
    "https://picsum.photos/id/1018/1920/1080",
    "https://picsum.photos/id/1015/1920/1080",
    "https://picsum.photos/id/1024/1920/1080"
  ];

  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div
      className="w-full h-[40vh] md:h-120 bg-center bg-cover transition-all duration-700"
      style={{ backgroundImage: `url(${images[current]})` }}
    >
      {/* Overlay gelap */}
      <div className="w-full h-full bg-black/40 flex items-center justify-center">
        <h1 className="text-white text-4xl md:text-6xl font-bold drop-shadow-lg text-center px-4">
          Selamat Datang di Website Sekolah
        </h1>
      </div>
    </div>
  );
};

export default HeroSlide;
