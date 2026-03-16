import { useState } from "react";
import { api } from "../lib/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // uh oh they deprecated formevent
  const login = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const data = await api("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (data.message === "Logged in") {
        navigate("/dashboard");
      }
    } catch (err) {
        console.error(err);
    }
  };

  return (
    <form onSubmit={login}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></input>

      <button>Send!</button>
    </form>
  );
}
