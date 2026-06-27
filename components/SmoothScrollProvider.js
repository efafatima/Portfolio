"use client";

import { createContext, useEffect, useMemo, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const SmoothScrollContext = createContext(null);

export default function SmoothScrollProvider({ children }) {
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const smoothScroll = new Lenis({
      smoothWheel: true,
      smoothTouch: true,
      wheelMultiplier: 1.2,
      lerp: isMobile ? 0.08 : 0.1,
      duration: 1.4
    });

    const update = (time) => smoothScroll.raf(time * 1000);

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    smoothScroll.on("scroll", ScrollTrigger.update);
    setLenis(smoothScroll);

    return () => {
      gsap.ticker.remove(update);
      smoothScroll.off("scroll", ScrollTrigger.update);
      smoothScroll.destroy();
    };
  }, []);

  const value = useMemo(() => ({ lenis }), [lenis]);

  return (
    <SmoothScrollContext.Provider value={value}>
      {children}
      <div className="grain-overlay" aria-hidden="true" />
    </SmoothScrollContext.Provider>
  );
}
