"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import css from "./NoteForm.module.css";
import type { CreateNoteRequest, NoteTag } from "@/types/note";
import { createNote } from "@/lib/api";

interface NoteFormProps {
  onCancel: () => void;
}

const TAGS: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

const validationSchema = Yup.object({
  title: Yup.string().trim().required("Title is required"),
  content: Yup.string().trim(),
  tag: Yup.mixed<NoteTag>().oneOf(TAGS).required("Tag is required"),
});

export default function NoteForm({ onCancel }: NoteFormProps) {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: CreateNoteRequest) => createNote(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["notes"] });
      onCancel();
    },
  });

  const initialValues: CreateNoteRequest = {
    title: "",
    content: "",
    tag: "Todo",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, actions) => {
        await mutateAsync({
          title: values.title.trim(),
          content: values.content.trim(),
          tag: values.tag,
        });
        actions.resetForm();
      }}
    >
      <Form className={css.form}>
        <h2>Create note</h2>

        <label className={css.formGroup}>
          Title
          <Field className={css.input} name="title" />
          <ErrorMessage name="title" component="p" className={css.error} />
        </label>

        <label className={css.formGroup}>
          Content
          <Field as="textarea" name="content" className={css.textarea} />
          <ErrorMessage name="content" component="p" className={css.error} />
        </label>

        <label className={css.formGroup}>
          Tag
          <Field as="select" name="tag" className={css.select}>
            {TAGS.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </Field>
          <ErrorMessage name="tag" component="p" className={css.error} />
        </label>

        <div className={css.actions}>
          <button
            type="button"
            onClick={onCancel}
            className={css.cancelButton}
            disabled={isPending}
          >
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={isPending}>
            Create
          </button>
        </div>
      </Form>
    </Formik>
  );
}
