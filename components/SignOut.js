"use client";

import { signOut } from "next-auth/react";

const SignOut = () => {
    return (
        <div>
            <button className="" onClick={() => signOut()}>Sign out</button>
        </div>
    )
}

export default SignOut
