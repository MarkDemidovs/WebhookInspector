import { useState } from "react";
import { api } from "../lib/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError("");
    try {
      const data = await api("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      if (data.message === "Logged in") {
        navigate("/dashboard");
      } else {
        setError(data.error || "Invalid credentials.");
      }
    } catch {
      setError("Something went wrong.");
    }
  };

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
          className="cursor-pointer font-mono text-xs tracking-btn uppercase px-3 md:px-4 py-2 border border-border-2 text-subtle rounded-sm hover:border-border hover:text-secondary transition-all"
        >
          Create account
        </button>
      </div>

      {/* form */}
      <div className="flex-1 flex items-center justify-center px-4 bg-grid">
        <div className="w-full max-w-sm">

          <div className="mb-8">
            <p className="font-mono text-xs tracking-label uppercase text-accent mb-3 flex items-center gap-2">
              <span className="w-5 h-px bg-accent inline-block" />
              Sign in
            </p>
            <h1 className="font-mono text-2xl font-medium text-primary tracking-tight">Welcome back.</h1>
          </div>

          <form onSubmit={login} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="font-mono text-xs tracking-label uppercase text-muted">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="bg-surface border border-border text-primary font-mono text-xs px-4 py-3 rounded-sm outline-none focus:border-accent transition-all placeholder:text-dimmed"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-mono text-xs tracking-label uppercase text-muted">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-surface border border-border text-primary font-mono text-xs px-4 py-3 rounded-sm outline-none focus:border-accent transition-all placeholder:text-dimmed"
              />
            </div>

            {error && <p className="font-mono text-xs text-method-delete">{error}</p>}

            <button
              type="submit"
              className="cursor-pointer font-mono text-xs tracking-btn uppercase px-6 py-3 bg-accent text-bg font-medium rounded-sm hover:bg-accent-hover transition-all mt-2"
            >
              Sign in →
            </button>
          </form>

          <p className="font-mono text-xs text-dimmed mt-6 text-center">
            No account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="cursor-pointer text-subtle hover:text-secondary transition-all"
            >
              Create one
            </span>
          </p>

        </div>
      </div>

    </div>
  );
}