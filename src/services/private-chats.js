import {
    getFirestore,
    doc, addDoc, collection, serverTimestamp,


} from "firebase/firestore";

const db = getFirestore();

/*
graba un mensaje entre dos usuarios (privado)
 */
export async function sendPrivateMessage({from, to, text}) {

    //TODO Buscar si el chat existe


    const chatRef = await addDoc(collection(db, 'private-chats'), {
        user: {
            [from]: true,
            [to]: true,
        },

    });

    return addDoc(collection(db, 'private-chats', chatRef.id, 'messages'), {
        from,
        text,
        created_at: serverTimestamp(),
    })
}

export async function subscribeToPrivateChat() {

}