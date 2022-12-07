import {createRouter, createWebHashHistory} from "vue-router";
import Home from '../pages/Home.vue';
import Register from '../pages/Register.vue';
import Chat from '../pages/Chat.vue';
import Login from '../pages/Login.vue';
import {subscribeToAuthChanges} from "../services/auth";
import MyProfile from "../pages/MyProfile.vue";
import UserProfile from "../pages/UserProfile.vue";
import PrivateChat from "../pages/PrivateChat.vue";
import Panel from "../pages/Panel.vue";
import Cursos from "../pages/Cursos.vue";
import CursosPublicar from "../pages/CursosPublicar.vue";
import cursosView from "../pages/cursosView.vue";
import cursosEditar from "../pages/cursosEditar.vue";

const routes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/iniciar-sesion',
        component: Login,
    },
    {
        path: '/registro',
        component: Register,
    },
    {
        path: '/chat',
        component: Chat,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/perfil',
        component: MyProfile,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/panel',
        component: Panel,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/cursos',
        component: Cursos,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/cursos/publicar',
        component: CursosPublicar,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/cursos/:id',
        component: cursosView,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/cursos/:id/editar',
        component: cursosEditar,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/usuario/:id',
        component: UserProfile,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/usuario/:id/chat',
        component: PrivateChat,
        meta: {
            requiresAuth: true,
        },
    },
]

const router = createRouter({
    routes,
    history: createWebHashHistory(),
})



let userData;

subscribeToAuthChanges(newUser => userData = newUser);

router.beforeEach((to,from) => {
    if(to.meta.requiresAuth && userData.id === null) {
        return {
            path: '/iniciar-sesion',
        }
    }
})

export default router;