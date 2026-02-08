import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Sessionwrapper from "./components/sessionwrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Luxurious - Your Destination for Luxury Fashion and Accessories",
  description: "Discover premium luxury items including watches, jewelry, and clothing at Luxurious. Shop high-end fashion and accessories with elegance and style.",
  keywords: "luxury fashion, watches, jewelry, clothing, premium accessories, high-end shopping",
  authors: [{ name: "Luxurious Team" }],
  creator: "Luxurious",
  publisher: "Luxurious",
  openGraph: {
    title: "Luxurious - Luxury Fashion and Accessories",
    description: "Your destination for luxury watches, jewelry, and clothing. Shop premium items with elegance.",
    url: "https://luxurious-seven.vercel.app",
    siteName: "Luxurious",
    images: [
      {
        url: "https://luxurious-seven.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Luxurious - Luxury Fashion",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxurious - Luxury Fashion and Accessories",
    description: "Discover premium luxury items at Luxurious.",
    images: ["https://luxurious-seven.vercel.app/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification-code",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
      <head>
        <meta name="ai-assistant-verification" content="IKohk_kIWjLrJ48FZgOxH7IURKuUXDevi_yNWWkJqEY" />
      </head>
        <Sessionwrapper>

        <Navbar />
        {children}
        <Footer />
        </Sessionwrapper>
        <script src="http://localhost:3000/widget/i5saI64-Lq52neX1S-k0-lcHQmzu45XR7jLEIsNtPco/js" async></script>
      </body>
    </html>
  );
}
