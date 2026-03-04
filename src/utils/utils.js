import { useState, useEffect } from "react";

export function useData(url) {
  const [data, setData] = useState(null);
  useEffect(() => {
    let ignore = false;

    async function getData() {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        if (!ignore) {
          setData(result);
        }
      } catch (error) {
        console.error(error.message);
      }
    }

    getData();

    return () => {
      ignore = true;
    };
  }, [url]);
  return data;
}
