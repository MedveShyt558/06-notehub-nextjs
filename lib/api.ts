import axios from "axios";
import type { AxiosResponse } from "axios";
import type { CreateNoteRequest, Note } from "@/types/note";


export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

const BASE_URL = process.env.NEXT_PUBLIC_NOTEHUB_API;

if (!BASE_URL) {
  throw new Error("NEXT_PUBLIC_NOTEHUB_API is not defined");
}

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

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

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res: AxiosResponse<Note> = await api.get(`/notes/${id}`);
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
