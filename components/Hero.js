"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef } from "react";
import gsap from "gsap";
import heroBg from "./Assest/bg.png";

function renderChars(lines) {
  return lines.map((line) => (
    <span key={line} className="block overflow-hidden whitespace-nowrap">
      {line.split("").map((char, charIndex) => (
        <span key={`${line}-${charIndex}`} className="hero-heading-char inline-block">
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  ));
}

export default function Hero() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const developerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        bgRef.current,
        { opacity: 0, scale: 0.6, rotate: 15, transformOrigin: "center center" },
        { opacity: 1, scale: 1, rotate: 0, duration: 1.15, ease: "power3.out" }
      );

      gsap.set(".hero-subheading", { opacity: 0, y: 26 });
      gsap.set(".hero-heading-char", { opacity: 0, yPercent: 90, rotateX: 42, force3D: true });
      gsap.set(".hero-button", { opacity: 0, scale: 0.86, y: 18 });
      gsap.set(".hero-panel-item", { opacity: 0, y: 22 });

      const timeline = gsap.timeline({ delay: 0.45 });

      timeline
        .fromTo(
          ".hero-subheading",
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 0.85, stagger: 0.08, ease: "power3.out" }
        )
        .fromTo(
          ".hero-heading-char",
          { opacity: 0, yPercent: 90, rotateX: 42 },
          { opacity: 1, yPercent: 0, rotateX: 0, duration: 0.82, stagger: 0.01, ease: "power3.out", force3D: true },
          "-=0.2"
        )
        .fromTo(
          ".hero-button",
          { opacity: 0, scale: 0.86, y: 18 },
          { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.45"
        )
        .fromTo(
          ".hero-panel-item",
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "power3.out" },
          "-=0.55"
        );

      gsap.fromTo(
        developerRef.current,
        { color: "#F3F7F5", rotateX: 78, rotate: -4, y: 18, transformOrigin: "left center" },
        { color: "#8FA39A", rotateX: 0, rotate: 0, y: 0, duration: 1, delay: 0.95, ease: "power3.out" }
      );

      gsap.to(developerRef.current, {
        rotateX: 360,
        duration: 0.95,
        delay: 3,
        repeat: -1,
        repeatDelay: 3,
        transformOrigin: "center center",
        ease: "power3.inOut"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-svh w-full cursor-none overflow-hidden bg-[#0C0F0E]"
      style={{ perspective: "1200px" }}
    >
      <img
        ref={bgRef}
        src={heroBg.src}
        alt="Affifa Fatima background"
        className="absolute left-0 top-[-8vh] z-[1] h-[116svh] w-full object-cover object-center opacity-0 will-change-transform"
      />

      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background: "linear-gradient(to right, rgba(12,15,14,0.88) 35%, rgba(12,15,14,0.25) 100%)"
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 z-[3]"
      >
        <div className="absolute bottom-20 left-5 max-w-[calc(100vw-2.5rem)] sm:left-8 md:bottom-16">
          <p className="hero-subheading mb-1 text-sm text-[#8FA39A]">Hi there! this is</p>
          <p className="hero-subheading mb-6 text-lg font-light text-[#F3F7F5]">
            <strong>Affifa</strong> <span className="text-[#8FA39A]">Fatima</span>
          </p>
          <h1 className="hero-text text-[clamp(2.35rem,12.4vw,7.5rem)] font-black uppercase leading-[0.9] tracking-normal text-[#F3F7F5] min-[390px]:text-[clamp(2.55rem,13vw,7.5rem)] sm:text-[clamp(3.5rem,8.5vw,7.5rem)]">
            {renderChars(["FULL STACK", "WEB & MOBILE"])}
            <span className="block overflow-hidden">
              <span ref={developerRef} className="inline-block whitespace-nowrap text-[#8FA39A]">
                {"DEVELOPER".split("").map((char, index) => (
                  <span key={index} className="hero-heading-char inline-block">
                    {char}
                  </span>
                ))}
              </span>
            </span>
          </h1>
          <a
            href="#work"
            className="hero-button pointer-events-auto mt-7 inline-flex max-w-full items-center rounded-full border border-[#34D399]/40 bg-[#0C0F0E]/40 px-5 py-3 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[#F3F7F5] backdrop-blur-sm transition-all duration-300 hover:border-[#34D399] hover:bg-[#34D399] hover:text-[#0C0F0E] sm:mt-8 sm:px-6 sm:text-xs sm:tracking-[0.18em]"
          >
            View Projects &rarr;
          </a>
        </div>

        <div className="absolute bottom-16 right-8 top-[18vh] hidden w-[min(28vw,360px)] flex-col justify-between text-left lg:flex">
          <div className="mt-20">
            <div className="hero-panel-item mb-5 h-px w-full bg-[#F3F7F5]/16" />
            <div className="hero-panel-item space-y-3 text-sm leading-none text-[#8FA39A]">
              <p>Web Development</p>
              <p>Mobile App Development</p>
              <p>Dashboard & API Integration</p>
            </div>
            <div className="hero-panel-item my-6 h-px w-full bg-[#F3F7F5]/16" />
            <a
              href="#contact"
              className="hero-panel-item pointer-events-auto flex items-center justify-between text-sm font-semibold text-[#F3F7F5] underline underline-offset-4 transition-colors hover:text-[#8FA39A]"
            >
              <span>How can I help?</span>
              <span aria-hidden="true">&nearr;</span>
            </a>
          </div>
          <p className="hero-panel-item max-w-[310px] text-sm leading-6 text-[#D7E2DC]">
            I&apos;m a full stack web and mobile developer focused on practical, responsive, and user-centered digital products.
          </p>
        </div>

        <p className="hero-panel-item absolute bottom-7 left-5 text-xs tracking-[0.1em] text-[#8FA39A] sm:left-8">(Scroll down)</p>
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[4] opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px"
        }}
      />
    </section>
  );
}
