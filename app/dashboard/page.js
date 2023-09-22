"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SignOut from "../../components/SignOut";
import UserInfo from "../../components/UserInfo";
import { fetchCuratedPhotos, searchPhotos } from "../../lib/pexelsApi";
import ImgContainer from "../../components/ImgContainer";
import bg from "../assets/bgg.jpg"
import Footer from "../../components/Footer";
import { Oval } from 'react-loader-spinner'
import { FaBars } from 'react-icons/fa';
import { signOut } from "next-auth/react";
const Page = () => {
  const [images, setImages] = useState([])
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  console.log(menuOpen);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSearch = async () => {
    if (!query) {
      return;
    }

    console.log(query);

    setLoading(true);
    try {
      const page = 1; // Replace with the desired page number
      const perPage = 15; // Replace with the desired number of results per page

      const searchResults = await searchPhotos(query, page, perPage);
      console.log('Search results:', searchResults);
      setImages(searchResults)
      setLoading(false)
    } catch (error) {
      console.error('Error searching for photos:', error);
    }
  };


  useEffect(() => {
    setLoading(true);

    fetchCuratedPhotos()
      .then((photos) => {
        console.log('Fetched images:', photos);
        setImages(photos);
        setLoading(false); // Set loading to false after photos are fetched
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
        setLoading(false); // Set loading to false in case of an error
      });
  }, []);

  return (
    <div className="">
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
          Gallery of <UserInfo />
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
            className={`bg-white text-[#0b0804] mt-2 p-2 rounded-md shadow-lg text-center gap-2 ${menuOpen ? 'block' : 'hidden'
              }`}
          >
            <button className="block text-[#0b0804] hover:text-red-500" onClick={() => signOut()}>
              Sign Out
            </button>
            <button className="block text-[#0b0804]">
              <Link href="/dashboard/upload" className="">
                Upload
              </Link>
            </button>
          </div>
        </div>

      </div>




      <div>
        <h1 className="mt-4 md:mt-8 px-3 md:px-6 font-bold mb-3">{query ? `${query} photos` : "Curated photos"}</h1>
      </div>
      <div className="flex justify-center items-center gap-2 px-3 md:px-6">
        <input
          type="text"
          placeholder="Search for photos"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch} className="bg-[#0b0804] text-[#eeeaa9] px-4 py-2 rounded-2xl relative">Search</button>


      </div>
      <ul className="p-5 md:p-10">
        <div className=" columns-2 gap-4  md:columsn-3 lg:columns-4 [&>img:not(first-child)]:mt-5 lg:[&>img:not(:first-child)]:mt-8">
          {images.map((image) => (
            // <li key={image.id}>

            <ImgContainer photo={image} key={image.id} />
            // </li>
          ))}
        </div>
      </ul>
      {loading && <div className="h-72 flex justify-center items-center" ><Oval
        height={80}
        width={80}
        color="#0b0804"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel='oval-loading'
        secondaryColor="#eeeaa9"
        strokeWidth={2}
        strokeWidthSecondary={2}

      /></div>}

      {/* <Dropzone className="hidden" uploadedImageData={uploadedImageData} setUploadedImageData={setUploadedImageData} /> */}

      <Footer />
    </div >
  )
}

export default Page
