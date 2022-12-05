import {db} from "../services/firestore.js";
import {addDoc, collection, onSnapshot, orderBy, query, serverTimestamp} from "firebase/firestore";


/**
 *
 *
 * @param {string} name
 * @param  {string} message
 * @return {Promise<string>}
 */

export function saveChatMessage({userId, name, text}){

    const chatRef = collection(db, 'chat');
    const data = {
        userId,
        name,
        text,
        created_at: serverTimestamp(),
    }

    return addDoc(chatRef, data)
        .then(doc => doc.id);
}

/**
 *
 *
 * @param {function }callback
 * @return {function}
 */

export function suscribeToChatMessages(callback){
    const chatRef = collection(db, 'chat');
    const q = query(chatRef, orderBy('created_at'))
    return onSnapshot(q, snapshot => {
        const docs = snapshot.docs.map(item => {
            return {
                ...item.data(),
                created_at: item.data().created_at?.toDate(),
                id: item.id,
            }
        })
        callback(docs);
    })
}