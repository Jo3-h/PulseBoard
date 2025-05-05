import React from "react";
import ProjectCard from "./cards/ProjectCard.jsx";
import useFetchData from "../hooks/useFetchData";

export default function Projects({}) {
  const content = useFetchData({ endpoint: "resume/projects" });

  return (
    <>
      <div className="w-full h-auto flex flex-row">
        <div className="w-1/5 h-full hidden md:flex"></div>
        <div className="w-full md:w-3/5 h-full flex flex-col  p-3">
          {content.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
        <div className="w-1/5 h-full hidden md:flex"></div>
      </div>
    </>
  );
}
