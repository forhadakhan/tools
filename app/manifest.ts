import { MetadataRoute } from "next";
import { TITLE, DESCRIPTION, SHORT_NAME } from "@/lib/meta";

// Extend the screenshot object type to include label and form_factor
type CustomScreenshot = {
    src: string;
    sizes?: string;
    type?: string;
    label?: string;        // Add custom property
    form_factor?: string;  // Add custom property
};

// Extend the manifest type to allow custom screenshots
interface CustomManifest extends MetadataRoute.Manifest {
    screenshots?: CustomScreenshot[];
}

export default function manifest(): CustomManifest {
    return {
        id: "/",
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
        orientation: "any",
        screenshots: [
            {
                src: "/screenshots/0-tools-homepage-narrow.png",
                sizes: "430x932",
                type: "image/png",
                label: "Tools Homepage Narrow", // Label describing the screenshot
                form_factor: "narrow", // Device form factor
            },
            {
                src: "/screenshots/0-tools-homepage.png",
                sizes: "1920x1080",
                type: "image/png",
                label: "Tools Homepage", // Label describing the screenshot
                form_factor: "wide", // Device form factor
            },
            {
                src: "/screenshots/1-generate-qr-code-narrow.png",
                sizes: "430x932",
                type: "image/png",
                label: "Generate QR Code Narrow", // Label describing the screenshot
                form_factor: "narrow", // Device form factor
            },
            {
                src: "/screenshots/1-generate-qr-code.png",
                sizes: "1920x1080",
                type: "image/png",
                label: "Generate QR Code", // Label describing the screenshot
                form_factor: "wide", // Device form factor
            },
            {
                src: "/screenshots/2-read-qr-code-narrow.png",
                sizes: "430x932",
                type: "image/png",
                label: "Read QR Code Narrow", // Label describing the screenshot
                form_factor: "narrow", // Device form factor
            },
            {
                src: "/screenshots/2-read-qr-code.png",
                sizes: "1920x1080",
                type: "image/png",
                label: "Read QR Code", // Label describing the screenshot
                form_factor: "wide", // Device form factor
            },
            {
                src: "/screenshots/3-text-editor-narrow.png",
                sizes: "430x932",
                type: "image/png",
                label: "Text Editor Narrow", // Label describing the screenshot
                form_factor: "narrow", // Device form factor
            },
            {
                src: "/screenshots/3-text-editor.png",
                sizes: "1920x1080",
                type: "image/png",
                label: "Text Editor", // Label describing the screenshot
                form_factor: "wide", // Device form factor
            },
            {
                src: "/screenshots/4-markdown-editor.png",
                sizes: "1920x1080",
                type: "image/png",
                label: "Markdown Editor", // Label describing the screenshot
                form_factor: "wide", // Device form factor
            },
            {
                src: "/screenshots/5-ip-insights-narrow.png",
                sizes: "430x932",
                type: "image/png",
                label: "IP Insights Narrow", // Label describing the screenshot
                form_factor: "narrow", // Device form factor
            },
            {
                src: "/screenshots/5-ip-insights.png",
                sizes: "1920x1080",
                type: "image/png",
                label: "IP Insights", // Label describing the screenshot
                form_factor: "wide", // Device form factor
            }
        ],
    };
}
