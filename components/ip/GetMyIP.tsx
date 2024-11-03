"use client";

import { cn } from '@/lib/utils';
import { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { LoadingDots } from '@/components/ui/LoadingDots';
import { CopyToClipboardButton } from '@/components/ui/CopyToClipboardButton';


// Props for GetMyIP component
interface GetMyIPProps {
    IPclassName?: string;      // Optional class for styling the IP address display
    TableclassName?: string;   // Optional class for styling the details table
    copy?: boolean;            // Determines if copy-to-clipboard button should be shown
}

// Interface representing the structure of IP information data
interface IPInfo {
    ip: string;                // IP address
    city?: string;             // City based on IP geolocation
    region?: string;           // Region or state based on IP geolocation
    country?: string;          // Country code (ISO 3166-1 alpha-2) based on IP geolocation
    timezone?: string;         // Timezone based on IP geolocation
    org?: string;              // ISP or organization name associated with the IP
}

// Fetch IP information with a 1-second timeout; falls back to just the IP address if timed out
const fetchIpInfoWithTimeout = async (): Promise<IPInfo | null> => {
    const token = process.env.NEXT_PUBLIC_IPINFO_API_TOKEN;  // API token for ipinfo.io
    const controller = new AbortController();                // Controller to manage fetch abortion
    const { signal } = controller;

    try {
        // Attempt to fetch IP info from ipinfo.io with an abort signal for timeout management
        const ipInfoPromise = fetch(`https://ipinfo.io/json?token=${token}`, { signal })
            .then((res) => res.json())
            .then((data) => data as IPInfo);

        // Set up a timeout promise to abort fetch request after 1 second
        const timeoutPromise = new Promise<IPInfo>((resolve) => {
            setTimeout(() => {
                controller.abort();  // Abort the ipinfo.io request if it exceeds timeout
                resolve({ ip: '' }); // Resolve with an empty IP object to trigger fallback
            }, 1000);
        });

        // Use Promise.race to enforce timeout; returns the first-resolved promise
        const result = await Promise.race([ipInfoPromise, timeoutPromise]);

        // If the fetch was aborted and result contains an empty IP, fallback to just IP from ipify
        if (!result.ip) {
            const ipRes = await fetch("https://api64.ipify.org?format=json");
            const ipData = await ipRes.json();
            return { ip: ipData.ip };  // Return only IP address from ipify
        }

        return result;  // Return complete IP information if fetched successfully
    } catch (error) {
        // Log any fetch errors, such as abort errors or network issues
        console.error("Failed to fetch IP info:", error);

        // Fallback to fetching only IP address in case of any error
        try {
            const ipRes = await fetch("https://api64.ipify.org?format=json");
            const ipData = await ipRes.json();
            return { ip: ipData.ip };
        } catch (fallbackError) {
            console.error("Failed to fetch fallback IP:", fallbackError);
            return null;  // Return null if even the fallback fails
        }
    }
};


/**
 * A React component that fetches and displays IP information, with optional copy-to-clipboard functionality and details table.
 * If fetching fails, displays an error message. If fetching is still in progress, displays a loading indicator.
 * Automatically fetches IP information on component mount.
 *
 * @param {GetMyIPProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
export const GetMyIP: React.FC<GetMyIPProps> = ({ IPclassName, TableclassName, copy = true }) => {
    const [ipInfo, setIpInfo] = useState<IPInfo | null>(null);  // State to hold IP information
    const [loading, setLoading] = useState(true);               // Loading state for fetch status

    // Fetch IP information on component mount
    useEffect(() => {
        async function fetchIpInfo() {
            setLoading(true);                // Set loading to true while fetching
            const info = await fetchIpInfoWithTimeout();
            setIpInfo(info);                 // Store fetched IP information in state
            setLoading(false);               // Set loading to false after fetching
        }

        fetchIpInfo();                       // Invoke fetch function on mount
    }, []);

    // Show loading indicator if data is still being fetched
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

            {/* Display IP Details in a table format */}
            <table className={cn("text-base md:text-md lg:text-lg xl:text-xl 2xl:text-2xl my-4", TableclassName)}>
                {/* Only show table header if there are details to display */}
                {(ipInfo.city || ipInfo.region || ipInfo.country || ipInfo.timezone || ipInfo.org) && (
                    <thead>
                        <tr className="border border-gray-300">
                            <th colSpan={2} className="px-4 py-2">IP Details</th>
                        </tr>
                    </thead>
                )}
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
        </article>
    );
}

export default GetMyIP;
