import type { MetadataRoute } from 'next';
import {
    HOME_ROUTE,
    QR_GENERATE_ROUTE,
    QR_READ_ROUTE,
    TEXT_EDITOR_ROUTE,
    MARKDOWN_PREVIEWER_ROUTE,
    MY_IP_ROUTE,
} from "@/lib/routes";


export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: HOME_ROUTE,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: QR_GENERATE_ROUTE,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: QR_READ_ROUTE,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: TEXT_EDITOR_ROUTE,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: MARKDOWN_PREVIEWER_ROUTE,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: MY_IP_ROUTE,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
    ]
}