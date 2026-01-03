"use client";

import { useState } from "react";
import css from "./NoteForm.module.css";
import type { CreateNoteRequest, NoteTag } from "@/types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";

type Props = {
  onCancel: () => void;
};

const TAGS: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function NoteForm({ onCancel }: Props) {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState<NoteTag>("Todo");

  const { mutate, isPending, error } = useMutation({
    mutationFn: (payload: CreateNoteRequest) => createNote(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["notes"] });
      onCancel(); // закриваємо модалку
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Мінімальна валідація (щоб не створювати порожні)
    if (!title.trim()) return;

    mutate({
      title: title.trim(),
      content: content.trim(),
      tag,
    });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <h2 className={css.title}>Create note</h2>

      <label className={css.label}>
        Title
        <input
          className={css.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
        />
      </label>

      <label className={css.label}>
        Content
        <textarea
          className={css.textarea}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write something..."
        />
      </label>

      <label className={css.label}>
        Tag
        <select
          className={css.select}
          value={tag}
          onChange={(e) => setTag(e.target.value as NoteTag)}
        >
          {TAGS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>

      {error && <p className={css.error}>Something went wrong.</p>}

      <div className={css.actions}>
        <button className={css.cancel} type="button" onClick={onCancel} disabled={isPending}>
          Cancel
        </button>
        <button className={css.submit} type="submit" disabled={isPending}>
          Create
        </button>
      </div>
    </form>
  );
}
