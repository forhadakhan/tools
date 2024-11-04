import { MetadataRoute } from "next";
import { TITLE, DESCRIPTION, SHORT_NAME } from "@/lib/meta";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: TITLE,
        short_name: SHORT_NAME,
        start_url: "/",
        display: "standalone",
        description: DESCRIPTION,
        icons: [
            {
                "src": "/square-banner-image.jpeg",
                "sizes": "2160x2160",
                "type": "image/jpeg"
            },
            {
                "src": "/android-chrome-192x192.png",
                "sizes": "192x192",
                "type": "image/png"
            },
            {
                "src": "/android-chrome-512x512.png",
                "sizes": "512x512",
                "type": "image/png"
            },
            {
                "src": "/favicon-16x16.png",
                "sizes": "16x16",
                "type": "image/png"
            },
            {
                "src": "/favicon-32x32.png",
                "sizes": "32x32",
                "type": "image/png"
            }
        ],
        theme_color: "#000000",         // for the address bar
        background_color: "#000000",    // for splash screen
    };
}
