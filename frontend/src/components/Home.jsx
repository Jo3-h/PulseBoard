import React from "react";
import useFetchContent from "../hooks/useFetchContent";
import { useState, useEffect } from "react";
import StavaCard from "./cards/StravaCard.jsx";
import GithubCard from "./cards/GithubCard.jsx";
import LeetcodeCard from "./cards/LeetcodeCard.jsx";

export default function Home() {
  const content = useFetchContent();
  const sortedContent = [...content].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  useEffect(() => {
    console.log("Content fetched:", content);
  }, [content]);

  return (
    <>
      <div className="flex flex-row h-auto bg-white w-full">
        {/* left static content */}
        <div className="w-0 hidden h-full bg-amber-100 lg:flex lg:w-1/4"></div>

        {/* center main content */}
        <div className="w-full flex flex-col px-5 py-2 bg-white lg:w-1/2">
          {sortedContent.map((item, index) => {
            if (item.type === "strava") {
              return <StavaCard key={index} activity={item.data} />;
            } else if (item.type === "github") {
              return <GithubCard key={index} activity={item.data} />;
            } else if (item.type === "leetcode") {
              return <LeetcodeCard key={index} activity={item.data} />;
            } else {
              return null; // Return null if no matching type
            }
          })}
        </div>

        {/* right static content */}
        <div className="w-0 hidden h-full bg-amber-100 lg:flex lg:w-1/4"></div>
      </div>
    </>
  );
}
