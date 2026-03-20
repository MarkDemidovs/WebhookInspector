import { useState } from "react";
import { api } from "../lib/api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const signin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError("");
    try {
      const data = await api("/auth/register", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      if (data.message === "Signed in") {
        navigate("/login");
      } else {
        setError(data.error || "Registration failed.");
      }
    } catch (err) {
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
          onClick={() => navigate("/login")}
          className="cursor-pointer font-mono text-xs tracking-btn uppercase px-3 md:px-4 py-2 border border-border-2 text-subtle rounded-sm hover:border-border hover:text-secondary transition-all"
        >
          Sign in
        </button>
      </div>

      {/* form */}
      <div className="flex-1 flex items-center justify-center px-4 bg-grid">
        <div className="w-full max-w-sm">

          <div className="mb-8">
            <p className="font-mono text-xs tracking-label uppercase text-accent mb-3 flex items-center gap-2">
              <span className="w-5 h-px bg-accent inline-block" />
              Create account
            </p>
            <h1 className="font-mono text-2xl font-medium text-primary tracking-tight">Start inspecting.</h1>
          </div>

          <form onSubmit={signin} className="flex flex-col gap-4">
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
              Create account →
            </button>
          </form>

          <p className="font-mono text-xs text-dimmed mt-6 text-center">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="cursor-pointer text-subtle hover:text-secondary transition-all"
            >
              Sign in
            </span>
          </p>

        </div>
      </div>

    </div>
  );
}