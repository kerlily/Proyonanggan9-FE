import dynamic from "next/dynamic";
import { useRef, useEffect, useState } from "react";

const SchoolInfo = dynamic(() => import("./SchoolInfo"), {
  ssr: false,
  loading: () => <div className="text-center py-8">Loading...</div>,
});

export default function SchoolInfoLoader() {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

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
    <div ref={ref}>
      {show ? <SchoolInfo /> : null}
    </div>
  );
}
