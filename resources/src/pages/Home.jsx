import React from "react";
import { UserStore } from "../Context/UserContext";
import { useState, useEffect, useContext } from "react";

import LoginCon from "../components/Navbar/LoginCon"
export default function Home() {

    const [data, setData] = useState()
    const [user, setUser] = useContext(UserStore);
    console.log(user.user.email);
    console.log(user)
    return (
        <>
            <main className="flex-1 text-2xl font-mono">
                <h1>Welcome</h1>
                <p>{user.token}</p>
                <h2>{user.user.email}</h2>
                <h3>{user.user.name}</h3>
                <h3>{user.user.created_at}</h3>
                <h3>{user.user.updated_at}</h3>
                <LoginCon/>
            </main>
        </>
    );
}
