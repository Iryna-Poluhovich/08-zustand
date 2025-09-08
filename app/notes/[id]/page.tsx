import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query"
import NoteDetailsClient from "./NoteDetails.client"
import { fetchNoteById } from "@/lib/api"
import { Metadata } from "next"

interface NoteDetailsProps {
	params: Promise<{ id: string }>
}

const getBaseURL = () => {
	return process.env.NODE_ENV === "production"
		? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
		: `http://localhost:3000`
}

export async function generateMetadata({
	params,
}: NoteDetailsProps): Promise<Metadata> {
	const { id } = await params
	const note = await fetchNoteById(id)
	return {
		title: `Note: ${note.title}`,
		description: note.content.slice(0, 30),
		openGraph: {
			title: `Note: ${note.title}`,
			description: note.content.slice(0, 100),
			url: `${getBaseURL()}/notes/${id}`,
			siteName: "NoteHub",
			type: "article",
			images: [
				{
					url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
					width: 1200,
					height: 630,
					alt: note.title,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: note.title,
			description: note.content.slice(0, 30),
			images: [
				{
					url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
					width: 1200,
					height: 630,
					alt: note.title,
				},
			],
		},
	}
}

const NoteDetails = async ({ params }: NoteDetailsProps) => {
	const { id } = await params
	const queryClient = new QueryClient()

	await queryClient.prefetchQuery({
		queryKey: ["note", id],
		queryFn: () => fetchNoteById(id),
	})

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<NoteDetailsClient id={id}/>
		</HydrationBoundary>
	)
}

export default NoteDetails