import { notFound } from "next/navigation";
import { projects } from "@/components/projectData";
import ProjectDetail from "@/components/ProjectDetail";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }) {
  const project = projects.find((item) => item.slug === params.slug);

  if (!project) return {};

  return {
    title: `${project.title} | Affifa Fatima`,
    description: project.description
  };
}

export default function ProjectPage({ params }) {
  const project = projects.find((item) => item.slug === params.slug);

  if (!project) notFound();

  return <ProjectDetail project={project} />;
}
