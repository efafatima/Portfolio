"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import visionImage from "./Assest/vision.jpg";
import servicesImage from "./Assest/services.jpg";

gsap.registerPlugin(ScrollTrigger);

const bioParagraphs = [
  "I completed my BS Computer Science from BZU Multan between 2022 and 2026, where I studied core computer science concepts including programming fundamentals, databases, data structures, software engineering, and web technologies.",
  "During this journey, I worked on different academic and practical projects that helped me improve my problem-solving ability, strengthen my development workflow, and understand how real digital products are planned, built, tested, and deployed.",
  "My current focus is full stack web and mobile development using React, Next.js, Node.js, React Native, Tailwind CSS, and Supabase, with a strong interest in building clean, scalable, and user-centered applications."
];

const visionWords =
  "My goal is to grow as a developer who can connect strong computer science fundamentals with modern product development. I want to build applications that are useful, reliable, accessible, and ready for real users while continuously improving my technical depth through projects, learning, and collaboration.".split(" ");

const skillCapsules = [
  "React",
  "Next.js",
  "Node.js",
  "React Native",
  "Supabase",
  "Tailwind CSS",
  "JavaScript",
  "Databases",
  "REST APIs",
  "GitHub",
  "GSAP",
  "UI/UX"
];

const services = [
  {
    number: "01",
    title: "Web Development",
    desc: "Building responsive websites and web applications with clean components, strong performance, and polished interfaces."
  },
  {
    number: "02",
    title: "Mobile App Development",
    desc: "Creating practical mobile app experiences with React Native, clean screens, reusable UI, and user-focused flows."
  },
  {
    number: "03",
    title: "Dashboard & API Integration",
    desc: "Developing admin dashboards, database-connected features, authentication flows, and business-focused web tools."
  }
];

