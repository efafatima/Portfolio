

import coffeeImage from "./Assest/Coffe.png";
import housingImage from "./Assest/Efa housing.png";
import issueTrackerImage from "./Assest/Issue Tracker.png";

export const projects = [
  {
    id: "01",
    slug: "project-one",
    title: "Coffee Website",
    description: "A modern coffee brand website showcasing products, story, and smooth animations with loaction based ordering.",
    summary: "A coffee brand website designed to present products, brand storytelling, and ordering information in one engaging experience.",
    whatIBuilt: "I built the responsive website layout, product-focused sections, animated interactions, and location-based ordering flow to give the brand a polished online presence.",
    outcome: "The result is a visually memorable, mobile-friendly coffee website that makes the brand easy to explore and its products easy to discover.",
    services: "Website Design\nAnimation\nTailwind CSS\nResponsive Design",
    year: "2025",
    image: coffeeImage.src,
    link: "/projects/project-one",
    demo: "blvck-tumbler-coffee-website.vercel.app",
    github: "https://github.com/efafatima/Blvck-Tumbler-Coffee-website.git"
  },
  {
    id: "02",
    slug: "project-two",
    title: "Real Estate Website",
    description: "A real estate property search interface that enables users to filter properties by location, price, and property type through a clean and user-friendly UI.",
    summary: "A real estate search experience that helps users discover suitable properties through clear filtering and an easy-to-scan interface.",
    whatIBuilt: "I built the responsive property listing interface, search and filter controls, and property cards for location, price, and property-type browsing.",
    outcome: "The result is a clean, user-friendly property discovery experience that helps visitors narrow down options quickly.",
    role: "Frontend Developer",
    services: "UI Development\nResponsive Design",
    year: "2025",
    image: housingImage.src,
    link: "/projects/project-two",
    demo: "real-estate-website-gamma-gilt.vercel.app",
    github: "https://github.com/efafatima/Real-Estate-website.git"
  },
  {
    id: "03",
    slug: "project-three",
    title: "Student Issue Tracker",
    description: "A university-level complaint management system that allows students to submit issues and track their resolution in real-time, ensuring transparency and efficient departmental response",
    summary: "A complaint management system that gives students a simple way to raise issues and follow their progress through to resolution.",
    whatIBuilt: "I built the student issue-submission flow, issue tracking interface, and the full-stack foundation needed to manage complaints and departmental responses.",
    outcome: "The result is a transparent workflow that makes issue reporting easier for students and helps departments respond more efficiently.",
    role: "Full Stack Developer",
    services: "Frontend Development\nBackend Development\nDatabase Management\nResponsive Design",
    year: "2026",
    image: issueTrackerImage.src,
    link: "/projects/project-three",
    demo: "issue-tracker-xi-jade.vercel.app",
    github: "https://github.com/efafatima/Issue-Tracker.git"
  }
];
