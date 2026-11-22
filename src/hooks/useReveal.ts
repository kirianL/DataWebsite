import { useEffect, useRef, useState } from "react";

export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
    if (window.matchMedia("(max-width: 767px)").matches) return true;
    return false;
  });

  useEffect(() => {
    if (visible) return;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.02, rootMargin: "120px 0px 120px 0px" }
    );

    observer.observe(el);
    const fallbackTimer = window.setTimeout(() => setVisible(true), 800);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallbackTimer);
    };
  }, [visible]);

  return { ref, visible };
}
