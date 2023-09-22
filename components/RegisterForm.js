"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CiAlignRight } from "react-icons/ci";
import { FaSpinner } from "react-icons/fa";


const RegisterForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add your form submission logic here
        // Form validation
        if (!name || !email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        // Validate email format (simple example)
        // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // if (!emailRegex.test(email)) {
        //     setError("Please enter a valid email address.");
        //     return;
        // }

        // // Password length validation
        // if (password.length < 8) {
        //     setError("Password must be at least 8 characters long.");
        //     return;
        // }

        setIsLoading(true);
        console.log("Submitting");


        try {

            const resUserExist = await fetch("/api/userExists", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email
                })
            })

            const { user } = await resUserExist.json();

            if (user) {
                setError("User already exists");
                return;
            }

            const res = await fetch("api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            })

            if (res.ok) {
                const responseJson = await res.json();
                console.log("User registered successfully:", responseJson);
                // Reset the form
                const form = e.target;
                form.reset();
                router.push("/")
            } else {
                const errorResponse = await res.json();
                console.log("User registration failed:", errorResponse);
                setError(errorResponse.message || "Registration failed");
            }
        } catch (error) {
            console.log("Error during registration", error);
        }


        // If all validation passes, you can proceed with form submission logic here
        setError(false);
        // Add your form submission logic here
        setIsLoading(false);
    };

    return (
        <div className="my-12 mx-3 md:mx-6 text-center m-auto text-[#0b0804] ">
            <Link href={"/"} className="flex justify-center items-center gap-2 text-xs"><h3 className="my-3 ">Go to home</h3> <CiAlignRight /></Link>
            <h1 className="my-3">Enter your details</h1>
            <form onSubmit={handleSubmit} className="inline-flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Fullname"
                    value={name}
                    onChange={handleNameChange}
                    className="w-full"
                />
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                    className="w-full"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="w-full"
                />
                <button type="submit" className="bg-[#0b0804] text-[#eeeaa9] px-4 py-2 rounded-2xl relative">
                    {isLoading ? (
                        <div className="flex items-center gap-2 justify-center">
                            <p>Registering In</p> <FaSpinner className="animate-spin  " />
                        </div>
                    ) : (
                        "Register"
                    )}
                </button>
                <div>
                    {error && (
                        <p className="text-red-100 bg-red-800 px-4 py-2 my-2 inline m-auto">
                            {error}
                        </p>
                    )}
                    <p>
                        Already have an account? <Link href={"/login"}>Login</Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;
