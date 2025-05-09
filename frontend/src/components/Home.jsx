import React, { useState, useRef, useEffect } from "react";
import useFetchContent from "../hooks/useFetchContent";
import ActivityCard from "./cards/ActivityCard.jsx";
import Heatmap from "./common/Heatmap.jsx";
import Filter from "./common/Filter.jsx";

export default function Home() {
  const [filter, setFilter] = useState({
    strava: false,
    github: false,
    leetcode: false,
  });
  const platforms = ["strava", "leetcode", "github"];
  const [visibleCount, setVisibleCount] = useState(10);
  const content = useFetchContent();
  const sortedContent = [...content].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const contentDiv = useRef(null);
  const toggleFilter = (type) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      [type]: !prevFilter[type],
    }));
  };

  const loadMoreCards = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };

  useEffect(() => {
    if (contentDiv.current) {
      const timeout = setTimeout(() => {
        contentDiv.current.scrollBy({
          top: 60, // Scroll down by 60px
          behavior: "smooth", // Smooth scrolling
        });
      }, 100); // Delay to ensure content is rendered

      return () => clearTimeout(timeout); // Cleanup timeout
    }
  }, [visibleCount]);

  return (
    <>
      <div className="flex flex-row h-auto bg-white w-full z-100">
        {/* left static content */}
        <div className="w-0 hidden h-full bg-white lg:flex lg:w-1/4 flex-row justify-end">
          {/** filter by platform */}
          <div>
            <Filter
              platforms={platforms}
              filter={filter}
              toggleFilter={toggleFilter}
            />
          </div>
        </div>

        {/* center main content */}
        <div
          ref={contentDiv}
          className="w-full flex flex-col px-5 py-2 bg-white lg:w-1/2 h-[calc(100vh-40px)] overflow-y-auto"
        >
          <Heatmap data={content} />
          {sortedContent
            .filter((item) => !filter[item.type]) // first filter out unwanted items
            .slice(0, visibleCount) // then slice the visible number
            .map((item, index) => (
              <ActivityCard key={index} item={item} />
            ))}
          <div className="w-full h-25 flex items-center justify-center">
            <button
              className="h-10 w-30 rounded-2xl bg-m-display text-white font-bold cursor-pointer active:bg-d-display
          transition-all duration-100 my-5"
              onClick={() => loadMoreCards()}
            >
              Load More
            </button>
          </div>
        </div>

        {/* right static content */}
        <div className="w-0 hidden h-full bg-amber-100 lg:flex lg:w-1/4"></div>
      </div>
    </>
  );
}
