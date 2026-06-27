"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dotX = gsap.quickTo(dotRef.current, "x", { duration: 0.08, ease: "power3.out" });
    const dotY = gsap.quickTo(dotRef.current, "y", { duration: 0.08, ease: "power3.out" });
    const ringX = gsap.quickTo(ringRef.current, "x", { duration: 0.15, ease: "power3.out" });
    const ringY = gsap.quickTo(ringRef.current, "y", { duration: 0.15, ease: "power3.out" });

    const move = (event) => {
      dotX(event.clientX - 4);
      dotY(event.clientY - 4);
      ringX(event.clientX - 20);
      ringY(event.clientY - 20);
    };

    const enter = () => gsap.to(ringRef.current, { scale: 1.5, duration: 0.25, ease: "power3.out" });
    const leave = () => gsap.to(ringRef.current, { scale: 1, duration: 0.25, ease: "power3.out" });
    const click = () => {
      gsap.fromTo(ringRef.current, { scale: 0.8 }, { scale: 1, duration: 0.35, ease: "elastic.out(1, 0.5)" });
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", click);

    const targets = document.querySelectorAll("a, button, input, textarea, [data-cursor='hover']");
    targets.forEach((target) => {
      target.addEventListener("mouseenter", enter);
      target.addEventListener("mouseleave", leave);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", click);
      targets.forEach((target) => {
        target.removeEventListener("mouseenter", enter);
        target.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  return (
    <>
      <span ref={dotRef} className="cursor-dot pointer-events-none fixed left-0 top-0 z-[120] h-2 w-2 rounded-full bg-[#F3F7F5]" />
      <span ref={ringRef} className="cursor-ring pointer-events-none fixed left-0 top-0 z-[119] h-10 w-10 rounded-full border border-[#F3F7F5]" />
    </>
  );
}
