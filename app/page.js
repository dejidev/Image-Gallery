import Image from 'next/image';
import Link from 'next/link';
// import LoginForm from '@/components/LoginForm';
import { getServerSession } from 'next-auth';
import { authOptions } from "../app/api/auth/[...nextauth]/route";
import { redirect } from 'next/navigation';
import bg from "../app/assets/bgg.jpg";
import Footer from "../components/Footer"

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard")
  }

  return (
    <main className=' w-full bg-[#FFFDD0] h-full'>
      {/* Background Image */}
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
          Gallery of the Gods
        </h1>
      </div>

      {/* Content */}
      <div className='p-4 text-center  text-[#0b0804] mt-8 px-3 md:px-6'>
        <h1 className='text-4xl font-bold mb-6'>Discover, share and upload the world’s best photos</h1>
        <div >
          <p className='m-auto md:w-2/3 lg:w-1/2'>Login to get inspired with incredible photos from diverse styles and genres around the world. We are not guided by fads—just great photography.</p>
          <div className='flex flex-col items-center justify-center gap-2'>
            <Link href="/login" className='bg-[rgb(245,161,51)] text-[#eeeaa9] px-6 py-2 mt-6 mb-3 rounded-full'>
              Login
            </Link>
            <Link href="/register" className=' bg-[rgb(245,161,51)] text-[#eeeaa9] px-6 py-2 mb-6 rounded-full'>
              Register
            </Link>
          </div>
          <p className='md:w-2/3 lg:w-1/2 m-auto'>
            Embark on a visual journey filled with awe-inspiring,
            breathtaking photos that span a rich tapestry of diverse styles and genres,
            capturing the essence of cultures and landscapes from all corners of the globe.
          </p>

        </div>
      </div>

      <Footer/>
    </main>
  )
}
