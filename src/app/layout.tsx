import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { introBootScript } from "@/lib/intro";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Harshil Maheshwari | Full Stack Developer",
    description: "Harshil Maheshwari, full stack developer. Projects, skills, clubs and contact.",
};

export const viewport: Viewport = {
    themeColor: "#050505",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        // suppressHydrationWarning: the boot script may add a class to <html> before hydration
        <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
            <head>
                <script dangerouslySetInnerHTML={{ __html: introBootScript }} />
            </head>
            <body>
                <SmoothScroll>{children}</SmoothScroll>
                <Analytics />
            </body>
        </html>
    );
}
