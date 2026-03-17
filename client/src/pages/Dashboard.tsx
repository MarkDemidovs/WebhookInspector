import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { useNavigate } from "react-router-dom";

type Endpoint = {
  id: string;
  label: string;
  slug: string;
  created_at: string;
};

export default function Dashboard() {
  const navigate = useNavigate();

  const [endpoints, setEndpoints] = useState<Endpoint[]>([]);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const fetchEndpoints = async () => {
      try {
        const data = await api("/endpoints", {
          method: "GET",
        });

        setEndpoints(data.data ?? []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEndpoints();
  }, []);

  const createEndpoint = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const data = await api("/endpoints", {
        method: "POST",
        body: JSON.stringify({ label }),
      });

      setEndpoints([...endpoints, data.data[0]]);
      setLabel("");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <form onSubmit={createEndpoint}>
        <input
          placeholder="Enter endpoint name"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        ></input>
        <button>Create</button>
      </form>

      {endpoints.map((endpoint) => (
        <div
          key={endpoint.id}
          onClick={() => navigate(`/dashboard/${endpoint.id}`)}
        >
          {endpoint.label}
        </div>
      ))}
    </>
  );
}
