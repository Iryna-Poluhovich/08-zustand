import { fetchNoteById } from "@/lib/api";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import NotePreviewClient from "./NotePreview.client";
import type { Metadata } from "next";

type PageProps = {
  params: { id: string };
};

const NotePreviewPage = async ({ params }: PageProps) => {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient id={id} />
    </HydrationBoundary>
  );
};

export default NotePreviewPage;

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const note = await fetchNoteById(params.id);

  return {
    title: note.title,
    description: note.content.slice(0, 160), // перші 160 символів як description
    openGraph: {
      title: note.title,
      description: note.content.slice(0, 160),
      url: `https://notehub.example.com/notes/${params.id}`,
    },
  };
};