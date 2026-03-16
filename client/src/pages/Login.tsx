import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = () => {
        
    }
    return ( 
        <form onSubmit={login}>
            <input type="email" value={email} onChange={(e => setEmail(e.target.value))}></input>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}></input>
            
            <button>Send!</button>
        </form>
    )
}