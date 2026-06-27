"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function GlobalScrollEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanup = [];
    let refreshFrame = null;
    let mutationTimer = null;

    const refreshSoon = () => {
      if (refreshFrame) return;

      refreshFrame = window.requestAnimationFrame(() => {
        refreshFrame = null;
        ScrollTrigger.refresh();
      });
    };

    const ctx = gsap.context(() => {
      const variants = {
        "fade-up": { autoAlpha: 0, y: 34 },
        "fade-in": { autoAlpha: 0 },
        "slide-left": { autoAlpha: 0, x: 44 },
        "slide-right": { autoAlpha: 0, x: -44 },
        scale: { autoAlpha: 0, scale: 0.96 },
        "scale-in": { autoAlpha: 0, scale: 0.86 }
      };

      const initElementAnimations = () => {
        gsap.utils.toArray("[data-animate], [data-scroll-reveal]").forEach((element) => {
          if (element.dataset.gsapInit === "true") return;

          element.dataset.gsapInit = "true";

          const type = element.dataset.animate || "fade-up";
          const fromVars = variants[type] || variants["fade-up"];
          const duration = Number(element.dataset.duration) || 0.75;
          const delay = Number(element.dataset.delay) || 0;

          if (reduceMotion) {
            gsap.set(element, { autoAlpha: 1, clearProps: "transform,filter" });
            return;
          }

          gsap.set(element, { ...fromVars, force3D: true, willChange: "transform, opacity" });
          gsap.to(element, {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration,
            delay,
            ease: "power3.out",
            force3D: true,
            clearProps: "willChange",
            scrollTrigger: {
              trigger: element,
              start: "top 86%",
              once: true
            }
          });
        });

        gsap.utils.toArray("[data-stagger]").forEach((container) => {
          if (container.dataset.gsapInit === "true") return;

          const children = container.querySelectorAll("[data-stagger-item]");
          if (!children.length) return;

          container.dataset.gsapInit = "true";

          if (reduceMotion) {
            gsap.set(children, { autoAlpha: 1, clearProps: "transform,filter" });
            return;
          }

          gsap.set(children, { autoAlpha: 0, y: 28, scale: 0.98, force3D: true, willChange: "transform, opacity" });
          gsap.to(children, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            stagger: Number(container.dataset.stagger) || 0.08,
            ease: "power3.out",
            force3D: true,
            clearProps: "willChange",
            scrollTrigger: {
              trigger: container,
              start: "top 86%",
              once: true
            }
          });
        });

        gsap.utils.toArray("[data-word-reveal]").forEach((element) => {
          if (element.dataset.gsapInit === "true") return;

          const words = element.textContent.trim().split(/\s+/);
          if (!words.length) return;

          element.dataset.gsapInit = "true";
          element.innerHTML = words
            .map((word) => `<span class="word-reveal inline-block overflow-hidden pr-[0.18em]"><span class="word-reveal-inner inline-block">${word}</span></span>`)
            .join(" ");

          const wordNodes = element.querySelectorAll(".word-reveal-inner");

          if (reduceMotion) {
            gsap.set(wordNodes, { autoAlpha: 1, clearProps: "transform" });
            return;
          }

          gsap.set(wordNodes, { autoAlpha: 0, yPercent: 110, rotateX: 24, force3D: true, willChange: "transform, opacity" });
          gsap.to(wordNodes, {
            autoAlpha: 1,
            yPercent: 0,
            rotateX: 0,
            duration: Number(element.dataset.wordDuration) || 0.9,
            stagger: Number(element.dataset.wordStagger) || 0.055,
            ease: "power3.out",
            force3D: true,
            clearProps: "willChange",
            scrollTrigger: {
              trigger: element,
              start: "top 86%",
              once: true
            }
          });
        });

        gsap.utils.toArray("[data-image-reveal]").forEach((image) => {
          if (image.dataset.gsapImageInit === "true") return;

          image.dataset.gsapImageInit = "true";

          if (reduceMotion) {
            gsap.set(image, { autoAlpha: 1, clearProps: "transform,filter" });
            return;
          }

          gsap.set(image, {
            autoAlpha: 0,
            y: 92,
            scale: 0.8,
            rotate: -3,
            transformOrigin: "center center",
            force3D: true,
            willChange: "transform, opacity"
          });
          gsap.to(image, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            rotate: 0,
            duration: Number(image.dataset.imageDuration) || 1,
            ease: "power3.out",
            force3D: true,
            clearProps: "willChange",
            scrollTrigger: {
              trigger: image,
              start: "top 70%",
              once: true
            }
          });
        });

        if (!reduceMotion) {
          gsap.utils.toArray("[data-parallax]").forEach((element) => {
            if (element.dataset.gsapParallaxInit === "true") return;
            if (element.dataset.imageReveal !== undefined) return;

            element.dataset.gsapParallaxInit = "true";

            const speed = Number(element.dataset.parallax) || -8;

            gsap.to(element, {
              yPercent: speed,
              ease: "none",
              force3D: true,
              scrollTrigger: {
                trigger: element.closest("section") || element,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.4
              }
            });
          });
        }

        refreshSoon();
      };

      initElementAnimations();

      const delayedInit = window.setTimeout(initElementAnimations, 350);
      cleanup.push(() => window.clearTimeout(delayedInit));

      const observer = new MutationObserver(() => {
        window.clearTimeout(mutationTimer);
        mutationTimer = window.setTimeout(initElementAnimations, 180);
      });

      observer.observe(document.body, { childList: true, subtree: true });
      cleanup.push(() => observer.disconnect());
    });

    refreshSoon();

    return () => {
      cleanup.forEach((destroy) => destroy());
      window.clearTimeout(mutationTimer);
      if (refreshFrame) window.cancelAnimationFrame(refreshFrame);
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
