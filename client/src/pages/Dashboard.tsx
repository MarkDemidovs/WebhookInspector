import { useEffect, useState } from "react";
import { api } from "../lib/api";

export default function Dashboard() {
  const [endpoints, setEndpoints] = useState([]);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const fetchEndpoints = async () => {
      try {
        const data = await api("/api/endpoints", {
          method: "GET",
        });

        setEndpoints(data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEndpoints();
  }, []);
  return 0;
}
