import { useState } from "react";
import { api } from "../lib/api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const data = await api("/auth/register", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (data.message === "Signed in") {
        navigate('/login')
      }
    } catch (err) {
        console.error(err);
    }
  };

  return (
    <form onSubmit={signin}>
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
