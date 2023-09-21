import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import User from "@/lib/models/user";

export async function POST(req) {
    try {
        await connectMongoDB();
        const { email } = await req.json();
        const user = await User.findOne({ email }).select("_id")
        console.log("User: ", user);
        return NextResponse.json({ user });
    } catch (error) {
        console.log(error);
    }
}