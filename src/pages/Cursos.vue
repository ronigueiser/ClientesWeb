<script setup>
import {onMounted, ref} from "vue";
import {dateToString} from "../helpers/date";
import {getCursos} from "../services/cursos";
import '../css/cards.css'
import useAuth from "../composition/useAuth";


const {cursos} = useCursos();
const {user} = useAuth()
function useCursos(){
  const cursos = ref([])


  onMounted(async () => {
    cursos.value = await getCursos();
  })

  return {
    cursos
  }
}

</script>


<template>
  <section>
      <h1 class="mb-3">Admin de Cursos</h1>

    <div class="mb-3"><router-link to="/cursos/publicar">Publicar un Curso</router-link></div>

<!--    <div class="row">-->
<!--      <div class="col-6" v-for="entry in cursos">-->
<!--          <div class="card-header">-->
<!--            <h2>{{ entry.title }}</h2>-->
<!--          </div>-->
<!--        <div class="card-body">-->
<!--          <p>{{entry.text}}</p>-->
<!--          <p>$ {{entry.price}}</p>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->

    <div v-for="entry in cursos" class="mb-3">
      <div class="card w-50">
        <div class="card-body">
          <h2 class="card-title"><router-link :to="`/cursos/${entry.id}`">{{ entry.title }}</router-link></h2>
          <p class="card-text">{{entry.desc}}</p>
          <p>$ {{entry.price}}</p>
          <button class="btn btn-primary"><router-link class="ver-mas" :to="`/cursos/${entry.id}`">Ver más</router-link></button>
<!--          <a href="#" class="btn btn-primary">Button</a>-->
          <div
              v-if="entry.user === user.id"
              class="d-flex justify-content-end gap-2"
          >
            <router-link class="btn btn-warning" :to="`/cursos/${entry.id}/editar`">Editar</router-link>
            <form action="#" method="post" @submit.prevent="() => {}">

              <button class="btn btn-danger" type="submit">Eliminar</button>
            </form>
          </div>
        </div>

      </div>
    </div>

  </section>
</template>
-