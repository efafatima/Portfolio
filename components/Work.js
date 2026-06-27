"use client";

/* eslint-disable @next/next/no-img-element, react-hooks/exhaustive-deps */

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "./projectData";

gsap.registerPlugin(ScrollTrigger);

export default function Work() {
  const wrapperRef = useRef(null);
  const stageRef = useRef(null);
  const scrollDistance = `${Math.max(projects.length - 1, 1) * 100}vh`;
  const currentIndex = useRef(0);
  const isAnimating = useRef(false);

  const titleRef = useRef(null);
  const descRef = useRef(null);
  const yearRef = useRef(null);
  const linkRef = useRef(null);
  const imageRef = useRef(null);
  const imageLinkRef = useRef(null);
  const viewRef = useRef(null);
  const counterRef = useRef(null);
  const thumbsRef = useRef([]);

  const getGithubLink = (project) => project.github || project.link;

  const setContent = (index) => {
    const project = projects[index];

    titleRef.current.textContent = project.title;
    descRef.current.textContent = project.description;
    yearRef.current.textContent = `(c) ${project.year}`;
    linkRef.current.href = getGithubLink(project);
    imageRef.current.src = project.image;
    imageRef.current.alt = project.title;
    counterRef.current.textContent = `0${index + 1} / 0${projects.length}`;

    thumbsRef.current.forEach((thumb, thumbIndex) => {
      if (!thumb) return;

      const active = thumbIndex === index;
      const image = thumb.querySelector("img");

      thumb.style.height = active ? "80px" : "1px";
      thumb.style.borderColor = active ? "#34D399" : "#141A18";
      thumb.style.backgroundColor = active ? "#0C0F0E" : "#141A18";

      if (image) {
        image.style.opacity = active ? "1" : "0";
      }
    });
  };

  const goToProject = (nextIndex) => {
    if (isAnimating.current) return;
    if (nextIndex < 0 || nextIndex >= projects.length) return;
    if (nextIndex === currentIndex.current) return;

    isAnimating.current = true;

    const textRefs = [titleRef.current, descRef.current, yearRef.current, linkRef.current];

    gsap.timeline({
      onComplete: () => {
        currentIndex.current = nextIndex;
        isAnimating.current = false;
      }
    })
      .to(textRefs, {
        y: -50,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: "power2.in"
      }, 0)
      .to(imageRef.current, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.62,
        ease: "power3.in"
      }, 0)
      .call(() => {
        setContent(nextIndex);
        gsap.set(textRefs, { y: 60 });
        gsap.set(imageRef.current, { clipPath: "inset(100% 0 0 0)" });
      })
      .to(textRefs, {
        y: 0,
        opacity: 1,
        duration: 0.72,
        stagger: 0.06,
        ease: "power3.out"
      }, "+=0.08")
      .to(imageRef.current, {
        clipPath: "inset(0 0 0% 0)",
        duration: 0.82,
        ease: "power3.out"
      }, "-=0.52");
  };

  useEffect(() => {
    const mm = gsap.matchMedia();

    setContent(0);
    gsap.set(imageRef.current, { clipPath: "inset(0 0 0% 0)" });

    mm.add("(min-width: 769px)", () => {
      const trigger = ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: `+=${scrollDistance}`,
        pin: stageRef.current,
        pinSpacing: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const segment = 1 / projects.length;
          const nextIndex = Math.min(Math.floor(self.progress / segment), projects.length - 1);

          if (nextIndex !== currentIndex.current) {
            goToProject(nextIndex);
          }
        }
      });

      ScrollTrigger.refresh();

      return () => trigger.kill();
    });

    return () => mm.revert();
  }, []);

  useEffect(() => {
    const link = imageLinkRef.current;
    const view = viewRef.current;
    if (!link || !view) return undefined;

    const xTo = gsap.quickTo(view, "x", { duration: 0.3, ease: "power3.out" });
    const yTo = gsap.quickTo(view, "y", { duration: 0.3, ease: "power3.out" });

    const move = (event) => {
      const bounds = link.getBoundingClientRect();
      xTo(event.clientX - bounds.left - bounds.width / 2);
      yTo(event.clientY - bounds.top - bounds.height / 2);
    };

    const leave = () => {
      xTo(0);
      yTo(0);
    };

    link.addEventListener("mousemove", move);
    link.addEventListener("mouseleave", leave);

    return () => {
      link.removeEventListener("mousemove", move);
      link.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <section
      id="work"
      ref={wrapperRef}
      className="projects-wrapper relative min-h-screen bg-[var(--bg)] text-[var(--text)]"
    >
      <div ref={stageRef} className="projects-stage relative min-h-screen w-full overflow-hidden bg-[var(--bg)] md:flex md:h-screen">
        <div className="left-panel relative z-[2] hidden flex-col justify-between px-10 pb-16 pt-20 md:flex md:w-[42%]">
          <div>
            <h2
              ref={titleRef}
              className="mb-24 whitespace-nowrap text-[clamp(48px,6.5vw,96px)] font-black uppercase leading-[0.88] tracking-normal text-[var(--text)]"
            />

            <div className="max-w-[20rem]">
              <p className="mb-2 text-xs tracking-[0.05em] text-[var(--muted)]">Description</p>
              <p ref={descRef} className="text-sm leading-[1.65] text-[var(--text)]" />
            </div>
          </div>

          <div className="mt-10 flex max-w-[20rem] items-center justify-between">
            <span ref={yearRef} className="text-xs text-[var(--muted)]" />
            <a
              ref={linkRef}
              href={getGithubLink(projects[0])}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-[var(--text)] underline underline-offset-4 transition-colors hover:text-[var(--accent)]"
            >
              GitHub Repo &rarr;
            </a>
          </div>

          <p className="absolute bottom-8 left-10 text-xs tracking-[0.08em] text-[var(--muted)]">(Scroll down)</p>
        </div>

        <div className="hidden w-[4%] md:block" />

        <div className="right-panel relative hidden w-[43%] items-center justify-center overflow-hidden md:flex">
          <a
            ref={imageLinkRef}
            href={projects[0].link}
            onClick={(event) => {
              event.currentTarget.href = projects[currentIndex.current].link;
            }}
            className="image-shell group relative block h-[76vh] w-[min(34vw,32rem)] overflow-hidden"
          >
            <img ref={imageRef} src={projects[0].image} alt={projects[0].title} className="proj-image block h-full w-full object-cover object-center" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[var(--bg)]/65 via-[var(--bg)]/0 to-[var(--bg)]/0" />
            <span ref={viewRef} className="pointer-events-none absolute left-1/2 top-1/2 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 scale-75 place-items-center rounded-full border border-[var(--accent)] bg-[var(--bg)]/30 text-sm uppercase tracking-[0.15em] text-[var(--text)] opacity-0 backdrop-blur-sm transition-[opacity,transform] duration-300 group-hover:scale-100 group-hover:opacity-100">
              View
            </span>
          </a>
        </div>

        <div ref={counterRef} className="counter absolute bottom-8 right-8 z-10 hidden text-sm font-medium tracking-[0.12em] text-[var(--text)] md:block" />

        <div className="thumbnails-strip absolute right-8 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-4 md:flex">
          {projects.map((project, index) => (
            <button
              key={project.id}
              type="button"
              ref={(element) => {
                thumbsRef.current[index] = element;
              }}
              onClick={() => goToProject(index)}
              className="thumb h-px w-[60px] overflow-hidden border border-[var(--surface)] bg-[var(--surface)] opacity-100 transition-all duration-300"
              aria-label={`View ${project.title}`}
            >
              <img src={project.image} alt="" className="h-full w-full object-cover opacity-0 transition-opacity duration-300" />
            </button>
          ))}
        </div>

        <div data-stagger="0.12" className="flex min-h-screen w-full flex-col md:hidden">
          {projects.map((project) => (
            <article
              key={project.id}
              data-stagger-item
              className="flex min-h-svh flex-col justify-center px-5 py-24 sm:px-8"
            >
              <img src={project.image} alt={project.title} data-image-reveal className="mb-8 aspect-[4/5] max-h-[48svh] w-full object-cover sm:mb-10 sm:aspect-[5/4]" />
              <h2 className="mb-6 break-words text-[clamp(2.45rem,12vw,3.75rem)] font-black uppercase leading-none sm:mb-8">{project.title}</h2>
              <p className="text-sm leading-7 text-[var(--text)]">{project.description}</p>
              <a href={getGithubLink(project)} target="_blank" rel="noreferrer" className="mt-10 inline-block text-sm underline underline-offset-4">
                GitHub Repo &rarr;
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
