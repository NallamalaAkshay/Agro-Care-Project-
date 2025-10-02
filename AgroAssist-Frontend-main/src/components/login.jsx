import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./main.css";
import { UserContext } from "../userContext";
import axios from "axios";
import { baseURL } from "../lib";

export const Login = () => {
    const { Login } = useContext(UserContext);
    const navigate = useNavigate();
    const initialValues = {
        email: "",
        password: "",
    };
    const [login, setLogin] = useState(initialValues);
    const [errors, setErrors] = useState({}); // State to store validation errors
    const [authError, setAuthError] = useState(""); // State for authentication error

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLogin({ ...login, [name]: value });
        setErrors({ ...errors, [name]: "" }); // Clear specific field error on change
        setAuthError(""); // Clear authentication error when inputs change
    };

    // Validate form fields
    const validate = () => {
        const newErrors = {};
        if (!login.email) {
            newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(login.email)) {
            newErrors.email = "Email is invalid.";
        }

        if (!login.password) {
            newErrors.password = "Password is required.";
        } 

        return newErrors;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formErrors = validate();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        try {
            const data = await axios
                .post(`${baseURL}/api/login`, login)
                .then((res) => res.data)
                .catch((err) => {
                    console.error(err);
                    throw new Error("Authentication failed");
                });

            console.log(data);
            Login(data.token);
            navigate("/");
        } catch (err) {
            console.log(err);
            setAuthError("Invalid username or password"); // Set authentication error message
        }
    };

    return (
        <div className="MainFrame">
            <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg lg:max-w-4xl">
                <div
                    className="hidden bg-cover lg:block lg:w-1/2"
                    style={{
                        backgroundImage:
                            "url('https://m.economictimes.com/thumb/msid-87640133,width-1200,height-900,resizemode-4,imgsize-218090/farmers-scheme-istock.jpg')",
                    }}
                ></div>

                <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
                    <p className="mt-3 text-xl text-center text-gray-600">Welcome back!</p>

                    {authError && (
                        <p className="mt-4 text-sm text-center text-red-500">{authError}</p>
                    )}

                    <div className="mt-4">
                        <label
                            className="block mb-2 text-sm font-medium text-gray-600"
                            htmlFor="LoggingEmailAddress"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            placeholder="Email"
                            className={`block w-full px-4 py-2 text-gray-700 bg-white border ${
                                errors.email ? "border-red-500" : "border-gray-300"
                            } rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300`}
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                        )}
                    </div>

                    <div className="mt-4">
                        <label
                            className="block mb-2 text-sm font-medium text-gray-600"
                            htmlFor="loggingPassword"
                        >
                            Password
                        </label>
                        <input
                            id="loggingPassword"
                            type="password"
                            name="password"
                            onChange={handleChange}
                            placeholder="Password"
                            className={`block w-full px-4 py-2 text-gray-700 bg-white border ${
                                errors.password ? "border-red-500" : "border-gray-300"
                            } rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300`}
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                        )}
                    </div>

                    <div className="mt-6">
                        <button
                            onClick={handleSubmit}
                            type="submit"
                            className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                        >
                            Sign In
                        </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <span className="w-1/5 border-b md:w-1/4"></span>
                        <a
                            href="/signup"
                            className="text-xs text-gray-500 uppercase hover:underline"
                        >
                            or sign up
                        </a>
                        <span className="w-1/5 border-b md:w-1/4"></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
