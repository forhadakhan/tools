import { AppLinkProps } from '@/lib/type-interface';
import * as to from "@/lib/routes";

// Array to hold link data
export const AppLinks: AppLinkProps[] = [
    { id: 'qr-code', href: to.QR_ROUTE, icon: "QrCodeIcon", label: "QR Code" },
    { id: 'text-editor', href: to.TEXT_EDITOR_ROUTE, icon: "FilePenLineIcon", label: "Text Editor" },
    { id: 'markdown-previewer', href: to.MARKDOWN_PREVIEWER_ROUTE, icon: "Columns2Icon", label: "Markdown Previewer" },
];

// Function to get a link by its id
export const getAppLinkById = (id: string): AppLinkProps | undefined => {
    return AppLinks.find(link => link.id === id);
}
