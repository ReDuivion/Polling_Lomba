import React from "react";
import { UserStore } from "../Context/UserContext";
import { useState, useEffect, useContext } from "react";
import AOS from "aos";
import 'aos/dist/aos.css';
import LoginCon from "../components/Navbar/LoginCon"
export default function Home() {

    const [data, setData] = useState()
    const [user, setUser] = useContext(UserStore);
    console.log(user.user.email);
    console.log(user)

    useEffect(() => {
        AOS.init()
    },[])
    return (
        <>
            <main data-aos="fade-up" data-aosduration="3000" className="flex-1 text-2xl font-mono">
                <h1>Welcome</h1>
                <p>{user.token}</p>
                <h2>{user.user.email}</h2>
                <h3>{user.user.name}</h3>
                <h3>{user.user.created_at}</h3>
                <h3>{user.user.updated_at}</h3>
                <LoginCon/>

                <button className="btn btn-lg rotate-45 hover:rotate-0 hover:delay-150 hover:transition-all hover:ease-in-out active:transition-all active:translate-x-1 active:rotate-180 active:ease-in active:btn-md">Hello World</button>
            </main>
            <h1 data-aos="zoom-out-left">TESTSETESTESTET</h1>
        </>
    );
}