export default function About() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".bio-para").forEach((para) => {
        gsap.to(para.querySelectorAll(".bio-word"), {
          opacity: 1,
          stagger: 0.025,
          ease: "none",
          scrollTrigger: {
            trigger: para,
            start: "top 82%",
            end: "bottom 58%",
            scrub: 1.4
          }
        });
      });

      gsap.to(".vision-word", {
        opacity: 1,
        stagger: 0.045,
        ease: "none",
        scrollTrigger: { trigger: ".vision-copy", start: "top 76%", end: "bottom 42%", scrub: 1 }
      });

      gsap.fromTo(
        ".skill-pill",
        { opacity: 0, y: 22, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: { trigger: ".skills-card", start: "top 82%" }
        }
      );

      gsap.fromTo(
        ".service-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: ".services-list", start: "top 82%" }
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={rootRef} className="about-section overflow-hidden bg-[#0C0F0E] text-[#F3F7F5]">
      <div className="relative grid gap-6 overflow-hidden px-6 py-20 lg:min-h-screen lg:grid-cols-[0.46fr_0.54fr] lg:px-10 lg:py-24">
        <img src={visionImage.src} alt="" data-image-reveal data-parallax="-6" className="pointer-events-none absolute inset-0 h-[112%] w-full object-cover object-center opacity-34" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(12,15,14,0.96)_0%,rgba(12,15,14,0.78)_48%,rgba(12,15,14,0.95)_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(12,15,14,0.94)_0%,rgba(12,15,14,0.72)_46%,rgba(12,15,14,0.96)_100%)]" />

        <article data-animate="slide-right" className="relative z-[1] flex min-h-0 flex-col justify-end overflow-hidden rounded-[8px] border border-[#F3F7F5]/16 bg-[#0C0F0E]/78 p-5 shadow-2xl shadow-black/45 backdrop-blur-md sm:p-7 lg:min-h-[520px] lg:p-10">
          <div className="relative z-[1]">
            <p className="mb-5 text-xs uppercase tracking-[0.2em] text-[#8FA39A]">(Biography)</p>
            <h2 className="mb-8 max-w-xl text-[clamp(2.25rem,12vw,3.75rem)] font-black uppercase leading-none md:text-6xl">
              Education
              <br />
              <span className="text-[#D7E2DC]/55">& Growth</span>
            </h2>
            <div className="space-y-7">
              {bioParagraphs.map((para) => (
                <p key={para} className="bio-para text-[0.96rem] leading-[1.75] tracking-normal text-[#F3F7F5] sm:text-[1.02rem] sm:leading-[1.85]">
                  {para.split(" ").map((word, index) => (
                    <span key={`${word}-${index}`} className="bio-word inline-block pr-[0.28em] opacity-[0.28]">
                      {word}
                    </span>
                  ))}
                </p>
              ))}
            </div>
          </div>
        </article>

        <div className="grid gap-6 lg:grid-rows-[0.48fr_0.52fr]">
          <article data-animate="slide-left" className="skills-card relative min-h-0 overflow-hidden rounded-[8px] border border-[#F3F7F5]/16 bg-[#0C0F0E]/76 p-5 shadow-2xl shadow-black/35 backdrop-blur-md sm:p-6 md:min-h-[300px] md:p-8">
            <div className="relative z-[1] flex h-full flex-col">
              <p className="mb-4 text-xs uppercase tracking-[0.2em] text-[#8FA39A]">(Skills)</p>
              <h3 data-word-reveal className="max-w-md text-2xl font-semibold leading-tight text-[#F3F7F5] md:text-4xl">
                Tools I work with.
              </h3>
              <div data-stagger="0.055" className="mt-8 flex flex-1 flex-wrap content-center items-center justify-center gap-3 md:gap-4">
                {skillCapsules.map((skill, index) => (
                  <span
                    key={skill}
                    data-stagger-item
                    className="skill-pill rounded-full border border-[#D7E2DC]/24 bg-[#0C0F0E]/72 px-4 py-2.5 text-[0.68rem] font-medium uppercase tracking-[0.1em] text-[#F3F7F5]/95 shadow-lg shadow-black/25 backdrop-blur-sm sm:px-5 sm:py-3 sm:text-xs sm:tracking-[0.14em]"
                    style={{ animationDelay: `${index * 0.18}s` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </article>

          <article data-animate="scale" className="relative min-h-0 overflow-hidden rounded-[8px] border border-[#F3F7F5]/16 bg-[#0C0F0E]/76 p-5 shadow-2xl shadow-black/35 backdrop-blur-md sm:p-6 md:min-h-[360px] md:p-8">
            <div className="relative z-[1]">
              <p className="mb-6 text-xs uppercase tracking-[0.2em] text-[#8FA39A]">(Vision)</p>
              <p className="vision-copy max-w-2xl text-lg font-light leading-[1.6] sm:text-xl md:text-3xl md:leading-[1.55]">
                {visionWords.map((word, index) => (
                  <span key={`${word}-${index}`} className="vision-word inline-block pr-2 opacity-20">
                    {word}
                  </span>
                ))}
              </p>
            </div>
          </article>
        </div>
      </div>

      <div className="relative flex min-h-screen items-center overflow-hidden px-5 py-20 sm:px-6 lg:px-10">
        <img src={servicesImage.src} alt="" data-image-reveal data-parallax="-7" className="pointer-events-none absolute inset-0 h-[115%] w-full object-cover object-center opacity-60" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(12,15,14,0.9)_0%,rgba(12,15,14,0.52)_48%,rgba(12,15,14,0.88)_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(12,15,14,0.88)_0%,rgba(12,15,14,0.32)_48%,rgba(12,15,14,0.92)_100%)]" />
        <div className="pointer-events-none absolute bottom-6 right-0 h-[520px] w-[520px] bg-[radial-gradient(circle,rgba(143,163,154,0.1)_0%,rgba(12,15,14,0)_70%)]" />

        <div data-animate="fade-up" className="relative z-[1] w-full rounded-[8px] border border-[#F3F7F5]/10 bg-[#0C0F0E]/42 p-5 shadow-2xl shadow-black/35 backdrop-blur-sm sm:p-7 lg:p-10">
          <p className="mb-6 text-xs uppercase tracking-[0.2em] text-[#8FA39A]">(Services)</p>
          <h2 className="max-w-5xl text-[clamp(2.1rem,11vw,4.5rem)] font-black leading-[0.98] md:text-7xl">
            What I can help for your
            <br />
            <span className="text-[#D7E2DC]">Business</span> / Product
          </h2>
          <div data-stagger="0.1" className="services-list mt-16">
            {services.map((service) => (
              <article key={service.number} data-stagger-item className="service-card group grid gap-4 border-t border-[#F3F7F5]/14 py-8 transition-colors duration-300 hover:border-[#8FA39A] hover:bg-[#141A18]/80 md:grid-cols-[0.2fr_1fr] md:gap-0 md:py-10">
                <span className="text-xs uppercase tracking-[0.2em] text-[#F3F7F5]/48 transition-colors duration-300 group-hover:text-[#D7E2DC]">{service.number}</span>
                <div>
                  <h3 className="text-2xl font-semibold transition-colors duration-300 group-hover:text-[#D7E2DC]">{service.title}</h3>
                  <p className="mt-4 max-w-xl leading-7 text-[#F3F7F5]/58">{service.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .skill-pill {
          animation: skill-float 5.5s ease-in-out infinite;
        }

        .skill-pill:nth-child(2n) {
          animation-duration: 6.2s;
        }

        .skill-pill:nth-child(3n) {
          animation-duration: 7s;
        }

        @keyframes skill-float {
          0%,
          100% {
            transform: translateY(0) rotate(-1deg);
          }
          50% {
            transform: translateY(-12px) rotate(1deg);
          }
        }
      `}</style>
    </section>
  );
}
