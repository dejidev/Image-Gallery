"use client";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CiAlignRight } from "react-icons/ci";
import { FaSpinner } from "react-icons/fa";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();





    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Form validation
        if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        setIsLoading(true);
        // Your login submission logic here

        try {

            const res = await signIn("credentials", {
                email, password, redirect: false
            });

            if (res.error) {
                setError("Invalid Credentials");
                return
            }

            router.replace("dashboard")

        } catch (error) {
            console.error("Error during login", error);
            setIsLoading(false)
            // setError("An unexpected error occurred. Please try again later.");
        }
    };

    return (
        <div className="my-12 mx-3 md:mx-6 text-center m-auto text-[#0b0804] ">
            <Link href={"/"} className="flex justify-center items-center gap-2 text-xs"><h3 className="my-3 ">Go to home</h3> <CiAlignRight /></Link>

            <h1 className="my-3">Enter your details</h1>
            <form onSubmit={handleSubmit} className="inline-flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}

                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <button type="submit" className="bg-[#0b0804] text-[#eeeaa9] px-4 py-2 rounded-2xl relative">
                    {isLoading ? (
                        <div className="flex items-center gap-2 justify-center">
                            <p>Logging In</p> <FaSpinner className="animate-spin  " />
                        </div>
                    ) : (
                        "Login"
                    )}
                </button>
                <div>
                    {error && (
                        <p className="text-red-100 bg-red-800 px-4 py-2 my-2 inline m-auto">
                            {error}
                        </p>
                    )}
                    <p>
                        No account yet? <Link href="/register">Register</Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
