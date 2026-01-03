import type { AxiosResponse } from "axios";
import { api } from "./axios";
import type { CreateNoteRequest, FetchNotesResponse, Note } from "@/types/note";

export const fetchNotes = async (params: {
  page: number;
  perPage: number;
  search?: string;
}): Promise<FetchNotesResponse> => {
  const res: AxiosResponse<FetchNotesResponse> = await api.get("/notes", {
    params: {
      page: params.page,
      perPage: params.perPage,
      search: params.search || undefined,
    },
  });

  return res.data;
};

export const createNote = async (payload: CreateNoteRequest): Promise<Note> => {
  const res: AxiosResponse<Note> = await api.post("/notes", payload);
  return res.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const res: AxiosResponse<Note> = await api.delete(`/notes/${id}`);
  return res.data;
};
