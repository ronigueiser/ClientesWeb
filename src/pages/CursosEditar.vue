<script setup>
import {ref} from "vue";
import useAuth from "../composition/useAuth";
import {publishCurso, editCurso} from "../services/cursos";
import {useCursosEntry} from "../composition/useCursosEntry";

const {fields, handleSubmit} = useCursosEditForm();


function useCursosEditForm() {

  const {user} = useAuth()
  const fields = ref({
    title:'',
    desc: '',
    text:'',
    price:'',

  })


  const {entry} = useCursosEntry({
    onLoad: () => {
      fields.value = {
        title: entry.value.title,
        desc: entry.value.desc,
        text: entry.value.text,
        price: entry.value.price,
      }
    }
  });

  async function handleSubmit(){
    // console.log(entry.value)
      await editCurso(entry.value.id, {
        ...fields.value,
        user: user.value.id,
      })

    fields.value = {
      title:'',
      desc: '',
      text:'',
      price:0,

    }
  }

  return {
    fields,
    handleSubmit
  }
}

</script>


<template>
  <section>
      <h1 class="mb-3">Editar Curso</h1>

    <form action="#" method="post" @submit.prevent="handleSubmit">

      <div class="mb-3">
        <label for="title" class="mb-1">Título</label>
        <input type="text" id="title" class="form-control" v-model="fields.title">
      </div>
      <div class="mb-3">
        <label for="text" class="mb-1">Descripción</label>
        <textarea type="text" id="text" class="form-control" v-model="fields.desc"></textarea>
      </div>
      <div class="mb-3">
        <label for="info" class="mb-1">Información del curso</label>
        <textarea type="text" id="info" class="form-control" v-model="fields.text"></textarea>
      </div>
      <div class="mb-3">
        <label for="price" class="mb-1">Precio</label>
        <input type="number" id="price" class="form-control" v-model="fields.price">
      </div>

      <button type="submit" class="btn btn-primary w-100">Editar</button>
    </form>
  </section>
</template>
