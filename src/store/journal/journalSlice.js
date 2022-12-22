import { createSlice } from '@reduxjs/toolkit';
export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null,
    },
    reducers: {
        savingNewNote: (state) => {
            state.isSaving = true;
        },
        addNewEmptyNote: (state, { payload }) => {
            state.notes = payload;
            state.isSaving = false;
        },
        setActiveNote: (state, { payload }) => {
            state.active = payload;
            state.messageSaved = '';
        },
        setNotes: (state, { payload }) => {
            state.notes = payload;
        },
        setSaving: (state) => {
            state.isSaving = true;
            state.messageSaved = '';
        },
        updateNotes: (state, { payload }) => {
            state.isSaving = false;

            state.notes = state.notes.map(note => {
                if (note.id === payload.id) {
                    return payload;
                }
                return note;
            });

            state.messageSaved = `${payload.tittle} actualizado correctamente`;

        },
        deleteNoteById: (state, action) => {

        }
    }
});

export const {
    addNewEmptyNote,
    deleteNoteById,
    savingNewNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNotes,
} = journalSlice.actions;