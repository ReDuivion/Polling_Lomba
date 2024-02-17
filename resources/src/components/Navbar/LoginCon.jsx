import React, { useState, useEffect, useContext } from "react";
import { UserStore } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function LoginCon() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useContext(UserStore);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if the user is already logged in using the token in local storage
        const token = localStorage.getItem("TOKEN");
        if (token) {
            // If token exists, set the user and login status
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            setIsLoggedIn(true);
            setLoading(false);
        } else {
            // If token doesn't exist, set loading to false
            setIsLoggedIn(false);
            setLoading(false);
        }
    }, []);

    const handleLogout = async () => {
        try {
            setLoading(true);
            const res = await axios.get("http://localhost:8004/api/logout");
            if (res.data.status) {
                setUser(null);

                localStorage.removeItem("TOKEN");

                delete axios.defaults.headers.common["Authorization"];

                window.location.reload();
                setIsLoggedIn(false);
                navigate("/", {replace: true, state: {}});
                navigate(0)
            } else {
                console.error("Logout failed");
            }
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {isLoggedIn ? (
                // If user is logged in, show logout button
                <button onClick={handleLogout} className="btn btn-danger">
                    Logout
                </button>
            ) : (
                // If user is not logged in, do nothing
                <>

                </>
            )}
        </div>
    );
}
