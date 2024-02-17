import React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserStore } from "../Context/UserContext";
import { Input } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import LoginFun from "../components/LoginFun";
export default function Login() {
    const toast = useToast();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [user, setUser] = useContext(UserStore);
    const { username: email, password } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:8004/api/auth/login",
                {
                    email,
                    password,
                }
            );

            localStorage.setItem("TOKEN", response.data.token);
            axios.defaults.headers["authorization"] =
                "bearer" + localStorage.getItem("TOKEN");
            const res = await axios.get("http://localhost:8004/api/profile");

            setUser({
                token: localStorage.getItem("TOKEN"),
                user: res.data.data,
            });
            toast({
                title: "Selamat Datang Kembali",
                description: `Selamat Datang Kembali ${res.data.data.name}`,
                duration: 5000,
                status: "success",
                isClosable: true,
            });

            navigate("/");
        } catch (error) {
            console.error("Login failed:", error.response.data);
        }
    };

    useEffect(() => {
        if (user.token != null) {
            navigate("/");
        }
    }, []);

    return (
        <>
          <LoginFun/>
        </>
    );
}
