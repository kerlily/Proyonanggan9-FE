"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import SplitText from "./SplitText";


const HeroSlide: React.FC = () => {
  const images: string[] = [
    "https://picsum.photos/id/1018/1920/1080",
    "https://picsum.photos/id/1015/1920/1080",
    "https://picsum.photos/id/1024/1920/1080"
  ];

  const [current, setCurrent] = useState<number>(0);

  const handleAnimationComplete = useCallback(() => {
    console.log('All letters have animated!');
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
    <div
      className="w-full h-[40vh] md:h-[60vh] bg-center bg-cover transition-all duration-700"
      style={{ backgroundImage: `url(${images[current]})` }}
    >
      {/* Overlay gelap */}
      <div className="w-full h-full bg-black/40 flex flex-col items-center justify-center px-4 py-8">
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
