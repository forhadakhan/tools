// app/my-ip/page.tsx

import { Metadata } from 'next';
import { GetMyIP } from '@/components/ip/GetMyIP';
import { GetVisitorInfo } from '@/components/ip/GetVisitorInfo';


export const metadata: Metadata = {
    title: 'Get my IP address',
    description: 'What is my IP address? Find out your public IP address with this tool.',
    keywords: 'What is my IP address?, get my IP address, get public IP address, ip address, ip, my ip, web app',
};

export default function MyIPHomePage() {

    return (
        <main>
            <h1 className='sr-only'>What is my IP address?</h1>
            <h1 className='sr-only'>{metadata.title as string}</h1>
            <h2 className='sr-only'>{metadata.description as string}</h2>

            <section className='min-h-screen flex flex-col items-center gap-4 py-4'>
                <h3 className="scroll-m-20 text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-extrabold tracking-tight text-center text-gray-600 my-2">
                    Your public IP address is
                </h3>

                <GetMyIP IPclassName="scroll-m-20 text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-extrabold tracking-tight text-center mx-auto my-8" />

                <GetVisitorInfo />
            </section>
        </main>
    );
}
