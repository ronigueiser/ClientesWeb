import{
    getFirestore,
    setDoc,
    doc,
    getDoc,
    updateDoc,
} from "firebase/firestore";

const db = getFirestore();

/*
 *  crea un nuevo perfil en la base de usuarios
 */
export function createUserProfile(id, {email, displayName= null, photoURL= null, admin = false}) {
    return setDoc(doc(db, 'users', id),{
        email,
        displayName,
        photoURL,
    })
}

/*
 *  actualiza la info de perfil en la base de datos
 */
export function updateUserProfile(id, {displayName= null, photoURL= null}) {
    return updateDoc(doc(db, 'users', id), {
        displayName,
        photoURL,
    })
}

/*
 * Trae la data de un perfil en nuestra base
 */
export async function getUserProfile(id) {
    const userData = await getDoc(doc(db, `users/${id}`));
    //TODO verificar que exista el usuario
    return {
        id,
        ...userData.data(),

    }

}