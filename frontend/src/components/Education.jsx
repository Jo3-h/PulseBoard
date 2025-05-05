import React from "react";
import EducationCard from "./cards/EducationCard";
import useFetchData from "../hooks/useFetchData";

export default function Education({}) {
  const content = useFetchData({ endpoint: "resume/education" });

  return (
    <>
      <div className="w-full h-auto flex flex-row">
        <div className="w-1/5 h-full hidden md:flex"></div>
        <div className="w-full md:w-3/5 h-full flex flex-col  p-3">
          {content.map((education, index) => (
            <EducationCard key={index} edu={education} />
          ))}
        </div>
        <div className="w-1/5 h-full hidden md:flex"></div>
      </div>
    </>
  );
}
