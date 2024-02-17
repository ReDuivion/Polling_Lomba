import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserStore } from "../Context/UserContext";
import { Input } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
export default function LoginFun() {
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
            <form
                onSubmit={handleSubmit}
                className="flex items-center justify-center h-screen"
            >
                <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title mx-auto text-center">
                            Login
                        </h2>
                        <hr />
                        <div>
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                placeholder="arienesu@gmail.com"
                                name="username"
                                onChange={handleChange}
                                value={email}
                                className="input input-bordered input-info w-full max-w-xs"
                            />
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="123456"
                                name="password"
                                value={password}
                                onChange={handleChange}
                                className="input input-bordered input-info w-full max-w-xs"
                            />
                        </div>
                        <div className="card-actions justify-end">
                            <button type="submit" className="btn btn-primary">
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}
