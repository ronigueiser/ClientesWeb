
<script setup>
import {ref} from "vue";

defineProps({
  open: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <Teleport to="body">
  <div v-if="open" class="modal-backdrop">

    <div class="modal-container">
      <slot />
    </div>
  </div>
  </Teleport>
</template>

