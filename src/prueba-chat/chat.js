import {db} from '../services/firestore'
import {collection, addDoc, onSnapshot, serverTimestamp, query, orderBy} from 'firebase/firestore'
import {dateToString} from "../helpers/date";


const chat = {
    element: document.getElementById('messages'),
    form: {
        element: document.getElementById('form-chat'),
        fields: {
            name: document.getElementById('name'),
            text: document.getElementById('text')
        }
    }
}


chat.form.element.addEventListener('submit', async function (e) {
    e.preventDefault()

    const {name, text} = chat.form.fields;
    const data = {
        name: name.value,
        text: text.value,
        created_at: serverTimestamp(),
    }

    const chatRef = collection(db, 'chat');

    //retorna una promise
    const doc = await addDoc(chatRef, data);
    console.log("El documento se creó con éxito: ", doc.id)

});



function subscribeToChatMessages(){
    const chatRef = collection(db, 'chat');

    const q = query(chatRef, orderBy('created_at'))

    return onSnapshot(q, snapshot => {
        let messages = "";

        snapshot.forEach(item => {
            const {name, text, created_at} = item.data()
            messages += `<li><b> (${dateToString(created_at.toDate())}) ${name} dijo</b>: ${text}</li>`
        })

        chat.element.innerHTML = `<ul>${messages}</ul>`

    });

}
subscribeToChatMessages();