import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { firebaseDB } from "../../firebase/config";
import { fileUpload } from "../../jurnal/helpers/fileUpload";
import { loadNotes } from "../../jurnal/helpers/loadNotes";
import {
  addNewEmptyNote,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNotes,
} from "./journalSlice";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(savingNewNote());
    const { uid } = getState().auth;

    const newNote = {
      tittle: "",
      body: "",
      date: new Date().getTime(),
      imageUrls: [],
    };

    const newDoc = doc(collection(firebaseDB, `${uid}/journal/notes`));
    await setDoc(newDoc, newNote);
    newNote.id = newDoc.id;

    dispatch(addNewEmptyNote([ newNote ]));
    dispatch(setActiveNote( newNote ));
  };
};

export const startoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const docs = await loadNotes(uid);
    dispatch(setNotes(docs));
  };
};

export const startSaveNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());

    const { uid } = getState().auth;
    const { active } = getState().journal;
    const noteToFireStore = { ...active };
    delete noteToFireStore.id;
    const docRef = doc(firebaseDB, `${uid}/journal/notes/${active.id}`);
    await setDoc(docRef, noteToFireStore, { merge: true });

    dispatch(updateNotes(active));
  };
};

export const startUploadingFiles = (files = []) => {
  return async (dispatch, getState) => {
    dispatch(setSaving());

    // ejecuta por cada file enviado una in serccion que despues se haran las peticiones xd
    const fileUploadPromises = [];
    for (const file of files) {
      fileUploadPromises.push(fileUpload(file));
    }

    // resuelve todas las peticiones asincronas que retorna todos los resultados de cada inserccion enviada
    const photosUrl = await Promise.all(fileUploadPromises);
    dispatch(setPhotosToActiveNote(photosUrl));
  };
};

export const startDeletingNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    const docRef = doc(firebaseDB, `${uid}/journal/notes/${note.id}`);
    await deleteDoc(docRef);

    dispatch(deleteNoteById(note.id));
  };
};
