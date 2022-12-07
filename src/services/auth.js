import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile
} from 'firebase/auth'
import {createUserProfile, updateUserProfile as updateUserProfileInDatabase} from "./user-profiles";
import {doc, getDoc, getFirestore} from "firebase/firestore";

const db = getFirestore();

export const AUTH_ERROR_MESSAGES = {
    'auth/invalid-email': 'El email parece no ser válido',
    'auth/internal-error': 'Parece haber un error tanto en el email como en la contraseña',
    'auth/wrong-password': 'Las credenciales no coinciden con los registros',
    'auth/user-not-found': 'No se encontró un usuario con los datos ingresados',
    'auth/email-already-in-use': 'El mail que usas ya existe en nuestro sistema'
}

const auth = getAuth();

//guardamos los datos del user auth, sino esta auth sera null
let userData = {
    id: null,
    email: null,
    displayName: null,
    admin: false,
}

/*
Recordamos el estado de auth del user
 */

if(localStorage.getItem('user') !== null){
    userData = JSON.parse(localStorage.getItem('user'));
    console.log('UserData: ', userData)
}

async function getData(auth, user){
    let docSnap

    if (auth.currentUser !== null){
        docSnap =  await getDoc(doc(db, 'users', user.uid))
        // console.log("USER ",user.uid)
        console.log("DocSnap ",docSnap.data())

        return docSnap.data().administrador
    }

}


onAuthStateChanged(auth,  async user => {



    console.log("AUTH ",auth.currentUser)

    if (user) {
        // console.log('Datos usuario autenticado: ',user)
        // if(user.email === 'roni@prueba.com'){
        //    admin = true
        // } else {
        //     admin = false
        // }
        // console.log("docsnap ",docSnap.data())
        userData = {
            id: user.uid,
            email: user.email,
            displayName: user.displayName,
            admin: getData(auth,user),

        }
        localStorage.setItem('user', JSON.stringify(userData));

    } else {
        console.log('usuario no autenticado')
        userData = {
            id: null,
            email: null,
            displayName: null,
            admin: null,

        }
        localStorage.removeItem('user');
    }

    console.log("user: (auth.js)", user)
    notifyAll();

})


/*
Login/Logout y registro
 */

export function login({email, password}){
    return signInWithEmailAndPassword(auth, email, password)
        // .then(user => {
        //     console.log("el usuario autenticado es: ", user)
        // })
        // .catch(error =>{
        //     console.error('[auth.login] Error al autenticar: ', error)
        // })
}

/*
cierra la sesión
 */
export function logout(){
    return signOut(auth);
}

/*
* Si todo sale bien, crea un nuevo usuario
 */

export async function register({email, password}){
    const {user} = await createUserWithEmailAndPassword(auth, email, password)

    return createUserProfile(user.uid, {
        email,
    })
}

/*
actualiza la info de perfil del usuario
 */

export async function upadteUserProfile({displayName}){
    const authPromise =  updateProfile(auth.currentUser, {
        displayName,
    });
    const profilePromise = updateUserProfileInDatabase(userData.id, {
        displayName
    })

    await Promise.all([authPromise, profilePromise])

    userData = {
        ...userData,
        displayName,
    }
    notifyAll()

}

/*
Observer para saber el estado de auth
 */
let observers = [];

/*
Registra un callback para notificar cambios de estado de auth
 */
export function subscribeToAuthChanges(callback){
    observers.push(callback);
    notify(callback)

    return () => {
        observers = observers.filter(observerCallback => observerCallback !== callback);
        console.log("observer removido. El stack actual es: ", observers)
    }
}

/*
ejecuta un callback para notifica los cambios de auth
 */
function notify(callback){
    callback({...userData});
}

/*
Ejecuta todos los callbacks
 */
function notifyAll(){
    observers.forEach(callback => notify(callback));
}
