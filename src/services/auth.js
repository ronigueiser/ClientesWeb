import {getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile, createUserWithEmailAndPassword} from 'firebase/auth'

export const AUTH_ERROR_MESSAGES = {
    'auth/invalid-email': 'El email parece no ser válido',
    'auth/internal-error': 'Parece haber un error tanto en el email como en la contraseña',
    'auth/wrong-password': 'Las credenciales no coinciden con los registros',
}

const auth = getAuth();

//guardamos los datos del user auth, sino esta aut sera null
let userData = {
    id: null,
    email: null,
    displayName: null,
}

/*
Recordamos el estado de auth del user
 */

if(localStorage.getItem('user') !== null){
    userData = JSON.parse(localStorage.getItem('user'));
}

onAuthStateChanged(auth, user=>{
    if (user) {
        console.log('usuario autenticado')
        userData = {
            id: user.uid,
            email: user.email,
            displayName: user.displayName
        }
        localStorage.setItem('user', JSON.stringify(userData));

    } else {
        console.log('usuario no autenticado')
        userData = {
            id: null,
            email: null,
            displayName: null,
        }
        localStorage.removeItem('user');
    }

    console.log("user: ", user)
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

export function register({email, password}){
    return createUserWithEmailAndPassword(auth, email, password)
}

/*
actualiza la info de perfil del usuario
 */

export function upadteUserProfile({displayName}){
    return updateProfile(auth.currentUser, {
        displayName,
    })
        .then(() => {
            userData = {
                ...userData,
                displayName,
            }
            notifyAll()
        });
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
