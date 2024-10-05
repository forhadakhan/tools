import type { Metadata } from "next";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://tools.forhadakhan.com";
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@forhadakhan.com";
export const TITLE = "Tools by Forhad Khan";
export const SHORT_NAME = "TFK";
export const KEYWORDS = ["Tools", "Tool Kit", "essential tools", "all-in-one tools app", "productivity tools", "toolkit app"];
export const DESCRIPTION = "Discover Tools - the ultimate app for all your essential tools, seamlessly combined in one convenient application!";

export const META_INFO: Metadata = {
    title: {
        template: "%s | Tools by Forhad Khan",
        default: TITLE,
    },
    applicationName: TITLE,
    description: DESCRIPTION,
    keywords: KEYWORDS,
    authors: [{ name: "FORHAD KHAN", url: "https://forhadakhan.com" }],
    openGraph: {
        title: "Tools by Forhad Khan - Your all-in-One tool-kit for everyday needs!",
        siteName: TITLE,
        description: DESCRIPTION,
        url: BASE_URL,
        type: "website",
        images: [
            {
                url: `/banner-image.jpeg`,
                width: 2400,
                height: 1260,
                alt: TITLE,
            },
            {
                url: `/icon.jpeg`,
                width: 800,
                height: 800,
                alt: TITLE,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        creator: "@forhadakhan",
        title: TITLE,
        description: DESCRIPTION,
        images: `/banner-image.jpeg`,
    },
    robots: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
    },
};