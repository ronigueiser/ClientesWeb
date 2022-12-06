import {
    getFirestore, addDoc,
    collection, serverTimestamp,
    query, where, limit, getDocs, orderBy, onSnapshot,


} from "firebase/firestore";

const db = getFirestore();

/*
 * Obtiene la referencia al documento del chat
 */

async function getPrivateChatRef({from,to}){

    const queryChat = query(
        collection(db, 'private-chats'),
        where('user', '==', {
            [from]: true,
            [to]: true,
        }),
        limit(1),
    )

    const querySnap = await getDocs(queryChat);


    if (querySnap.empty) {
        return await addDoc(collection(db, 'private-chats'), {
            user: {
                [from]: true,
                [to]: true,
            },

        });
    } else {
        return querySnap.docs[0];
    }

}

/*
graba un mensaje entre dos usuarios (privado)
 */
export async function sendPrivateMessage({from, to, text}) {

    const chatRef = await getPrivateChatRef({from, to})

    return addDoc(collection(db, 'private-chats', chatRef.id, 'messages'), {
        from,
        text,
        created_at: serverTimestamp(),
    })
}

export async function subscribeToPrivateChat({from, to}, callback) {

    const chatRef = await getPrivateChatRef({from,to});

    const queryRef = query(
        collection(db,'private-chats', chatRef.id,'messages'),
        orderBy('created_at'),
    )

    return onSnapshot(queryRef, snapshot => {
        const data = snapshot.docs.map(item => {
            return {
                from: item.data().from,
                text: item.data().text,
                created_at: item.data().created_at?.toDate(),
            }
        })
        callback(data)
    })

}