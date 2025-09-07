import type { Metadata } from "next";
import css from "./page.module.css";

export const metadata: Metadata = {
  title: "Welcome to NoteHub",
  description:
    "NoteHub is a simple and efficient application for managing personal notes. Keep your thoughts organized and accessible anywhere.",
  openGraph: {
    title: "Welcome to NoteHub",
    description:
      "Organize and access your notes with NoteHub — the modern note management app.",
    url: "https://notehub.example.com",
    siteName: "NoteHub",
    images: [
      {
        url: "/og-image.png",
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
    title: "Welcome to NoteHub",
    description:
      "Organize and access your notes with NoteHub — the modern note management app.",
    images: ["/og-image.png"],
    creator: "@notehub",
  },
};
export default function Home() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>Welcome to NoteHub</h1>
      <p className={css.description}>
        NoteHub is a simple and efficient application designed for managing
        personal notes. It helps keep your thoughts organized and accessible in
        one place, whether you are at home or on the go.
      </p>
      <p className={css.description}>
        The app provides a clean interface for writing, editing, and browsing
        notes. With support for keyword search and structured organization,
        NoteHub offers a streamlined experience for anyone who values clarity
        and productivity.
      </p>
    </div>
  );
}
