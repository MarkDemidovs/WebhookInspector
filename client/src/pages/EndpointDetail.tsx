import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../lib/api";

type Request = {
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

type Endpoint = {
  id: string;
  label: string;
  slug: string;
  created_at: string;
};

export default function EndpointDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [endpoint, setEndpoint] = useState<Endpoint | null>(null);
  const [requests, setRequests] = useState<Request[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [testLoading, setTestLoading] = useState(false);

  useEffect(() => {
    const fetchEndpoint = async () => {
      try {
        const data = await api(`/endpoints/${id}`);
        setEndpoint(data.data);
      } catch (err) {
        if ((err as Error).message.includes("Not authenticated")) {
          navigate("/login");
        } else {
          console.error(err);
        }
      }
    };

    const fetchRequests = async () => {
      try {
        const data = await api(`/endpoints/${id}/requests`);
        setRequests(data.data ?? []);
      } catch (err) {
        if ((err as Error).message.includes("Not authenticated")) {
          navigate("/login");
        } else {
          console.error(err);
        }
      }
    };

    fetchEndpoint();
    fetchRequests();
  }, [id, navigate]);

  const sendTestRequest = async () => {
    if (!endpoint) return;
    setTestLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
      const baseUrl = apiUrl.replace(/\/+$/, '').replace(/\/api$/, '');
      const hookUrl = `${baseUrl}/hooks/${endpoint.slug}`;
      await fetch(hookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ test: true, message: 'Test request from WebhookInspector', timestamp: new Date().toISOString() }),
      });
      // Refresh requests
      const data = await api(`/endpoints/${id}/requests`);
      setRequests(data.data ?? []);
    } catch (err) {
      setError('Failed to send test request');
    } finally {
      setTestLoading(false);
    }
  };

  const shareRequest = async (requestId: string) => {
    try {
      const data = await api(`/requests/${requestId}/share`, { method: "POST" });
      const token = data.data[0].share_token;
      const url = `${window.location.origin}/share/${token}`;
      navigator.clipboard.writeText(url);
      setCopied(requestId);
      setTimeout(() => setCopied(null), 2000);
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
          onClick={() => navigate("/dashboard")}
          className="cursor-pointer font-mono text-xs tracking-btn uppercase px-3 md:px-4 py-2 border border-border-2 text-subtle rounded-sm hover:border-border hover:text-secondary transition-all"
        >
          ← Dashboard
        </button>
      </div>

      {error && <p className="font-mono text-xs text-method-delete px-4 md:px-8 py-2">{error}</p>}

      <div className="flex-1 px-4 md:px-8 py-10 max-w-4xl w-full mx-auto">

        {/* header */}
        <div className="mb-8">
          <p className="font-mono text-xs tracking-label uppercase text-accent mb-3 flex items-center gap-2">
            <span className="w-5 h-px bg-accent inline-block" />
            Request log
          </p>
          <h1 className="font-mono text-2xl font-medium text-primary tracking-tight">Incoming requests</h1>
          {endpoint && (
            <div className="mt-4 flex items-center gap-4">
              <p className="font-mono text-xs text-dimmed">Webhook URL: {import.meta.env.VITE_API_URL?.replace(/\/api$/, '') || 'http://localhost:4000'}/hooks/{endpoint.slug}</p>
              <button
                onClick={sendTestRequest}
                disabled={testLoading}
                className="cursor-pointer font-mono text-xs tracking-btn uppercase px-3 py-2 bg-accent text-bg font-medium rounded-sm hover:bg-accent-hover transition-all disabled:opacity-50"
              >
                {testLoading ? 'Sending...' : 'Send Test Request'}
              </button>
            </div>
          )}
        </div>

        {requests.length === 0 ? (
          <div className="border border-border rounded-sm p-10 text-center">
            <p className="font-mono text-xs text-dimmed mb-2">No requests yet.</p>
            <p className="font-mono text-xs text-dimmed">Send a request to your webhook URL to see it here.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {requests.map((request) => (
              <div key={request.id} className="bg-surface border border-border rounded-sm overflow-hidden">

                {/* row header */}
                <div
                  onClick={() => setExpanded(expanded === request.id ? null : request.id)}
                  className="cursor-pointer flex items-center justify-between px-5 py-4 hover:bg-surface-2 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <span className={`font-mono text-xs font-medium w-16 ${methodColor[request.method] ?? "text-subtle"}`}>
                      {request.method}
                    </span>
                    <span className="font-mono text-xs text-subtle hidden sm:inline">{request.ip}</span>
                    <span className="font-mono text-xs text-dimmed">
                      {new Date(request.received_at).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => { e.stopPropagation(); shareRequest(request.id); }}
                      className="cursor-pointer font-mono text-xs tracking-btn uppercase px-3 py-1 border border-border-2 text-subtle rounded-sm hover:border-accent hover:text-accent transition-all"
                    >
                      {copied === request.id ? "copied!" : "share"}
                    </button>
                    <span className="font-mono text-xs text-dimmed">{expanded === request.id ? "▲" : "▼"}</span>
                  </div>
                </div>

                {/* expanded detail */}
                {expanded === request.id && (
                  <div className="border-t border-border px-5 py-4 flex flex-col gap-4">

                    <div>
                      <p className="font-mono text-xs tracking-label uppercase text-dimmed mb-2">Headers</p>
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

                    {request.body && (
                      <div>
                        <p className="font-mono text-xs tracking-label uppercase text-dimmed mb-2">Body</p>
                        <div className="bg-bg rounded-sm p-4 overflow-x-auto">
                          <p className="font-mono text-xs text-string-val whitespace-pre-wrap">{request.body}</p>
                        </div>
                      </div>
                    )}

                  </div>
                )}

              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
}