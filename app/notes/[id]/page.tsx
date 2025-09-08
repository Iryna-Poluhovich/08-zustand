import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";
import type { Metadata } from "next";

interface NoteDetailsProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata(
  { params }: NoteDetailsProps
): Promise<Metadata> {
  const { id } = await params;

  try {
    const note = await fetchNoteById(id);

    const title = `${note.title} | NoteHub`;
    const description = note.content
      ? `${note.content.slice(0, 150)}...`
      : "View details of this note in NoteHub.";

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "article",
        url: `https://notehub.example.com/notes/${id}`,
        siteName: "NoteHub",
        images: [
          {
            url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
            width: 1200,
            height: 630,
            alt: `NoteHub note: ${note.title}`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
      },
    };
  } catch {
    return {
      title: "Note not found | NoteHub",
      description: "This note does not exist or could not be loaded.",
      openGraph: {
        title: "Note not found | NoteHub",
        description: "This note does not exist or could not be loaded.",
        type: "article",
        url: `https://notehub.example.com/notes/${id}`,
        siteName: "NoteHub",
      },
    };
  }
}

const NoteDetails = async ({ params }: NoteDetailsProps) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient id={id} />
    </HydrationBoundary>
  );
};

export default NoteDetails;