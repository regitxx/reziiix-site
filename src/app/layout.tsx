import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Reziiix – AI Automation & Agents",
    description: "Reziiix builds custom AI agents and automations for modern enterprises.",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body className="bg-[#050814] text-slate-100">
        {children}
        </body>
        </html>
    );
}
