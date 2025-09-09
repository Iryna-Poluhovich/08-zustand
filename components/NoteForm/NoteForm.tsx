"use client"

import { createNote, type Tag } from "@/lib/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Loading } from "notiflix"
import toast from "react-hot-toast"
// import Link from "next/link"
import { useRouter } from "next/navigation"
import css from "./NoteForm.module.css"
import { useNoteStore, initialDraft } from "@/lib/store/noteStore"
import { useEffect } from "react"

interface NoteFormProps {
  categories: Tag[]
}

export default function NoteForm({ categories }: NoteFormProps) {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { draft, setDraft, clearDraft } = useNoteStore()

    useEffect(() => {
    if (!draft.title && !draft.content && !draft.tag) {
      setDraft(initialDraft)
    }
  }, [draft, setDraft])

  const noteCreation = useMutation({
    mutationFn: async (formData: FormData) => {
      const title = formData.get("title") as string
      const content = formData.get("content") as string
      const tag = formData.get("tag") as Tag
      return await createNote({title, content, tag})
    },
    onSuccess: () => {
      Loading.remove()
      toast.success("Note has been successfully created!")
      queryClient.invalidateQueries({ queryKey: ["notes"] })
      clearDraft()
      router.back()
    },
    onError: () => {
      Loading.remove()
      toast.error("Error occured while creating note!")
    },
  })

  async function handleAction(formData: FormData) {
    Loading.hourglass()
    await noteCreation.mutateAsync(formData)
  }

  return (
    <form action={handleAction} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          className={css.input}
          required
          minLength={3}
          maxLength={50}
          value={draft.title}
          onChange={(e) => setDraft({ title: e.target.value })}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          name="content"
          id="content"
          rows={8}
          className={css.textarea}
          maxLength={500}
          value={draft.content}
          onChange={(e) => setDraft({ content: e.target.value })}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          name="tag"
          id="tag"
          className={css.select}
          value={draft.tag}
          onChange={(e) => setDraft({ tag: e.target.value as Tag })}
        >
          {categories
            .filter((tag) => tag !== "All")
            .map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
        </select>
      </div>

      <div className={css.actions}>
  <button
    type="button"
    className={css.cancelButton}
    onClick={() => router.back()}
  >
    Cancel
  </button>
  <button type="submit" className={css.submitButton}>
    Create note
  </button>
</div>
    </form>
  )
}