import {
    addDoc,
    collection, doc, getDoc, getDocs,
    getFirestore, orderBy, query, serverTimestamp, setDoc, updateDoc, deleteDoc
} from "firebase/firestore";

const db = getFirestore();
const cursosRef = collection(db, 'cursos')



/*
 * obtiene los cursos
 */
export async function getCursos() {
    const q = query(cursosRef, orderBy('date','desc'));
    const docsSnap = await getDocs(q)

    return docsSnap.docs.map(item =>{
            return {
                id: item.id,
                ...item.data(),
                date: item.data().date.toDate(),
            }
    })

}

/*
 * obtiene una noticia por id
 */

export async function getCursosEntry(id) {
    const docSnap= await getDoc(doc(db, 'cursos', id))

    if(!docSnap.exists()) throw Error("no existe el documento")

    return {
        id: docSnap.id,
        ...docSnap.data(),
        date: docSnap.data().date.toDate(),
    }
}



/*
 *  Graba un nuevo curso
 */

export async function publishCurso({title, desc, text, price, user}){

    return addDoc(cursosRef, {
        title,
        desc,
        text,
        price,
        user,
        date: serverTimestamp(),
    })

}
/*
 * Edita una noticia por id
 */
export async function editCurso(id, {title, desc, text, price, user}) {
    console.log(id)
    return updateDoc(doc(db, 'cursos', id), {
        title,
        desc,
        text,
        price,
        user,
        updated_at: serverTimestamp(),
    })
}


/*
 * Elimina un curso
 */

export async function deleteCursosEntry(id) {
    return deleteDoc(doc(db,'cursos', id))
}