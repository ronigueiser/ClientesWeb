

<script>
import {logout, subscribeToAuthChanges} from "./services/auth.js";
import './css/app.css'
import useAuth from "./composition/useAuth";
const {user} = useAuth()

export default {
  name: "App",
  data: () => ({
    user: {
      id: null,
      email: null,
      displayName: null
    }
  }),
  methods: {
    handleLogout() {
      logout();
      this.$router.push('/iniciar-sesion');
    }
  },
  mounted() {
    subscribeToAuthChanges(newUserData => this.user = newUserData);
  }
}
</script>


<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand nav-name" href="#">Cruz Roja</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">

          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/chat">Chat</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/cursos">Cursos</router-link>
          </li>
          <template  v-if="user.admin === true">
            <li class="nav-item">
              <router-link class="nav-link" to="/panel">Panel</router-link>
            </li>
          </template>

          <template v-if="user.id === null">
            <li class="nav-item">
              <router-link class="nav-link" to="/iniciar-sesion">Iniciar Sesión</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/registro">Crear Cuenta</router-link>
            </li>
          </template>

          <template v-else>
          <li class="nav-item">
            <router-link class="nav-link" to="/perfil">Mi Perfil</router-link>
          </li>
          <li class="nav-item">
            <form action="#" method="post" @submit.prevent="handleLogout">
              <button class="btn nav-link" >Cerrar Sesión ({{ user.email }})</button>
            </form>
          </li>
          </template>

        </ul>
      </div>
    </div>
  </nav>
  <main class="container py-3">

    <router-view />
<!--    aca van las vistas-->
  </main>
  <footer class="footer">
    <p class="mb-0">Roni Gueiser</p>
  </footer>
</template>


