import React from "react";
import ExperienceCard from "./cards/ExperienceCard";
import useFetchData from "../hooks/useFetchData";

export default function Experience({}) {
  const content = useFetchData({ endpoint: "resume/experience" });

  return (
    <>
      <div className="w-full h-auto flex flex-row">
        <div className="w-1/5 h-full hidden md:flex"></div>
        <div className="w-full md:w-3/5 h-full flex flex-col  p-3">
          {content.map((experience, index) => (
            <ExperienceCard key={index} exp={experience} />
          ))}
        </div>
        <div className="w-1/5 h-full hidden md:flex"></div>
      </div>
    </>
  );
}
