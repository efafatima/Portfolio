"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SectionDivider({ className = "" }) {
  const lineRef = useRef(null);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: lineRef.current,
      start: "top 88%",
      end: "bottom 60%",
      scrub: true,
      animation: gsap.fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, ease: "none" })
    });

    return () => trigger.kill();
  }, []);

  return (
    <div className={`h-px w-full overflow-hidden ${className}`}>
      <div ref={lineRef} className="h-px w-full origin-left bg-slate" />
    </div>
  );
}
