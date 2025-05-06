import React, { useState } from "react";
import Footer from "./Footer.jsx";
import NavCard from "./NavCard.jsx";
import { Link } from "react-router-dom";

export default function Layout({ children }) {
  const [activeContent, setActiveContent] = useState("");
  const [expandMenu, setExpandMenu] = useState(false);
  const navItems = [
    {
      name: "Activity",
      path: "/",
      description:
        "Details of my activity across various online services and learning platforms",
    },
    {
      name: "Education",
      path: "/education",
      description: "Details of my education and further learning",
    },
    {
      name: "Experience",
      path: "/experience",
      description:
        "Details of my previous professional and personal experiences",
    },
    {
      name: "Projects",
      path: "/projects",
      description:
        "Description and relevant links to my professional and personal projects",
    },
  ];

  const toggleExpandMenu = () => {
    setExpandMenu((prev) => !prev);
  };

  return (
    <>
      {/* landing page element */}
      <nav className="w-full flex flex-row bg-d-display h-16 lg:hidden p-3 relative items-center justify-center">
        <Link
          className="font-landing text-start grow justify-center text-white ml-3"
          to={"/"}
        >
          <div>PulseBoard</div>
        </Link>
        <div
          className="h-10 w-10 flex text-white cursor-pointer"
          onClick={() => toggleExpandMenu()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-full w-full"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </div>
      </nav>
      <div
        className={`w-full h-auto bg-d-display px-10 flex flex-col lg:hidden overflow-hidden
        ${expandMenu ? "max-h-300" : "max-h-0"}
        transition-all duration-500 ease-in-out
        items-center justify-center
        `}
      >
        {navItems.map((item, index) => {
          return (
            <Link
              key={index}
              to={`/${item.name.toLowerCase()}`}
              onClick={() => {
                setActiveContent(item.name);
                setTimeout(() => {
                  document
                    .getElementById("content-section")
                    ?.scrollIntoView({ behavior: "smooth" });
                }, 300);
              }}
              className="w-full h-12 my-1 bg-m-display rounded-2xl flex items-center justify-center text-white font-extrabold tracking-[6px]"
            >
              {item.name}
            </Link>
          );
        })}
        <div className="h-3 w-full"></div>
      </div>
      <div className="relative flex w-screen min-w-0">
        {/* landing page graphics */}
        <div className="flex flex-col w-screen openContent h-auto">
          <div>
            <div className="w-full flex bg-m-display openContent">
              <div className="w-screen openContent h-screen flex flex-col overflow-hidden">
                <div className="w-full flex-1 openContent flex flex-col min-h-0">
                  <div className="flex-1 w-full openContent bg-m-display text-white flex flex-col h-screen min-h-0">
                    <div className="landing-text-row">
                      <div className="landing-text-node">
                        <span className="landing-text">P</span>
                      </div>
                      <div className="landing-text-node bg-l-display">
                        <span className="landing-text">U</span>
                        <div className="landing-image-container lg:-translate-x-40">
                          <img
                            className="landing-image-solo"
                            loading="lazy"
                            src="/images/joe-1.png"
                          />
                        </div>
                      </div>
                      <div className="landing-text-node">
                        <span className="landing-text">L</span>
                      </div>
                    </div>
                    <div className="landing-text-row">
                      <div className="landing-text-node bg-l-display">
                        <span className="landing-text">S</span>
                      </div>
                      <div className="landing-text-node bg-m-display">
                        <span className="landing-text">E</span>
                      </div>
                      <div className="landing-text-node bg-l-display">
                        <span className="landing-text">-</span>
                        <div className="landing-image-container">
                          <img
                            className="landing-image-solo"
                            loading="lazy"
                            src="/images/joe-2.png"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="landing-text-row">
                      <div className="landing-text-node">
                        <span className="landing-text">B</span>
                      </div>
                      <div className="landing-text-node bg-l-display">
                        <span className="landing-text">R</span>
                        <div className="landing-image-container">
                          <img
                            className="landing-image-solo"
                            loading="lazy"
                            src="/images/joe-mon.png"
                          />
                        </div>
                      </div>
                      <div className="landing-text-node bg-m-display">
                        <span className="landing-text">D</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="w-full flex bg-m-display openContent h-auto">
              <div className="w-screen h-auto openContent flex flex-col overflow-hidden">
                <div className="w-full flex-1 flex flex-col min-h-0">
                  <div className="w-full pt-6 lg:py-16 lg:p-8 bg-m-display text-white flex- flex-col lg:items-start gap-4 mb-8 lg:mb-0 text-left">
                    <h1 className="title-text">
                      <div>
                        PULSE
                        <br />
                        BOARD
                      </div>
                    </h1>
                    <div className="content-text">
                      <span className="pr-1 md:pr-3 lg:pr-5">by</span>
                      <span className="uppercase pr-1 md:pr-3 lg:pr-5">
                        joe hosking
                      </span>
                      <span className="text-highlight text-[8px] md:text-[12px] lg:text-[16px] 2xl:text-[20px]">
                        - A React & Tailwindcss Frontend
                      </span>
                    </div>
                  </div>
                  <div className="flex w-full h-full">
                    {/** FINISH LANDING PAGE IMPLEMENTATION WITH IMAGES HERE */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* landing page nav bar */}
        <nav className="sticky max-h-screen w-[400px] 2xl:w-[500px] hidden top-0 -right-100 bg-d-display lg:block">
          <div className="w-full h-15 flex items-center justify-center font-label text-white">
            <span className="w-full h-auto text-left pl-[30px] 2xl:text-[calc(10vw*0.11)] 2xl:pt-4">
              Table of Contents
            </span>
          </div>
          <div className="h-[calc(100%-60px)] w-full px-[30px] flex flex-col pb-[20px] overflow-x-auto">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={`/${item.name.toLowerCase()}`}
                onClick={() => {
                  setActiveContent(item.name);
                  setTimeout(() => {
                    document
                      .getElementById("content-section")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }, 300);
                }}
              >
                <NavCard
                  title={item.name}
                  index={navItems.indexOf(item)}
                  cardCount={navItems.length}
                  active={activeContent === item.name}
                  description={item.description}
                />
              </Link>
            ))}
          </div>
        </nav>
      </div>
      {/* upto lg breakpoint nav bar */}

      {/* main page content */}
      <div id="content-section">{children}</div>

      {/* footer content */}
      <Footer />
    </>
  );
}
