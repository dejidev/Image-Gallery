"use client"
import { useSession } from "next-auth/react";

const UserInfo = () => {

const {data: session} = useSession();

    return (
        <div className="grid place-items-center">
            <p>{session?.user?.name}</p>
        </div>
    )
}

export default UserInfo;
