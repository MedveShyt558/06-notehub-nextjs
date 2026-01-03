import type { AxiosResponse } from "axios";
import { api } from "./axios";
import type { Note } from "@/types/note";

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res: AxiosResponse<Note> = await api.get(`/notes/${id}`);
  return res.data;
};
