"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";
import Link from "next/link";

const sections = [
  { id: "what-built", label: "What I Built" },
  { id: "work-process", label: "Work process" },
  { id: "interface-direction", label: "Interface direction" },
  { id: "outcomes", label: "Outcomes" }
];

export default function ProjectDetail({ project }) {
  const [active, setActive] = useState(sections[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.15, 0.35, 0.6] }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <section className="relative min-h-screen overflow-hidden">
        <Link href="/#work" className="absolute left-8 top-8 z-20 text-xs text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]">
          &larr; Back
        </Link>

        <div className="absolute inset-0">
          <img src={project.image} alt={project.title} data-image-reveal data-parallax="-7" className="h-[115%] w-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-primary)]/10 via-[var(--bg-primary)]/0 to-[var(--bg-primary)]/65" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/0 to-[var(--bg-primary)]/0" />
        </div>

        <div className="relative z-10 grid min-h-screen content-end gap-12 px-8 pb-8 pt-28 lg:grid-cols-[1fr_0.35fr] lg:px-10">
          <div data-animate="fade-up" className="overflow-hidden">
            <h1 className="max-w-5xl translate-y-4 text-[clamp(4.5rem,10vw,9rem)] font-black uppercase leading-[0.86] tracking-normal">
              {project.title}
            </h1>
          </div>

          <aside data-animate="slide-left" className="mb-20 hidden space-y-20 text-sm lg:block">
            <Info label="Role" value={project.role} />
            <Info label="Services" value={project.services} multiline />
            <div className="flex justify-between text-xs text-[var(--text-primary)]">
              <span>&copy; {project.year}</span>
              <span>(Scroll down)</span>
            </div>
          </aside>
        </div>
      </section>

      <section className="relative min-h-screen px-8 py-28 lg:grid lg:grid-cols-[0.25fr_1fr_0.3fr] lg:gap-12 lg:px-10">
        <aside className="sticky top-28 hidden h-fit text-xs text-[var(--text-muted)] lg:block">
          <p className="mb-20 text-[var(--text-primary)]">(Intro)</p>
          <p className="mb-4">Summary</p>
          <ul className="space-y-4">
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className={active === section.id ? "text-[var(--accent)]" : "text-[var(--text-muted)]"}>
                  <span className="inline-block w-3">{active === section.id ? "*" : "-"}</span> {section.label}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        <div className="max-w-4xl">
          <p data-animate="fade-up" className="mb-14 text-[clamp(1.8rem,3vw,3.5rem)] font-semibold leading-tight">
            {project.summary}
          </p>
          <p data-animate="fade-up" className="mb-24 text-[clamp(1.6rem,2.6vw,3rem)] font-semibold leading-tight text-[var(--text-primary)]">
            {project.description}
          </p>

          <ContentSection id="what-built" title="What I Built">
            {project.whatIBuilt}
          </ContentSection>
          <ContentSection id="work-process" title="Work process">
            We shaped the experience through a tight design and development loop, testing motion ideas early and refining interface details until the page felt direct, fast, and intentional.
          </ContentSection>
          <ContentSection id="interface-direction" title="Interface direction">
            The visual direction uses strong contrast, restrained typography, and cinematic image placement so the project can feel premium without becoming noisy.
          </ContentSection>
          <ContentSection id="outcomes" title="Outcomes">
            <>
              {project.outcome}
              <a
                href={project.demo.startsWith("http") ? project.demo : `https://${project.demo}`}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center rounded-full border border-[var(--accent)] px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-primary)] transition-colors hover:bg-[var(--accent)] hover:text-[var(--bg-primary)]"
              >
                View Live Demo &rarr;
              </a>
            </>
          </ContentSection>
        </div>
      </section>
    </main>
  );
}

function ContentSection({ id, title, children }) {
  return (
    <section id={id} data-animate="fade-up" className="scroll-mt-28 border-t border-[var(--bg-surface)] py-20">
      <h2 data-word-reveal className="mb-8 text-4xl font-bold">{title}</h2>
      <div className="max-w-3xl leading-8 text-[var(--text-muted)]">{children}</div>
    </section>
  );
}

function Info({ label, value, multiline = false }) {
  return (
    <div>
      <p className="mb-3 text-xs text-[var(--text-muted)]">{label}</p>
      <p className={`text-sm leading-7 text-[var(--text-primary)] ${multiline ? "whitespace-pre-line" : ""}`}>{value}</p>
    </div>
  );
}
