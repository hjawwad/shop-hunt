import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar, Footer } from "../components";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SARMLEAKS.COM - #1 SARMs Source Reviews & Recommendations",
  description: "Discover the best SARMs sources with in-depth reviews, recommendations, and discount codes. Find trusted vendors for MK-677, Cardarine, RAD140, and more.",
  keywords: "SARMs, MK-677, Cardarine, RAD140, Stenabolic, Science.bio, SARMs reviews",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
