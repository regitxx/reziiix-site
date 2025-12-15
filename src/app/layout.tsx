import "./globals.css";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./reziiix.effects.css";

const plusJakarta = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata: Metadata = {
    title: "REZIIIX — AI Automation Studio",
    description:
        "REZIIIX is a focused AI automation studio building production-grade agent systems.",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={plusJakarta.variable}>
        <body className="min-h-screen bg-black text-neutral-100 antialiased font-sans">
        {children}
        </body>
        </html>
    );
}
