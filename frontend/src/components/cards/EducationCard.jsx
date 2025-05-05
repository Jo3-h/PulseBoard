import React from "react";
import { useState, useEffect } from "react";
import { parseDate } from "../../utility/dateUtils";

function parseEducation(edu) {
  return {
    institution_name: edu.institution_name || "",
    qualification: edu.qualification || "",
    location: edu.location || "",
    start_date: edu.start_date || "",
    end_date: edu.end_date || "",
    currently_studying: edu.currently_studying || false,
    field_of_study: edu.field_of_study || "",
    description: edu.description || "",
  };
}

export default function EducationCard({ edu }) {
  const {
    institution_name,
    qualification,
    location,
    start_date,
    end_date,
    currently_studying,
    field_of_study,
    description,
  } = parseEducation(edu);
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => {
    setExpanded((prev) => !prev);
  };
  return (
    <>
      <div
        className="relative w-full h-auto mb-7 flex flex-col group cursor-pointer"
        onClick={() => toggleExpanded()}
      >
        <div className="h-18 rounded-t-xl bg-m-display flex flex-row items-center">
          <div className="text-white font-bold ml-4 md:text-xl justify-start truncate">
            {qualification} - {field_of_study}
          </div>
          <div className="grow flex text-xs md:text-sm justify-end mr-4 text-white font-bold">
            {parseDate(start_date)} {end_date ? ` - ${end_date}` : "- Present"}
          </div>
        </div>
        {/** Project Card Content Space */}
        <div
          className={`h-auto w-full min-h-10 bg-offwhite rounded-b-xl flex flex-col overflow-hidden relative ${
            expanded ? "max-h-10000" : "max-h-40"
          }`}
        >
          {/** Main Card Content */}
          <div className="p-5 tracking-wider">
            <div className="flex-col md:flex-row flex">
              <div className="w-full md:w-2/3">
                <div className="flex flex-row">
                  <div className="w-30 text-right mr-2 font-bold">
                    Intituation:{" "}
                  </div>
                  <div>{institution_name}</div>
                </div>
                <div className="flex flex-row">
                  <div className="w-30 text-right mr-2 font-bold">
                    Qualification:{" "}
                  </div>
                  <div>{qualification}</div>
                </div>
                <div className="flex flex-row">
                  <div className="w-30 text-right mr-2 font-bold">Field: </div>
                  <div className="text-left truncate">{field_of_study}</div>
                </div>
                <div className="flex flex-row">
                  <div className="w-30 text-right mr-2 font-bold">
                    Location:{" "}
                  </div>
                  <div className="text-left truncate">{location}</div>
                </div>
                <div className="flex flex-row mt-4 mx-5">
                  <div className="text-left">{description}</div>
                </div>
              </div>

              <div className="w-full md:w-1/3 flex flex-col justify-center items-center">
                <img
                  className="w-full h-auto rounded-3xl max-w-40"
                  loading="lazy"
                  src={`images/${institution_name}.png`}
                  alt="education"
                />
              </div>
            </div>
          </div>

          {/** Fade out bottom of card if not expanded*/}
          <div
            className={`absolute bottom-0 w-full h-30 z-30 bg-gradient-to-b from-transparent to-offwhite ${
              expanded ? "hidden" : ""
            }`}
          />
        </div>

        {/** Expand prompt as circle */}
        <div
          className={`absolute flex justify-center items-center w-[30px] h-[30px] rounded-full ${
            expanded ? "rotate-180" : ""
          } bg-light_gray bottom-[-15px] left-1/2 transform -translate-x-1/2 z-30
        group-hover:bg-l-display group-hover:translate-y-1/8 transition-all duration-500
        `}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
          >
            <path
              d="M12 5v14M5 12l7 7 7-7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div
          className="absolute bg-transparent text-transparent w-auto h-auto bottom-[-8px] left-1/2 transform translate-x-[26px] z-30 text-left text-xs
        group-hover:text-black group-hover:translate-y-[8px] transition-all duration-500"
        >
          {`${expanded ? "Collapse" : "Expand"} education`}
        </div>
      </div>
    </>
  );
}
