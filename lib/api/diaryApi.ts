import { nextServerApi } from "./api";

interface FetchNotesParams {
  page?: number;
  limit?: number;
}

interface Emotion {
  _id: string;
  title: string;
}

export interface DiaryNote {
  _id: string;
  title: string;
  date: string;
  emotions: Emotion[];
  description: string;
}

export interface FetchNotesResponse {
  diaryNotes: DiaryNote[];
  totalCount: number;
  totalPages: number;
  page: number;
}

interface NoteDiaryProps {
  title: string;
  description: string;
  emotions: string[];
}

export const fetchNotes = async (
  params: FetchNotesParams
): Promise<FetchNotesResponse> => {
  const response = await nextServerApi.get<FetchNotesResponse>(`/diary`, {
    params,
  });
  return response.data;
};

export const createNote = async (note: NoteDiaryProps): Promise<DiaryNote> => {
  const { title, description, emotions } = note;
  const response = await nextServerApi.post<DiaryNote>("/diary", {
    title,
    description,
    emotions,
  });
  return response.data;
};

export const updateNote = async (note: DiaryNote): Promise<DiaryNote> => {
  const { _id, title, description, emotions } = note;
  const response = await nextServerApi.post<DiaryNote>(`/diary/${_id}`, {
    title,
    description,
    emotions,
  });
  return response.data;
};

export const deleteNote = async (id: string): Promise<void> => {
  const response = await nextServerApi.delete(`/notes/${id}`, {
    params: { noteId: id },
  });
  return response.data;
};
