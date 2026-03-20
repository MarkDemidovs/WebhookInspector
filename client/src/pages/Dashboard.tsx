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
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEndpoints = async () => {
      try {
        const data = await api("/endpoints");
        setEndpoints(data.data ?? []);
      } catch (err) {
        if ((err as Error).message.includes("Not authenticated")) {
          navigate("/login");
        } else {
          console.error(err);
        }
      }
    };
    fetchEndpoints();
  }, [navigate]);

  const createEndpoint = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError("");
    try {
      const data = await api("/endpoints", {
        method: "POST",
        body: JSON.stringify({ label }),
      });
      setEndpoints([...endpoints, data.data[0]]);
      setLabel("");
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="min-h-screen bg-bg flex flex-col">

      {/* nav */}
      <div className="flex items-center justify-between px-4 md:px-8 py-5 border-b border-border">
        <div className="flex items-center gap-2 font-mono text-xs tracking-label text-subtle uppercase">
          <div className="dot-live" />
          <span className="hidden sm:inline">webhook inspector</span>
          <span className="sm:hidden">wi</span>
        </div>
        <button
          onClick={() => navigate("/login")}
          className="cursor-pointer font-mono text-xs tracking-btn uppercase px-3 md:px-4 py-2 border border-border-2 text-subtle rounded-sm hover:border-border hover:text-secondary transition-all"
        >
          Sign out
        </button>
      </div>

      <div className="flex-1 px-4 md:px-8 py-10 max-w-4xl w-full mx-auto">

        {/* header */}
        <div className="mb-8">
          <p className="font-mono text-xs tracking-label uppercase text-accent mb-3 flex items-center gap-2">
            <span className="w-5 h-px bg-accent inline-block" />
            Your endpoints
          </p>
          <h1 className="font-mono text-2xl font-medium text-primary tracking-tight">Dashboard</h1>
        </div>

        {/* create form */}
        <form onSubmit={createEndpoint} className="flex gap-3 mb-10">
          <input
            placeholder="Endpoint label e.g. my-stripe-test"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="flex-1 bg-surface border border-border text-primary font-mono text-xs px-4 py-3 rounded-sm outline-none focus:border-accent transition-all placeholder:text-dimmed"
          />
          <button
            type="submit"
            className="cursor-pointer font-mono text-xs tracking-btn uppercase px-5 py-3 bg-accent text-bg font-medium rounded-sm hover:bg-accent-hover transition-all whitespace-nowrap"
          >
            + New
          </button>
        </form>

        {error && <p className="font-mono text-xs text-method-delete mb-4">{error}</p>}

        {/* endpoints list */}
        {endpoints.length === 0 ? (
          <div className="border border-border rounded-sm p-10 text-center">
            <p className="font-mono text-xs text-dimmed">No endpoints yet. Create one above.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {endpoints.map((endpoint) => (
              <div
                key={endpoint.id}
                onClick={() => navigate(`/dashboard/${endpoint.id}`)}
                className="cursor-pointer flex items-center justify-between px-5 py-4 bg-surface border border-border rounded-sm hover:border-border-2 hover:bg-surface-2 transition-all group"
              >
                <div className="flex flex-col gap-1">
                  <p className="font-mono text-sm text-primary group-hover:text-accent transition-all">{endpoint.label}</p>
                  <p className="font-mono text-xs text-dimmed">/hooks/{endpoint.slug}</p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-mono text-xs text-dimmed hidden sm:block">
                    {new Date(endpoint.created_at).toLocaleDateString()}
                  </p>
                  <span className="font-mono text-xs text-subtle group-hover:text-accent transition-all">→</span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
}