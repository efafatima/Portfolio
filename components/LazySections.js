"use client";

import dynamic from "next/dynamic";

const Work = dynamic(() => import("@/components/Work"));
const About = dynamic(() => import("@/components/About"));
const Contact = dynamic(() => import("@/components/Contact"));

export default function LazySections() {
  return (
    <>
      <About />
      <Work />
      <Contact />
    </>
  );
}
