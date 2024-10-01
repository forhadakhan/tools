import { TITLE, DESCRIPTION, KEYWORDS, CONTACT_EMAIL, SHORT_NAME } from "@/lib/meta";

export const SchemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": TITLE,
    "email": CONTACT_EMAIL,
    "alternateName": SHORT_NAME,
    "url": URL,
    "keywords": [...KEYWORDS],
    "logo": {
        "@type": "ImageObject",
        "url": "/icon.jpeg",
    },
    "image": {
        "@type": "ImageObject",
        "url": "/banner-image.jpeg",
    },
    "description": DESCRIPTION,
};