<script setup>

import {ref} from 'vue';
import useAuth from "../composition/useAuth.js";
import {useUserProfile} from "../composition/useUserProfile.js";
import {sendPrivateMessage} from "../services/private-chats.js";

const {
  user,
  chattingUser,
  message,
  handleSumbit
} = usePrivateChatForm();

function usePrivateChatForm() {
  const {user} = useAuth();
  const {user: chattingUser} = useUserProfile()
  const message = ref('')

  function handleSumbit() {
    sendPrivateMessage({
      from: user.value.id,
      to: chattingUser.value.id,
      text: message.value,
    })
    message.value = '';
  }

  return {
    user,
    chattingUser,
    message,
    handleSumbit
  }

}
</script>

<template>

  <section>
    <h1 class="mb-3">Chat privado con {{ chattingUser.displayName || chattingUser.email }}</h1>

    <h2 class="visually-hidden">Mensajes</h2>

    <div class="chat mb-3"></div>

    <h2 class="visually-hidden">Enviar mensaje</h2>

    <form
      action="#"
      method="post"
      @submit.prevent="handleSumbit"
    >
      <label class="visually-hidden" for="message">Mensaje</label>
      <textarea
          id="message"
          class="form-control mb-3"
          v-model="message"
      ></textarea>

      <button type="submit" class="btn btn-primary">Enviar</button>
    </form>
  </section>
</template>
