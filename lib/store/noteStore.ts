import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Tag } from "@/lib/api"

const initialDraft = {
  title: "",
  content: "",
  tag: "Todo" as Tag,
}

type Draft = typeof initialDraft

interface NoteStore {
  draft: Draft
  setDraft: (note: Partial<Draft>) => void
  clearDraft: () => void
}

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) =>
        set((state) => ({
          draft: { ...state.draft, ...note },
        })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: "note-draft", 
    }
  )
)

export { initialDraft }