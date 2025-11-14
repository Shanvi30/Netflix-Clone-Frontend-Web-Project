import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore} from "firebase/firestore";
import {toast} from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAH369uV4LtcT9zalguj3cK8Cn_bU5eduA",
  authDomain: "netflix-clone-8d707.firebaseapp.com",
  projectId: "netflix-clone-8d707",
  storageBucket: "netflix-clone-8d707.firebasestorage.app",
  messagingSenderId: "852281294930",
  appId: "1:852281294930:web:d77c3ae3e821bdb1425f8b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password) => {
    try {
       await signInWithEmailAndPassword(auth, email, password); 
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));

    }
}

const logout = () => {
    signOut(auth);
}

export {auth, db, login, signup, logout};