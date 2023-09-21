"use client"
import { useState } from "react";
import Dropzone from "../../../components/DropZone";
import Image from "next/image";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import bg from "../../assets/bgg.jpg";
import Footer from "../../../components/Footer"
const page = () => {
    const [menuOpen, setMenuOpen] = useState(false);



    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    return (
        <div>
            <div className=' w-full relative'>
                <Image
                    className='h-72 '
                    alt="poster"
                    src={bg}
                    quality={100}
                    sizes="100vw"
                    style={{
                        objectFit: 'cover',
                    }}
                />
                <h1 className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl text-center font-bold text-white'>
                    Upload to gallery
                </h1>


                {/* Hamburger menu */}
                <div className={`absolute top-4 right-4 `}>
                    <button
                        onClick={toggleMenu}
                        className="text-3xl focus:outline-none text-white bg-[#0b0804] p-2"
                    >
                        <FaBars /> {/* Use the FaBars icon */}
                    </button>
                    <div
                        className={`bg-white text-[#0b0804] mt-2 p-2 rounded-md shadow-lg text-center gap-2 ${menuOpen ? "block" : "hidden"
                            }`}
                    >
                        <button className={`block text-[#0b0804] hover:text-red-500`}>
                            Sign Out
                        </button>
                        <button className={`block text-[#0b0804] hover:text-red-500`}>
                            <Link href="/dashboard">Dashboard</Link>
                        </button>
                    </div>
                </div>

            </div>
            <div className="mt-8 mx-4 md:mx-8 lg:mx-16">
                <Dropzone />
            </div>
            <Footer />
        </div>
    )
}

export default page
