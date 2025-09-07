import axios from "axios"
import type { Note } from "../types/note"

axios.defaults.baseURL = "https://notehub-public.goit.study/api/"
axios.defaults.headers["Authorization"] =
	`Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`

const Tags = ["All", "Todo", "Work", "Personal", "Meeting", "Shopping"] as const

export type Tag = typeof Tags[number]           
export type FilterableTag = Exclude<Tag, "All"> 

export const getCategories = Tags

type SortBy = "created" | "updated"

interface FetchNotes {
  notes: Note[]
  totalPages: number
}

export const fetchNotes = async (
  search: string,
  page: number = 1,
  perPage: number = 10,
  tag?: FilterableTag, // ← тепер чітко
  sortBy?: SortBy
) => {
  const { data } = await axios.get<FetchNotes>("notes", {
    params: {
      search,
      page,
      perPage,
      tag,
      sortBy,
    },
  })
  return data
}

export const createNote = async (
	title: string,
	content: string,
	tag: string
) => {
	const { data } = await axios.post<Note>("notes", {
		title,
		content,
		tag,
	})
	return data
}

export const fetchNoteById = async (id: string) => {
	const { data } = await axios.get<Note>(`notes/${id}`)
	return data
}

export const deleteNote = async (id: string) => {
	const { data } = await axios.delete<Note>(`notes/${id}`)
	return data
}
