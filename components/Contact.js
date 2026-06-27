"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import girlImage from "./Assest/Girl.png";

gsap.registerPlugin(ScrollTrigger);

const email = "affifafatima1@gmail.com";

const quote =
  "I’m a developer who likes building things for users. I focus on understanding people’s needs and learning how to create simple, useful solutions step by step";

function splitWords(text) {
  return text.split(" ").map((word, index) => (
    <span key={`${word}-${index}`} className="contact-word inline-block opacity-[0.16]">
      {word}
    </span>
  ));
}

export default function Contact() {
  const sectionRef = useRef(null);
  const portraitRef = useRef(null);
  const portraitWrapRef = useRef(null);
  const quoteRef = useRef(null);
  const emailRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-link, .contact-kicker, .contact-title",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%"
          }
        }
      );

      gsap.fromTo(
        portraitRef.current,
        { opacity: 0, y: 96, scale: 0.6, rotate: 15, transformOrigin: "center bottom" },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotate: 0,
          duration: 1.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true
          }
        }
      );

      gsap.to(portraitWrapRef.current, {
        yPercent: -9,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.4
        }
      });

      gsap.to(quoteRef.current.querySelectorAll(".contact-word"), {
        opacity: 1,
        stagger: 0.045,
        scrollTrigger: {
          trigger: quoteRef.current,
          start: "top 72%",
          end: "bottom 28%",
          scrub: 1.5
        }
      });

      gsap.fromTo(
        emailRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: emailRef.current,
            start: "top 88%"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="relative min-h-screen overflow-hidden bg-[#0C0F0E] text-[#F3F7F5]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_52%_104%,rgba(52,211,153,0.54)_0%,rgba(52,211,153,0.26)_25%,rgba(20,26,24,0.62)_48%,rgba(12,15,14,0.96)_78%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_68%,rgba(243,247,245,0.08)_0%,rgba(12,15,14,0)_34%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#0C0F0E_0%,rgba(12,15,14,0.86)_25%,rgba(12,15,14,0.24)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[50vh] bg-[linear-gradient(180deg,rgba(12,15,14,0)_0%,rgba(52,211,153,0.38)_100%)]" />

      <div className="relative z-[1] grid min-h-screen grid-cols-1 px-6 pb-8 pt-28 md:px-10 lg:grid-cols-[0.24fr_0.31fr_0.45fr] lg:pt-24">
        <aside data-animate="slide-right" className="z-[2] hidden flex-col justify-between pb-24 text-xs text-[#8FA39A] lg:flex">
          <div className="mb-8">
            <p className="contact-kicker mb-4 text-[#8FA39A]">Got a project in mind?</p>
            <h2 data-word-reveal className="contact-title max-w-[260px] text-[clamp(2rem,3vw,3.2rem)] font-normal leading-[1.08] text-[#F3F7F5]">
              Let&apos;s make something happen together
            </h2>
          </div>
        </aside>

        <div ref={portraitWrapRef} data-animate="scale" className="pointer-events-none absolute bottom-[-14vh] left-1/2 z-[2] h-[112vh] w-[min(68vw,920px)] -translate-x-[58%] lg:left-[42%] lg:translate-x-[-50%]">
          <img
            ref={portraitRef}
            src={girlImage.src}
            alt=""
            className="h-full w-full object-contain object-bottom opacity-95 will-change-transform"
          />
        </div>

        <div className="relative z-[3] flex min-h-[54vh] flex-col justify-end lg:col-start-3 lg:min-h-0 lg:justify-start lg:pt-20">
          <div data-animate="fade-up" className="mb-14 lg:hidden">
            <p className="contact-kicker mb-4 text-xs text-[#8FA39A]">Got a project in mind?</p>
            <h2 data-word-reveal className="contact-title max-w-[360px] text-[clamp(2.4rem,11vw,4rem)] font-normal leading-[1.04] text-[#F3F7F5]">
              Let&apos;s make something happen together
            </h2>
          </div>

          <p ref={quoteRef} data-animate="slide-left" className="ml-auto flex max-w-[660px] flex-wrap gap-x-[0.35em] text-[clamp(1.45rem,2.2vw,2.7rem)] font-normal leading-[1.22] text-[#F3F7F5]">
            {splitWords(quote)}
          </p>
        </div>

        <div ref={emailRef} className="absolute bottom-9 left-0 z-[4] w-full overflow-hidden">
          <div className="contact-marquee flex whitespace-nowrap">
            {Array.from({ length: 4 }).map((_, index) => (
              <a
                key={index}
                href={`mailto:${email}`}
                className="contact-email inline-block pr-12 text-[clamp(4.4rem,10vw,10.5rem)] font-black lowercase leading-[0.82] tracking-normal text-[#F3F7F5] transition-colors duration-300 hover:text-[#34D399]"
              >
                {email}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .contact-marquee {
          animation: contact-marquee 16s linear infinite;
        }

        .contact-marquee:hover {
          animation-play-state: paused;
        }

        @keyframes contact-marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @media (max-width: 1023px) {
          .contact-email {
            color: #34D399;
          }
        }

        @media (max-width: 768px) {
          .contact-marquee {
            animation-duration: 22s;
          }
        }
      `}</style>
    </section>
  );
}
