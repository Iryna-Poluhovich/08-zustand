import type { Metadata } from "next";
import css from "./page.module.css";

export const metadata: Metadata = {
  title: "404 - Page Not Found | NoteHub",
  description: "This page does not exist. The resource you are looking for was not found on NoteHub.",
  metadataBase: new URL("https://notehub.example.com"),
  openGraph: {
    title: "404 - Page Not Found | NoteHub",
    description: "This page does not exist. The resource you are looking for was not found on NoteHub.",
    url: "https://notehub.example.com/404",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub 404 Preview",
      },
    ],
    type: "website",
  },
};

const NotFound = () => {
  return (
    <div className={css.container}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;