import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { parseDate } from "../../utility/dateUtils";
import remarkGfm from "remark-gfm";

function parseProject(project) {
  console.log("ProjectCard project: ", project);
  return {
    frontend_stack: project.frontend_tech_stack
      ? project.frontend_tech_stack.split(",").map((item) => item.trim())
      : [],
    backend_stack: project.backend_tech_stack
      ? project.backend_tech_stack.split(",").map((item) => item.trim())
      : [],
    database_stack: project.database_tech_stack
      ? project.database_tech_stack.split(",").map((item) => item.trim())
      : [],
    description: project.description || "",
    github_url: project.github_url || "",
    images: project.image_url
      ? project.image_url.split(",").map((item) => item.trim())
      : [],
    display_image: project.display_image || "",
  };
}

export default function ProjecCard({ project }) {
  const {
    frontend_stack,
    backend_stack,
    database_stack,
    description,
    github_url,
    images,
    display_image,
  } = parseProject(project);
  const [expanded, setExpanded] = useState(false);

  // function to toggle whether the card is expanded or not
  const toggleExpanded = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <>
      <div
        className="relative w-full h-auto mb-7 flex flex-col group cursor-pointer"
        onClick={() => toggleExpanded()}
      >
        {/** Project Card Header */}
        <div className="h-20 rounded-t-xl bg-m-display flex flex-row items-center">
          <div className="font-landing text-white ml-4 md:text-3xl justify-start truncate">
            {project.project_name}
          </div>
          <div className="grow flex text-xs justify-end mr-4 text-white font-bold">
            {parseDate(project.start_date)}{" "}
            {project.end_date ? ` - ${project.end_date}` : "- Present"}
          </div>
        </div>

        {/** Project Card Content Space */}
        <div
          className={`h-auto w-full min-h-100 bg-offwhite rounded-b-xl flex flex-col overflow-hidden relative ${
            expanded ? "max-h-10000" : "max-h-40"
          }`}
        >
          {/** Main Card Content */}
          <div className="p-5 tracking-wider">
            <div className="flex flex-row w-full h-auto text-lg">
              <div className="font-semibold w-20 md:w-30 text-right">
                Name:{" "}
              </div>
              <div className="ml-3 grow flex mb-2 font-extrabold">
                {project.project_name}
              </div>
            </div>

            {project.project_url && (
              <div className="flex flex-row mb-2">{project.project_url}</div>
            )}

            {github_url && (
              <div className="flex flex-row mb-2 text-md items-start md:items-center">
                <div className="w-20 md:w-30 font-bold text-right">
                  Project Repo:
                </div>
                <div className="flex flex-col md:flex-row h-auto ml-2 underline">
                  <a
                    href={github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-800"
                  >
                    {github_url}
                  </a>
                </div>
              </div>
            )}

            {frontend_stack.length > 0 && (
              <div className="flex flex-row text-md mb-2 items-start md:items-center">
                <div className="w-20 md:w-30 font-bold text-right">
                  Frontend:
                </div>
                <div className="flex flex-col md:flex-row h-auto">
                  {frontend_stack.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="bg-light_gray rounded-lg ml-2 px-3 font-bold text-black mb-2 md:mb-0"
                      >
                        {item}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {backend_stack.length > 0 && (
              <div className="flex flex-row text-md mb-2 items-start md:items-center">
                <div className="w-20 md:w-30 font-bold text-right">
                  Backend:
                </div>
                <div className="flex flex-col md:flex-row h-auto">
                  {backend_stack.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="bg-light_gray rounded-lg ml-2 mb-2 md:mb-0 px-3 font-bold text-black"
                      >
                        {item}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {database_stack.length > 0 && (
              <div className="flex flex-row items-start md:items-center text-md mb-2">
                <div className="w-20 md:w-30 font-bold text-right">
                  Database:
                </div>
                <div className="flex flex-col md:flex-row h-auto">
                  {database_stack.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="bg-light_gray rounded-lg ml-2 px-3 mb-2 md:mb-0 font-bold text-black"
                      >
                        {item}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {display_image && (
              <div className="flex mt-1 mb-3 w-full h-auto items-center justify-center">
                <img
                  src={display_image}
                  alt="Project Display"
                  className="w-full max-w-[500px] h-auto rounded-3xl mt-5"
                />
              </div>
            )}
            {description && (
              <div className="flex flex-row text-md mb-2">
                <div className="w-20 md:w-30 font-bold text-right mr-2">
                  Desc:
                </div>
                <div className="w-[calc(100%-124px)] h-auto text-left">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {description}
                  </ReactMarkdown>
                </div>
              </div>
            )}
            {images.length > 0 &&
              images.map((image, index) => {
                return (
                  <img
                    key={index}
                    src={image}
                    alt={`Project Image ${index + 1}`}
                    className="w-full h-auto rounded-[30px] mt-2 mb-5"
                  />
                );
              })}
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
          {`${expanded ? "Collapse" : "Expand"} project`}
        </div>
      </div>
    </>
  );
}
