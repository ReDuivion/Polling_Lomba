import React, { useState } from "react";
import axios from "axios";

export default function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.password_confirmation) {
            console.log("Password and Confirm Password do not match");
            return;
        }
        try {
            const response = await axios.post(
                "http://localhost:8004/api/auth/register",
                formData
            );
            console.log(response.data);
        } catch (error) {
            if (
                error.response &&
                error.response.status === 422 &&
                error.response.data.errors.email
            ) {
                console.error("Email has already been taken");
            } else {
                console.error(error);
            }
        }
    };

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="flex items-center justify-center h-screen"
            >
                <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title mx-auto text-center">
                            SignUp
                        </h2>
                        <hr />
                        <div>
                            <label htmlFor="name">name</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="arienesu"
                                name="name"
                                onChange={handleChange}
                                value={formData.name}
                                className="input input-bordered input-info w-full max-w-xs"
                            />
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="arienesu@gmail.com"
                                name="email"
                                onChange={handleChange}
                                value={formData.email}
                                className="input input-bordered input-info w-full max-w-xs"
                            />
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                onChange={handleChange}
                                placeholder="example123"
                                value={formData.password}
                                className="input input-bordered input-info w-full max-w-xs"
                            />
                            <label htmlFor="password_confirmation">
                                Retype Password
                            </label>
                            <input
                                type="password"
                                id="password_confirmation"
                                name="password_confirmation"
                                onChange={handleChange}
                                value={formData.password_confirmation}
                                placeholder="example123"
                                className="input input-bordered input-info w-full max-w-xs"
                            />
                        </div>
                        <div className="card-actions justify-end">
                            <button type="submit" className="btn btn-primary">
                                Register
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}
