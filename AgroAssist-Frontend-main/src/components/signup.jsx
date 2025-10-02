import React, { useContext, useState } from "react";
import axios from "axios";
import "./main.css";
import { baseURL } from "../lib";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../userContext";

export const Signup = () => {
    const initialValues = {
        email: "",
        name: "",
        password: "",
        confirmPassword: "",
        role: "user", // Default role
    };
    const { Login } = useContext(UserContext);
    const [signup, setSignup] = useState(initialValues);
    const [errors, setErrors] = useState({}); // To store field-specific errors
    const [successMessage, setSuccessMessage] = useState(""); // For displaying success messages
    const [errorMessage, setErrorMessage] = useState(""); // For displaying server-side errors
    const Navigate = useNavigate();

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignup({ ...signup, [name]: value });
        setErrors({ ...errors, [name]: "" }); // Clear field-specific errors on change
        setSuccessMessage(""); // Clear success message on input change
        setErrorMessage(""); // Clear server-side errors on input change
        console.log(e.target)
    };

    // Validate form fields
    const validate = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/; // Minimum 8 characters, 1 letter, 1 number

        // Email validation
        if (!signup.email) {
            newErrors.email = "Email is required.";
        } else if (!emailRegex.test(signup.email)) {
            newErrors.email = "Enter a valid email address.";
        }

        // Name validation
        if (!signup.name) {
            newErrors.name = "Name is required.";
        } else if (signup.name.length < 3) {
            newErrors.name = "Name must be at least 3 characters long.";
        }

        // Password validation
        if (!signup.password) {
            newErrors.password = "Password is required.";
        } else if (!passwordRegex.test(signup.password)) {
            newErrors.password =
                "Password must be at least 8 characters, include 1 letter and 1 number.";
        }

        // Confirm password validation
        if (!signup.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password.";
        } else if (signup.confirmPassword !== signup.password) {
            newErrors.confirmPassword = "Passwords do not match.";
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
            console.log(signup)
            const response = await axios.post(`${baseURL}/api/signup`, signup);
            setSuccessMessage(response.data.message || "Signup successful!");
            setSignup(initialValues); // Reset the form after successful signup
            Login(response.data.token);
            Navigate("/");
        } catch (err) {
            setErrorMessage(
                err.response?.data || "An error occurred during signup. Please try again."
            );
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
                    <p className="mt-3 text-xl text-center text-gray-600">Create Your Account</p>

                    {successMessage && (
                        <p className="mt-4 text-sm text-center text-green-500">{successMessage}</p>
                    )}
                    {errorMessage && (
                        <p className="mt-4 text-sm text-center text-red-500">{errorMessage}</p>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mt-4">
                            <label
                                className="block mb-2 text-sm font-medium text-gray-600"
                                htmlFor="signupEmail"
                            >
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                onChange={handleChange}
                                value={signup.email}
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
                                htmlFor="signupName"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                onChange={handleChange}
                                value={signup.name}
                                placeholder="Name"
                                className={`block w-full px-4 py-2 text-gray-700 bg-white border ${
                                    errors.name ? "border-red-500" : "border-gray-300"
                                } rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300`}
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                            )}
                        </div>

                        <div className="mt-4">
                            <label
                                className="block mb-2 text-sm font-medium text-gray-600"
                                htmlFor="signupPassword"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                onChange={handleChange}
                                value={signup.password}
                                placeholder="Password"
                                className={`block w-full px-4 py-2 text-gray-700 bg-white border ${
                                    errors.password ? "border-red-500" : "border-gray-300"
                                } rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300`}
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                            )}
                        </div>

                        <div className="mt-4">
                            <label
                                className="block mb-2 text-sm font-medium text-gray-600"
                                htmlFor="signupConfirmPassword"
                            >
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                onChange={handleChange}
                                value={signup.confirmPassword}
                                placeholder="Confirm Password"
                                className={`block w-full px-4 py-2 text-gray-700 bg-white border ${
                                    errors.confirmPassword ? "border-red-500" : "border-gray-300"
                                } rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300`}
                            />
                            {errors.confirmPassword && (
                                <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
                            )}
                        </div>

                        <div className="mt-4">
                            <label
                                className="block mb-2 text-sm font-medium text-gray-600"
                                htmlFor="signupRole"
                            >
                                Role
                            </label>
                            <select
                                name="role"
                                onChange={handleChange}
                                value={signup.role}
                                className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                            >
                                <option value="user">User</option>
                                <option value="farmer">Farmer</option>
                            </select>
                        </div>

                        <div className="mt-6">
                            <button
                                type="submit"
                                className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
