import { useState, useEffect } from "react";

export default function useFetchData({ endpoint }) {
  const [content, setContent] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/${endpoint}`);
        const projectData = await response.json();

        setContent(projectData);
      } catch (error) {
        console.error("Error fetching Projects: ", error);
      }
    };

    fetchData();
  }, []);

  return content;
}
