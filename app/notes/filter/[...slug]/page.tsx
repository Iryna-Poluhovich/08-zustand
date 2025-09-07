import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes, getCategories, type Tag } from "@/lib/api";
import NotesClient from "./Notes.client";
import type { Metadata } from "next";

interface NotesFilterProps {
  params: { slug: string[] };
}

type FilterableTag = Exclude<Tag, "All">;

export const dynamicParams = false;
export const revalidate = 900;

export const generateStaticParams = async () => {
  const categories = [...getCategories];
  return categories.map(category => ({ slug: [category] }));
};

export async function generateMetadata(
  { params }: NotesFilterProps
): Promise<Metadata> {
  const { slug } = params;
  const categorySlug = slug[0];
  const category: FilterableTag | "All" =
    categorySlug === "All" ? "All" : (categorySlug as FilterableTag);

  const title =
    category === "All" ? "All Notes | NoteHub" : `${category} Notes | NoteHub`;
  const description =
    category === "All"
      ? "Browse all your notes in NoteHub. Organize, search and manage them easily."
      : `Browse your ${category.toLowerCase()} notes in NoteHub. Organize, search and manage them easily.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://notehub.example.com/notes/filter/${category}`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `NoteHub ${category} notes preview`,
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
}

export default async function NotesFilter({ params }: NotesFilterProps) {
  const queryClient = new QueryClient();
  const { slug } = params;
  const categorySlug = slug[0];

  const category: FilterableTag | undefined =
    categorySlug === "All" ? undefined : (categorySlug as FilterableTag);

  const categories: Tag[] = [...getCategories];

  await queryClient.prefetchQuery({
    queryKey: ["notes", { search: "", page: 1, category }],
    queryFn: () => fetchNotes("", 1, undefined, category),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient category={category} categories={categories} />
    </HydrationBoundary>
  );
}