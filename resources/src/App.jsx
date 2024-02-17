import axios from "axios";
import { useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserContext from "./Context/UserContext";
import Home from "./pages/Home";
import { Button } from "@chakra-ui/react";
import Header from "./components/Navbar/Header.jsx";

export default function App() {
    const navigate = useNavigate();
    return (
        <>

            <UserContext>
            <Header/>
                <Routes>
                    <Route
                        exact
                        path="/register"
                        element={<Register />}
                    ></Route>
                    <Route exact path="/login" element={<Login />}></Route>
                    <Route exact path="/" element={<Home />}></Route>
                </Routes>
            </UserContext>
        </>
    );
}
