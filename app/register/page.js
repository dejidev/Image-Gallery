import RegisterForm from "../../components/RegisterForm";
import Footer from "../../components/Footer";
import Image from "next/image";
import bg from "../assets/bgg.jpg"
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
const Page = async () => {
    const session = await getServerSession(authOptions);

    if (session) {
        redirect("/dashboard")
    }

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
                <div className='relative'>
                    <Image
                        className='h-72'
                        alt="poster"
                        src={bg}
                        quality={100}
                        sizes="100vw"
                        style={{
                            objectFit: 'cover',
                        }}
                    />
                    <h1 className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl text-center font-bold text-white'>
                        Login to the Gallery of the gods
                    </h1>
                </div>
                <RegisterForm />
            </main>
            <Footer />
        </div>
    )
}

export default Page
