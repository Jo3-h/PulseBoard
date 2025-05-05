import React, { useEffect, useRef } from "react";
import useEventHeatmapData from "../../hooks/useEventHeadmapData";

function formatDate(dateString) {
  const date = new Date(dateString);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  // Add ordinal suffix to the day (e.g., 1st, 2nd, 3rd, 4th)
  const suffix = (day) => {
    if (day > 3 && day < 21) return "th"; // Special case for 11-13
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${month} ${day}${suffix(day)}, ${year}`;
}

export default function Heatmap() {
  const { heatmapData, loading, error } = useEventHeatmapData();
  const gridRef = useRef(null);

  useEffect(() => {
    if (gridRef.current) {
      // Scroll to the far right after the component mounts
      gridRef.current.scrollLeft = gridRef.current.scrollWidth;
    }
  }, [heatmapData]); // This ensures it runs whenever heatmapData is updated

  const getColor = (value) => {
    if (value === 0) return "#ffffff";
    if (value <= 3) return "#7aabe6";
    if (value <= 6) return "#548fd6";
    if (value > 6) return "#3976bf";
  };

  const columns = Math.ceil(heatmapData.length / 7);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error loading activity heatmap: {error}</div>;
  }

  return (
    <div className="w-full h-50 bg-offwhite rounded-xl my-2 p-5 flex flex-col">
      <div className="w-full h-13 mb-4 flex flex-row items-center justify-start bg-d-display rounded-xl text-white px-5">
        <div className="flex justify-start text-xs md:text-sm">Old</div>
        <div className="w-full justify-center text-sm md:text-lg h-full font-bold mr-3 flex items-center">
          Event Heatmap
        </div>
        <div className="flex justify-end text-xs md:text-sm">New</div>
      </div>
      <div
        className="w-full h-full overflow-x-auto overflow-y-hidden"
        ref={gridRef}
      >
        <div
          className="w-max grid gap-1"
          style={{
            gridTemplateRows: "repeat(7, minmax(0, 1fr))",
            gridTemplateColumns: `repeat(${columns}, minmax(0,1fr))`,
            gridAutoFlow: "column",
          }}
        >
          {heatmapData.map((day, index) => {
            return (
              <div
                key={day.date}
                className="w-3 h-3 rounded-sm flex items-center justify-center text-[8px] group relative"
                style={{ backgroundColor: getColor(day.total) }}
              >
                <div className="absolute inline-block bg-black text-white rounded-md w-45 left-5 top-0 opacity-0 group-hover:opacity-100 transition-all duration-200 p-1 shadow-md z-110">
                  <div className="flex w-full h-full flex-col items-center overflow-visible">
                    <div className="text-sm font-bold">
                      {formatDate(day.date)}
                    </div>
                    <div className="flex flex-row text-xs">
                      <div className="justify-end w-2/3 mr-2">Strava:</div>
                      <div className="justify-start w-1/3">{day.strava}</div>
                    </div>
                    <div className="flex flex-row text-xs">
                      <div className="justify-end w-2/3 mr-2">Leetcode:</div>
                      <div className="justify-start w-1/3">{day.leetcode}</div>
                    </div>
                    <div className="flex flex-row text-xs">
                      <div className="justify-end w-2/3 mr-2">Github:</div>
                      <div className="justify-start w-1/3">{day.github}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
