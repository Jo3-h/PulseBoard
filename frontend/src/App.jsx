import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  return (
    <>
      {/* landing page element */}
      <div className="relative flex w-screen min-w-0">
        {/* landing page graphics */}
        <div className="flex flex-col w-full openContent">
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
                        <div className="landing-image-container -translate-x-6/10 -translate-y-8">
                          <img
                            className="landing-image-solo"
                            loading="lazy"
                            src="../public/images/joe-1.png"
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
                        <div className="landing-image-container -translate-y-6 -translate-x-4/10">
                          <img
                            className="landing-image-solo"
                            loading="lazy"
                            src="../public/images/joe-2.png"
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
                        <div className="landing-image-container -translate-y-12">
                          <img
                            className="landing-image-solo"
                            loading="lazy"
                            src="../public/images/joe-mon.png"
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
            <div className="w-full flex bg-m-display openContent">
              <div className="w-screen h-screen openContent flex flex-col overflow-hidden">
                <div className="w-full flex-1 flex flex-col min-h-0">
                  <div className="w-full pt16 lg:py-16 lg:p-8 bg-m-display text-white flex- flex-col items-center lg:items-start gap-4 mb-8 lg:mb-0">
                    <h1 className="title-text text-center lg:text-left">
                      <div>
                        PULSE
                        <br />
                        BOARD
                      </div>
                    </h1>
                    <div className="text-[13px] font-label text-left">
                      <span className="pr-3">by</span>
                      <span className="uppercase pr-5">joe hosking</span>
                      <span className="text-highlight text-[11px]">
                        - A React & Tailwindcss Frontend
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* landing page nav bar */}
        <nav className="sticky max-h-screen w-[400px] hidden top-0 right-0 bg-d-display lg:block">
          NAV
        </nav>
      </div>
      {/* main page content */}
      {/* footer content */}
    </>
  );
}

export default App;
