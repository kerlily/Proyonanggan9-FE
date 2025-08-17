// src/app/components/LazyLoadOnScroll.tsx
import dynamic from "next/dynamic";
import React, { useRef, useEffect, useState } from "react";

type LazyLoadOnScrollProps<T = unknown> = {
  loader: () => Promise<{ default: React.ComponentType<T> }>;
  loading?: React.ReactNode;
} & Partial<T>;

export default function LazyLoadOnScroll<T = unknown>({ loader, loading = <div>Loading...</div>, ...props }: LazyLoadOnScrollProps<T>) {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Dynamic import for the component; cast the dynamic result to component type with proper generic
  const DynamicComponent = (dynamic(loader as unknown as () => Promise<{ default: React.ComponentType<T> }>, {
    ssr: false,
    loading: () => loading,
  }) as unknown) as React.ComponentType<T>;

  useEffect(() => {
    if (!ref.current) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShow(true);
      },
      { threshold: 0.1 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-full h-full">
  {show ? React.createElement(DynamicComponent as React.ComponentType<unknown>, props as unknown as Record<string, unknown>) : null}
    </div>
  );
}