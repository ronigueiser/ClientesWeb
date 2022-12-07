<script setup>
import {ref} from "vue";
import Modal from "./Modal.vue";

defineEmits(['confirm', 'close'])
// defineProps({
//   open: {
//     type:Boolean,
//     default:false,
//
//   }
// })
const {open, openModal, closeModal} = useModal()
function useModal() {
const open = ref(false)
  function openModal(){
  open.value = true;
  }

  function closeModal(){
  open.value = false
  }
  return {
  open,
    openModal,
    closeModal
  }
}

</script>

<template>

  <form action="#" method="post" @submit.prevent="() => openModal()">

    <button class="btn btn-danger" type="submit">Eliminar</button>
  </form>

  <Modal
  :open="open"
  >
    <p class="mb-3">¿Estás seguro que querés eliminar el curso?</p>
    <div class="d-flex justify-content-end gap-2">


      <button type="button" class="btn btn-secondary" @click="() => {closeModal(); $emit('close')}">Cancelar</button>

      <button type="button" class="btn btn-danger" @click="() => {$emit('confirm'), closeModal();}">Eliminar</button>

    </div>
  </Modal>

</template>

