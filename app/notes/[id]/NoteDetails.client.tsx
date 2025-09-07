"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import styles from "./NoteDetails.module.css";

interface NoteDetailsClientProps {
  id: string;
}

export default function NoteDetailsClient({ id }: NoteDetailsClientProps) {
  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading note...</p>;
  if (error || !note) return <p>Failed to load note.</p>;

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={styles.content}>{note.content}</p>
        <p className={styles.date}>{note.createdAt}</p>
      </div>
    </div>
  );
}
