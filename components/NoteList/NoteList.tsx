"use client";

import Link from "next/link";
import css from "./NoteList.module.css";
import type { Note } from "@/types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@/lib/api";

type Props = {
  notes: Note[];
};

export default function NoteList({ notes }: Props) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.item}>
          <div className={css.header}>
            <h3 className={css.title}>{note.title}</h3>
            <p className={css.tag}>{note.tag}</p>
          </div>

          <p className={css.content}>{note.content}</p>

          <div className={css.actions}>
            <Link className={css.link} href={`/notes/${note.id}`}>
              View details
            </Link>

            <button
              className={css.delete}
              disabled={isPending}
              onClick={() => mutate(note.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
