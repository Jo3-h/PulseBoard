import { useState, useEffect } from "react";

export default function useFetchContent() {
  const [content, setContent] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Strava data
        const stravaResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/strava/activity`
        );
        const stravaData = await stravaResponse.json();
        const transStravaData = stravaData.map((activity) => ({
          date: activity.start_time,
          type: "strava",
          data: activity,
        }));

        // Fetch LeetCode data
        const leetcodeResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/leetcode/activity`
        );
        const leetcodeData = await leetcodeResponse.json();
        const transLeetcodeData = leetcodeData.map((activity) => ({
          date: activity.created_at,
          type: "leetcode",
          data: activity,
        }));

        // Fetch GitHub data
        const githubResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/github/activity`
        );
        const githubData = await githubResponse.json();
        const transGithubData = githubData.map((activity) => ({
          date: activity.created_at,
          type: "github",
          data: activity,
        }));

        // Update content state
        setContent((prevContent) => [
          ...prevContent,
          ...transStravaData,
          ...transLeetcodeData,
          ...transGithubData,
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return content;
}
