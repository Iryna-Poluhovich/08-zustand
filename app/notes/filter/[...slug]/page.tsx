import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query"
import { fetchNotes, getCategories, Tags } from "@/lib/api"
import NotesClient from "./Notes.client"
import { Metadata } from "next"

interface NotesFilterProps {
	params: Promise<{ slug: Tags }>
}

export const dynamicParams = false
export const revalidate = 900

export async function generateMetadata({
	params,
}: NotesFilterProps): Promise<Metadata> {
	const { slug } = await params
	const descriptions = {
		All: `Browse all your notes in one place. Stay organized and access everything instantly with Notehub.`,
		Work: `Manage and share your work notes with ease. Stay productive and organized using Notehub.`,
		Todo: `Keep track of your tasks and to-dos effortlessly. Notehub helps you stay on top of your list.`,
		Personal: `Store and organize your personal notes securely. Notehub makes it simple and private.`,
		Meeting: `Capture and share meeting notes instantly. Stay aligned and productive with Notehub.`,
		Shopping: `Plan and manage your shopping lists in seconds. Notehub keeps your essentials organized.`,
	}
	return {
		title: "NoteHub - Share Notes Instantly Online",
		description: descriptions[slug[0]],
		openGraph: {
			title: "NoteHub - Share Notes Instantly Online",
			description: descriptions[slug[0]],
			siteName: "NoteHub",
			type: "website",
			images: [
				{
					url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
					width: 1200,
					height: 630,
					alt: "NoteHub - Share Notes Instantly Online",
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: "NoteHub - Share Notes Instantly Online",
			description: descriptions[slug[0]],
			images: [
				{
					url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
					width: 1200,
					height: 630,
					alt: "NoteHub - Share Notes Instantly Online",
				},
			],
			creator: "github.com/Iryna-Poluhovich",
		},
	}
}

export const generateStaticParams = async () => {
	const categories = await getCategories()
	return categories.map(category => ({ slug: [category] }))
}

export default async function NotesFilter({ params }: NotesFilterProps) {
	const queryClient = new QueryClient()
	const { slug } = await params
	const tag = slug[0] === "All" ? undefined : slug[0]

	await queryClient.prefetchQuery({
		queryKey: ["notes", { search: "", page: 1, tag }],
		queryFn: () => fetchNotes("", 1, tag),
	})

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<NotesClient tag={tag} />
		</HydrationBoundary>
	)
}