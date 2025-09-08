import type { Metadata } from "next";
// import { useQuery } from "@tanstack/react-query"
import NoteForm from "@/components/NoteForm/NoteForm";
import { getCategories, type Tag } from "@/lib/api";
import css from "./CreateNote.module.css";

export const metadata: Metadata = {
  title: "Create a new note | NoteHub",
  description: "Start writing and save a new note in NoteHub.",
  openGraph: {
    title: "Create a new note | NoteHub",
    description: "Start writing and save a new note in NoteHub.",
    url: "https://notehub.example.com/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub Create Note",
      },
    ],
  },
};

export default async function CreateNotePage() {
  const categories: Tag[] = await getCategories();

  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm categories={categories} />
      </div>
    </main>
  );
}
