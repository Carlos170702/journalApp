import { createSlice } from "@reduxjs/toolkit";
export const journalSlice = createSlice({
  name: "journal",
  initialState: {
    isSaving: false,
    messageSaved: "",
    notes: [],
    active: null,
  },
  reducers: {
    savingNewNote: (state) => {
      state.isSaving = true;
    },
    addNewEmptyNote: (state, { payload }) => {
      state.notes = [...state.notes, ...payload];
      state.isSaving = false;
    },
    setActiveNote: (state, { payload }) => {
      state.active = payload;
      state.messageSaved = "";
    },
    setNotes: (state, { payload }) => {
      state.notes = payload;
    },
    setSaving: (state) => {
      state.isSaving = true;
      state.messageSaved = "";
    },
    updateNotes: (state, { payload }) => {
      state.isSaving = false;

      state.notes = state.notes.map((note) => {
        if (note.id === payload.id) {
          return payload;
        }
        return note;
      });

      state.messageSaved = `${payload.tittle} actualizado correctamente`;
    },
    setPhotosToActiveNote: (state, { payload }) => {
      state.active.imageUrls = [...state.active.imageUrls, ...payload];
      state.isSaving = false;
    },
    clearNotesLogout: (state) => {
      state.notes = [];
      (state.active = null), (state.messageSaved = "");
      state.isSaving = false;
    },
    deleteNoteById: (state, { payload }) => {
      state.active = null;
      state.notes = state.notes.filter((note) => note.id !== payload);
    },
  },
});

export const {
  addNewEmptyNote,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNotes,
  clearNotesLogout,
  setPhotosToActiveNote,
} = journalSlice.actions;
