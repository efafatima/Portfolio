"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

const links = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" }
];

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "GitHub", href: "https://github.com/efafatima" }
];

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 5) return "Good night!";
  if (hour < 12) return "Good morning!";
  if (hour < 17) return "Good afternoon!";
  if (hour < 21) return "Good evening!";
  return "Good night!";
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [greeting, setGreeting] = useState("Good morning!");
  const panelRef = useRef(null);
  const isProjectPage = pathname?.startsWith("/projects");

  useEffect(() => {
    if (isProjectPage || !panelRef.current) return;

    gsap.to(panelRef.current, {
      x: open ? "0%" : "100%",
      duration: 0.7,
      ease: "power4.out"
    });
  }, [open, isProjectPage]);

  useEffect(() => {
    if (isProjectPage) return;

    setGreeting(getGreeting());

    const interval = window.setInterval(() => {
      setGreeting(getGreeting());
    }, 60000);

    return () => window.clearInterval(interval);
  }, [isProjectPage]);

  if (isProjectPage) return null;

  return (
    <header className="fixed left-0 top-0 z-[100] w-full px-5 py-5 text-xs text-ivory md:px-10">
      <nav className="relative flex items-center justify-between">
        <a href="#home" className="nav-underline min-h-11 content-center font-medium normal-case tracking-normal text-ivory/70">
          {greeting}
        </a>

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-3 md:flex">
          <span className="font-bold text-ivory">Socials</span>
          {socials.map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noreferrer" className="nav-underline text-ivory/48">
              {social.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-6 uppercase tracking-[0.16em] md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="nav-underline min-h-11 content-center">
              {link.label}
            </a>
          ))}
          <a
            href="/Affifa-Fatima-CV.pdf"
            download
            className="rounded-full border border-[#34D399]/45 px-4 py-3 text-[0.68rem] leading-none text-[#34D399] transition-all duration-300 hover:border-[#34D399] hover:bg-[#34D399] hover:text-[#0C0F0E]"
          >
            Download CV
          </a>
        </div>

        <button
          type="button"
          className="relative z-[102] min-h-11 min-w-11 text-right md:hidden"
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      <div
        ref={panelRef}
        className="fixed right-0 top-0 z-[101] flex h-dvh w-full translate-x-full flex-col justify-end gap-8 bg-charcoal px-8 pb-16 text-4xl font-display normal-case tracking-normal text-ivory md:hidden"
      >
        {links.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
        <a href="/Affifa-Fatima-CV.pdf" download onClick={() => setOpen(false)}>
          Download CV
        </a>
      </div>
    </header>
  );
}
