import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google"; 
import "./globals.css";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  weight: ["400", "500", "700"], 
  variable: "--font-roboto",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "NoteHub",
    template: "%s | NoteHub",
  },
  description: "NoteHub is a modern app for managing and filtering your notes.",
  applicationName: "NoteHub",
  authors: [{ name: "NoteHub Team", url: "https://notehub.example.com" }],
  keywords: ["notes", "productivity", "organizer", "todo", "notehub"],
  metadataBase: new URL("https://notehub.example.com"),
  openGraph: {
    title: "NoteHub",
    description: "Organize and filter your notes easily.",
    url: "https://notehub.example.com",
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NoteHub",
    description: "The easiest way to organize your notes.",
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
    creator: "@notehub",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* ✅ додаємо roboto.variable */}
      <body className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable}`}>
        <TanStackProvider>
          <Header />
          <main>
            {children}
            {modal}
          </main>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}