import { collection, doc, setDoc } from "firebase/firestore/lite";
import { firebaseDB } from "../../firebase/config";
import { loadNotes } from "../../jurnal/helpers/loadNotes";
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes, setSaving, updateNotes } from "./journalSlice";

export const startNewNote = () => {
    return async (dispatch, getState) => {
        dispatch(savingNewNote());
        const { uid } = getState().auth;

        const newNote = {
            tittle: '',
            body: '',
            date: new Date().getTime(),
        }

        const newDoc = doc(collection(firebaseDB, `${uid}/journal/notes`));
        await setDoc(newDoc, newNote);
        newNote.id = newDoc.id;

        dispatch(addNewEmptyNote([{ newNote }]));
        dispatch(setActiveNote({ newNote }));
    }
}

export const startoadingNotes = () => {

    return async (dispatch, getState) => {
        const { uid } = getState().auth;

        const docs = await loadNotes(uid);
        dispatch(setNotes(docs));
    }

}

export const startSaveNote = () => {
    return async (dispatch, getState) => {
        dispatch(setSaving());
        
        const { uid } = getState().auth;
        const { active } = getState().journal;
        const noteToFireStore = { ...active };
        delete noteToFireStore.id;
        const docRef = doc(firebaseDB, `${uid}/journal/notes/${active.id}`)
        await setDoc(docRef, noteToFireStore, { merge: true })

        dispatch(updateNotes(active));
    }
}