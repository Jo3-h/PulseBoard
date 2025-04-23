function PolkaDotPattern({ width = 180, height = 85, spacing = 10 }) {
  const dots = [];

  const centerX = width / 2;
  const centerY = height / 2;
  const maxDistance = Math.sqrt(centerX ** 2 + centerY ** 2);

  for (let x = 0; x <= width; x += spacing) {
    for (let y = 0; y <= height; y += spacing) {
      const dx = x - centerX;
      const dy = y - centerY;
      const distance = Math.sqrt(dx ** 2 + dy ** 2);

      // Size: bigger at center, smaller at edge
      const radius = 4 * (1 - distance / maxDistance); // scale between 0–6

      if (radius > 0.5) {
        dots.push(
          <circle
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            r={radius}
            fill="currentColor"
          />
        );
      }
    }
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-full object-cover border transition-all duration-500 text-l-display group-hover:text-white group-hover:border-none"
    >
      <rect
        width={width}
        height={height}
        className="fill-white group-hover:fill-l-display transition-all duration-500"
      />
      <g>{dots}</g>
    </svg>
  );
}

import StravaContent from "./content/stravaContent.jsx";
import GithubContent from "./content/githubContent.jsx";
import LeetcodeContent from "./content/leetcodeContent.jsx";
import { useState } from "react";
import { useEffect } from "react";

function renderPlatformContent(item) {
  if (item.type === "github") {
    return <GithubContent key={item.data.event_id} data={item.data} />;
  }

  if (item.type === "strava") {
    return <StravaContent key={item.data.activity_id} data={item.data} />;
  }

  if (item.type === "leetcode") {
    return <LeetcodeContent key={item.data.event_id} data={item.data} />;
  }

  return null;
}

function parseActivityItem(item) {
  if (!item) {
    return {
      platform: "n/a",
      type: "n/a",
      date: "n/a",
      icon: "n/a",
    };
  }

  // format date of the activity item
  function getOrdinal(n) {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }

  const date = new Date(item.date);
  const day = getOrdinal(date.getDate());
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12 || 12; // convert to 12-hour format
  const formatted = `${day} ${month}, ${year} at ${hours}:${minutes}${ampm}`;

  // parse Activity Item from Strava
  if (item.type === "strava") {
    return {
      platform: "Strava",
      type: item.data.name,
      date: formatted,
      icon: "images/strava.png",
    };
  }

  if (item.type === "github") {
    return {
      platform: "Github",
      type: item.data.event_type,
      date: formatted,
      icon: "images/github.png",
    };
  }

  if (item.type === "leetcode") {
    return {
      platform: "Leetcode",
      type: item.data.event_type,
      date: formatted,
      icon: "images/leetcode.png",
    };
  }

  return {
    platform: "n/a",
    type: "n/a",
    date: "n/a",
    icon: "icon",
  };
}

export default function ActivityCard({ item }) {
  const { platform, type, date, icon } = parseActivityItem(item);
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <>
      <div
        className="relative w-full h-auto mt-2 mb-5 flex flex-col group cursor-pointer"
        onClick={() => toggleExpanded()}
      >
        {/* Header section */}
        <div className="w-full h-10 bg-light_gray rounded-t-xl flex flex-row items-center">
          <div className="w-4/7 flex justify-start px-5">
            <span className="text-sm text-black font-bold">{platform}</span>
            <span className="text-sm pl-2">{type}</span>
          </div>
          <div className="w-3/7 flex justify-end px-5 text-xs">{date}</div>
        </div>

        {/* Body section */}
        <div className="w-full h-auto min-h-30 bg-offwhite rounded-b-xl flex flex-col md:flex-row p-2">
          <div className="h-40 w-full md:max-w-2/5 min-w-[220px] px-5 py-[15px] flex flex-col items-center">
            <div
              className={`relative overflow-hidden ${
                expanded ? "h-[180px]" : "h-[130px]"
              } w-[180px]`}
            >
              <div className="relative flex flex-col pt-[45px]">
                <img
                  src={icon}
                  className="absolute top-0 -translate-x-1/2 left-1/2 z-20"
                  loading="lazy"
                />
              </div>
              <div className="relative h-[85px] group-hover:bg-white duration-300 transition-all border">
                <PolkaDotPattern />
              </div>
            </div>
          </div>
          <div
            className={`${
              expanded ? "max-h-400" : "max-h-20 md:max-h-40"
            } w-full h-auto bg-blue-300 overflow-hidden relative transition-all duration-500`}
          >
            <div className="relative w-full h-full overflow-hidden z-0">
              {/** Platform specific content */}
              {renderPlatformContent(item)}
            </div>
            {!expanded && (
              <div className="pointer-events-none absolute bottom-0 left-0 w-full h-[80px] bg-gradient-to-b from-transparent to-offwhite z-20" />
            )}
          </div>
        </div>
        {/* Small fixed size circle at the bottom */}
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
          {`${expanded ? "Collapse" : "Expand"} activity`}
        </div>
      </div>
    </>
  );
}
