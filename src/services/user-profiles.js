import{
    getFirestore,
    setDoc,
    doc,
    updateDoc,
} from "firebase/firestore";

const db = getFirestore();

/*
 *  crea un nuevo perfil en la base de usuarios
 */
export function createUserProfile(id, {email, displayName= null, photoURL= null}){
    return setDoc(doc(db, 'users', id),{
        email,
        displayName,
        photoURL,
    })
}

/*
 *  actualiza la info de perfil en la base de datos
 */
export function updateUserProfile(id, {displayName= null, photoURL= null}){
    return updateDoc(doc(db, 'users', id), {
        displayName,
        photoURL,
    })
}