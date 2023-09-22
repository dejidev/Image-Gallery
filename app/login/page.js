import LoginForm from '../../components/LoginForm';
import { getServerSession } from 'next-auth';
import { authOptions } from "../../app/api/auth/[...nextauth]/route";
import { redirect, useRouter } from 'next/navigation';
import Image from 'next/image';
import bg from "../../app/assets/bgg.jpg"
import Footer from '../../components/Footer';

const Page = async () => {
    const session = await getServerSession(authOptions);
    // router = useRouter()
    console.log(session);
    // if (session) {
    //     // redirect("/dashboard")
    //     router.push("/dashboard")
    //     console.log("User is authenticated. Redirecting to /dashboard");
    // }

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
                <LoginForm session={session}/>
            </main>
            <Footer />
        </div>
    )
}

export default Page
