<script setup>
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {getCursosEntry} from "../services/cursos";
import {useCursosEntry} from "../composition/useCursosEntry";

const {entry} = useCursosEntry();

// function useCursosEntry() {
//   const route = useRoute();
//   const entry = ref({
//     id:'',
//     title:'',
//     desc: '',
//     text:'',
//     price:'',
//     user: '',
//     date: null,
//   })
//
//
//   onMounted(async () => {
//     entry.value = await getCursosEntry(route.params.id)
//   })
//
//   return {
//     entry
//   }
// }

</script>

<template>

  <section>


    <h2>Detalle</h2>

    <div class="mb-3">
      <div class="card w-50">
        <div class="card-body">
          <h2 class="mb-3">{{entry.title}}</h2>
          <p class="card-text">{{entry.desc}}</p>
          <p class="card-text">{{entry.text}}</p>
          <p>$ {{entry.price}}</p>
          <!--          <a href="#" class="btn btn-primary">Button</a>-->
        </div>
      </div>
    </div>

  </section>

</template>


