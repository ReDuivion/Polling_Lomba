import axios from "axios";
import { createContext, useState, useEffect } from "react";
import React from "react";
import { redirect, useNavigate } from "react-router-dom";
export const UserStore = createContext();

export default function UserContext(props) {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        token: null,
        user: {},
    });

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function getProfile() {
            try {
                const res = await axios.get(
                    "http://localhost:8004/api/profile"
                );
                setUser({
                    token: localStorage.getItem("TOKEN"),
                    user: res.data.data,
                });
                setLoading(false)
            } catch (error) {
                setLoading(false)
                navigate("/login");
                console.error(res.error.message);
            }
        }
        if (!localStorage.getItem("TOKEN")) {
            navigate("/login");
        }
        axios.defaults.headers["authorization"] =
            "bearer" + localStorage.getItem("TOKEN");

        getProfile();
    }, []);

    if(loading) {
        return null;
    }

    return (
        <UserStore.Provider value={[user, setUser]}>
            {props.children}
        </UserStore.Provider>
    );
}
