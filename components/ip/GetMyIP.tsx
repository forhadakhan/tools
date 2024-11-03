"use client";

import { cn } from '@/lib/utils';
import { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { LoadingDots } from '@/components/ui/LoadingDots';
import { CopyToClipboardButton } from '@/components/ui/CopyToClipboardButton';

interface GetMyIPProps {
    IPclassName?: string;      // Optional class for styling the IP address display
    TableclassName?: string;   // Optional class for styling the details table
    copy?: boolean;            // Determines if copy-to-clipboard button should be shown
}

interface IPInfo {
    ip: string;                // IP address
    city?: string;             // City based on IP geolocation
    region?: string;           // Region or state based on IP geolocation
    country?: string;          // Country code (ISO 3166-1 alpha-2) based on IP geolocation
    timezone?: string;         // Timezone based on IP geolocation
    org?: string;              // ISP or organization name associated with the IP
}

// Fetch IP address using api64.ipify.org
const fetchIpOnly = async (): Promise<string | null> => {
    try {
        const res = await fetch("https://api64.ipify.org?format=json");
        const data = await res.json();
        return data.ip;
    } catch (error) {
        console.error("Failed to fetch IP:", error);
        return null;
    }
};

// Fetch detailed IP information using ipinfo.io
const fetchIpDetails = async (ip: string): Promise<IPInfo | null> => {
    const token = process.env.NEXT_PUBLIC_IPINFO_API_TOKEN;
    try {
        const res = await fetch(`https://ipinfo.io/${ip}/json?token=${token}`);
        const data = await res.json();
        return { ...data, ip };
    } catch (error) {
        console.error("Failed to fetch IP details:", error);
        return null;
    }
};

/**
 * A React component that fetches and displays the user's IP address, with optional copy-to-clipboard functionality.
 * Initially, only the IP address is fetched and displayed. Additional information is loaded in the background.
 *
 * @param {GetMyIPProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
export const GetMyIP: React.FC<GetMyIPProps> = ({ IPclassName, TableclassName, copy = true }) => {
    const [ipInfo, setIpInfo] = useState<IPInfo | null>(null);  // State to hold IP information
    const [loading, setLoading] = useState(true);               // Loading state for initial IP fetch
    const [detailsLoading, setDetailsLoading] = useState(false); // Loading state for details fetch

    // Fetch IP address on component mount
    useEffect(() => {
        async function initializeIpInfo() {
            setLoading(true);
            const ip = await fetchIpOnly();
            if (ip) {
                setIpInfo({ ip });  // Display IP immediately
                setLoading(false);

                // Fetch additional details in the background
                setDetailsLoading(true);
                const detailedInfo = await fetchIpDetails(ip);
                if (detailedInfo) {
                    setIpInfo(detailedInfo);  // Update with additional details
                }
                setDetailsLoading(false);
            } else {
                setLoading(false);
            }
        }

        initializeIpInfo();
    }, []);

    // Show loading indicator while fetching initial IP
    if (loading) {
        return <LoadingDots size={6} />;
    }

    // Display an error message if fetching fails and no IP information is available
    if (!ipInfo) {
        return <p className="text-red-600">Failed to load IP information. Please try again later.</p>;
    }

    return (
        <article className={cn("flex flex-col items-center justify-center gap-2")}>
            {/* Display IP Address with optional copy-to-clipboard functionality */}
            <section className={cn('flex gap-2 font-extrabold text-2xl', IPclassName)}>
                {ipInfo.ip}
                {copy && <CopyToClipboardButton data={ipInfo.ip} />}
            </section>

            {/* Display IP Details in a table format if additional information is available */}
            {ipInfo.city || ipInfo.region || ipInfo.country || ipInfo.timezone || ipInfo.org ? (
                <table className={cn("text-base md:text-md lg:text-lg xl:text-xl 2xl:text-2xl my-4", TableclassName)}>
                    <thead>
                        <tr className="border border-gray-300">
                            <th colSpan={2} className="px-4 py-2">IP Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ipInfo.city && (
                            <tr className="border border-gray-300">
                                <td className="px-4 py-2 font-semibold text-gray-600">City</td>
                                <td className="px-4 py-2 bg-gray-100">{ipInfo.city}</td>
                            </tr>
                        )}
                        {ipInfo.region && (
                            <tr className="border border-gray-300">
                                <td className="px-4 py-2 font-semibold text-gray-600">Region</td>
                                <td className="px-4 py-2 bg-gray-100">{ipInfo.region}</td>
                            </tr>
                        )}
                        {ipInfo.country && (
                            <tr className="border border-gray-300">
                                <td className="px-4 py-2 font-semibold text-gray-600">Country</td>
                                <td className="px-4 py-2 bg-gray-100 flex items-center gap-2">
                                    {ipInfo.country}
                                    <ReactCountryFlag countryCode={ipInfo.country} svg />
                                </td>
                            </tr>
                        )}
                        {ipInfo.timezone && (
                            <tr className="border border-gray-300">
                                <td className="px-4 py-2 font-semibold text-gray-600">Time Zone</td>
                                <td className="px-4 py-2 bg-gray-100">{ipInfo.timezone}</td>
                            </tr>
                        )}
                        {ipInfo.org && (
                            <tr className="border border-gray-300">
                                <td className="px-4 py-2 font-semibold text-gray-600">ISP</td>
                                <td className="px-4 py-2 bg-gray-100">{ipInfo.org}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            ) : (
                detailsLoading && <LoadingDots size={4} />  // Show loading dots while fetching details
            )}
        </article>
    );
};

export default GetMyIP;
