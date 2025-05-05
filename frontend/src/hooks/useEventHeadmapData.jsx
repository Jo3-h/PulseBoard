import { useState, useEffect } from "react";
import { format } from "date-fns";

export default function useEventHeatmapData() {
  const [heatmapData, setHeatmapData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const eventsResponse = await fetch(`/api/event/event-calendar`);
        if (!eventsResponse.ok) {
          throw new Error("Failed to fetch events");
        }
        const eventsData = await eventsResponse.json();
        const formattedData = eventsData.map((event) => ({
          date: format(new Date(event.activity_date), "yyyy-MM-dd"),
          leetcode: event.leetcode,
          github: event.github,
          strava: event.strava,
          total: event.total,
        }));

        // Update state with formatted data
        setHeatmapData(formattedData);
      } catch (error) {
        setError(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  return { heatmapData, loading, error };
}
