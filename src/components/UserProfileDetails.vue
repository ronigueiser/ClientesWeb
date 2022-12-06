
<script setup>
defineProps({
  user: {
    type: Object,
  }
})

import '../css/perfil.css'

</script>
<template>
  <dl class="mb-3 info-perfil">
    <dt>Email</dt>
    <dd>{{ user.email }}</dd>
    <dt>Nombre de usuario</dt>
    <dd>
      <template v-if="user.displayName">
        {{ user.displayName }}
      </template>

      <template v-else>
        <span class="fst-italic">No contiene nombre de usuario</span>
      </template>
    </dd>
  </dl>
</template>


<style scoped>

</style>