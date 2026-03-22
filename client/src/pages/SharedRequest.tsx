import { useParams, useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import { useEffect, useState } from "react";

type SharedRequest = {
  id: string;
  method: string;
  body: string;
  headers: object;
  ip: string;
  received_at: string;
  share_token: string;
};

const methodColor: Record<string, string> = {
  GET:    "text-method-get",
  POST:   "text-method-post",
  DELETE: "text-method-delete",
  PUT:    "text-method-put",
  PATCH:  "text-method-put",
};

export default function SharedRequest() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState<SharedRequest | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const data = await api(`/requests/share/${token}`);
        setRequest(data.data[0]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchRequest();
    } else {
      setLoading(false);
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-bg flex flex-col">

      {/* nav */}
      <div className="flex items-center justify-between px-4 md:px-8 py-5 border-b border-border">
        <div
          onClick={() => navigate("/")}
          className="cursor-pointer flex items-center gap-2 font-mono text-xs tracking-label text-subtle uppercase hover:text-secondary transition-all"
        >
          <div className="dot-live" />
          <span className="hidden sm:inline">webhook inspector</span>
          <span className="sm:hidden">wi</span>
        </div>
        <button
          onClick={() => navigate("/signup")}
          className="cursor-pointer font-mono text-xs tracking-btn uppercase px-3 md:px-4 py-2 bg-accent text-bg font-medium rounded-sm hover:bg-accent-hover transition-all"
        >
          Get started
        </button>
      </div>

      <div className="flex-1 px-4 md:px-8 py-10 max-w-4xl w-full mx-auto">

        <div className="mb-8">
          <p className="font-mono text-xs tracking-label uppercase text-accent mb-3 flex items-center gap-2">
            <span className="w-5 h-px bg-accent inline-block" />
            Shared request
          </p>
          <h1 className="font-mono text-2xl font-medium text-primary tracking-tight">Request details</h1>
        </div>

        {loading && (
          <div className="border border-border rounded-sm p-10 text-center">
            <p className="font-mono text-xs text-dimmed">Loading<span className="terminal-cursor ml-1" /></p>
          </div>
        )}

        {!loading && !request && (
          <div className="border border-border rounded-sm p-10 text-center">
            <p className="font-mono text-xs text-method-delete mb-2">Request not found.</p>
            <p className="font-mono text-xs text-dimmed">This share link may have expired or is invalid.</p>
          </div>
        )}

        {request && (
          <div className="bg-surface border border-border rounded-sm overflow-hidden">

            {/* meta bar */}
            <div className="flex items-center gap-4 px-5 py-4 border-b border-border bg-surface-2">
              <span className={`font-mono text-xs font-medium ${methodColor[request.method] ?? "text-subtle"}`}>
                {request.method}
              </span>
              <span className="font-mono text-xs text-subtle">{request.ip}</span>
              <span className="font-mono text-xs text-dimmed ml-auto">
                {new Date(request.received_at).toLocaleString()}
              </span>
            </div>

            <div className="p-5 flex flex-col gap-6">

              {/* headers */}
              <div>
                <p className="font-mono text-xs tracking-label uppercase text-dimmed mb-3">Headers</p>
                <div className="bg-bg rounded-sm p-4 overflow-x-auto">
                  {Object.entries(request.headers as Record<string, string>).map(([key, val]) => (
                    <p key={key} className="font-mono text-xs mb-1">
                      <span className="text-method-get">{key}</span>
                      <span className="text-muted-2">: </span>
                      <span className="text-string-val">{val}</span>
                    </p>
                  ))}
                </div>
              </div>

              {/* body */}
              {request.body && (
                <div>
                  <p className="font-mono text-xs tracking-label uppercase text-dimmed mb-3">Body</p>
                  <div className="bg-bg rounded-sm p-4 overflow-x-auto">
                    <p className="font-mono text-xs text-string-val whitespace-pre-wrap">{request.body}</p>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>

    </div>
  );
}