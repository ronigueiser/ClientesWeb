<script setup>
import {ref} from "vue";

defineEmits(['confirm'])
</script>

<template>

  <form action="#" method="post" @submit.prevent="() => $emit('confirm')">

    <button class="btn btn-danger" type="submit">Eliminar</button>
  </form>

</template>

