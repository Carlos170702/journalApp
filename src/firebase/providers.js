import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { firebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(firebaseAuth, googleProvider);
        const { email, displayName, photoURL, uid } = result.user;
        return {
            ok: true,
            email,
            displayName,
            photoURL,
            uid
        }
    } catch (e) {
        const errorMessage = e.message;
        return {
            ok: false,
            errorMessage,
        }
    }
}

export const registerUserWithEmailPassword = async ({ email, password, displayName }) => {
    try {
        const res = await createUserWithEmailAndPassword(firebaseAuth, email, password);
        const { uid, photoURL } = res.user;
        //firebaseAuth.currentUser es para saber que usuario actual que esta logueado por que al momento de registrarse ase el login automaticamente
        await updateProfile(firebaseAuth.currentUser, { displayName });

        return {
            ok: true,
            uid,
            photoURL,
            email,
            displayName,
        }
    } catch (e) {
        const errorCode = e.code;
        const errorMessage = e.message;
        return {
            ok: false,
            errorMessage
        }
    }
}

export const loginUserWithEmailPassword = async ({ email, password }) => {
    try {
        const res = await signInWithEmailAndPassword(firebaseAuth, email, password);
        const { displayName, uid, photoURL } = res.user;

        return {
            ok: true,
            uid,
            email,
            displayName,
            photoURL
        }
    } catch (e) {
        const errorMessage = e.message;
        return {
            ok: false,
            errorMessage
        }
    }
}

export const logoutFirebase = async () => {
    return await firebaseAuth.signOut();
}