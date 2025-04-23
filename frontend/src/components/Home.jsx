import React from "react";
import useFetchContent from "../hooks/useFetchContent";
import ActivityCard from "./cards/ActivityCard.jsx";

export default function Home() {
  const content = useFetchContent();
  const sortedContent = [...content].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <>
      <div className="flex flex-row h-auto bg-white w-full">
        {/* left static content */}
        <div className="w-0 hidden h-full bg-amber-100 lg:flex lg:w-1/4"></div>

        {/* center main content */}
        <div className="w-full flex flex-col px-5 py-2 bg-white lg:w-1/2">
          {sortedContent.map((item, index) => (
            <ActivityCard key={index} item={item} />
          ))}
        </div>

        {/* right static content */}
        <div className="w-0 hidden h-full bg-amber-100 lg:flex lg:w-1/4"></div>
      </div>
    </>
  );
}
