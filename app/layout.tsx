import "./globals.css";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { META_INFO } from "@/lib/meta";
import { SchemaMarkup } from "@/lib/schema-markup";

export const metadata: Metadata = META_INFO;

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentYear = new Date().getFullYear();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SchemaMarkup) }}
        />
      </head>
      <body
        className={cn(
          "min-h-screen flex flex-col antialiased bg-gray-50 px-4 ",
          geistSans.variable, geistMono.variable,
        )}
        style={{ minHeight: '100vh' }}
      >
        <div className="flex-grow">
          {children}
        </div>

        <footer className="text-xs md:text-sm text-gray-400 text-center py-8 mt-auto">
          &copy; {currentYear} <a href="https://forhadakhan.com" className="font-semibold">Forhad Khan</a>. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
