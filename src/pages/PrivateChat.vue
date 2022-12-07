<script setup>

import {onMounted, onUnmounted, ref} from 'vue';
import useAuth from "../composition/useAuth.js";
import {useUserProfile} from "../composition/useUserProfile.js";
import {sendPrivateMessage, subscribeToPrivateChat} from "../services/private-chats.js";
import {useRoute} from "vue-router";
import ChatMessageUser from "../components/ChatMessageUser.vue";
import {dateToString} from "../helpers/date";
import '../css/chat.css'


const {
  user,
  chattingUser,
  message: formMessage,
  handleSumbit
} = usePrivateChatForm();

const {messages} = usePrivateChat();

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

function usePrivateChat() {
  const messages = ref([]);
  const {user} = useAuth();
  const route = useRoute();
  let unsubscribe;

  onMounted(async () => {
    unsubscribe = await subscribeToPrivateChat({
      from: user.value.id,
      to: route.params.id,
    }, newMessages => messages.value = newMessages)
  })

  onUnmounted(()=> {
    if(typeof unsubscribe !== 'function') return;
    unsubscribe();
  })

  return {
    messages
  }

}
</script>

<template>

  <section>
    <h1 class="mb-3">Chat privado con {{ chattingUser.displayName || chattingUser.email }}</h1>

    <h2 class="visually-hidden">Mensajes</h2>

    <div class="chat mb-3 chat-privado">
      <ul>
        <li
          v-for="message in messages"
          :key="message.created_at"
        >
         <b>
           ({{ dateToString(message.created_at) }})

           {{
             message.from === user.id ?
                 user.displayName || user.email :
                 chattingUser.displayName || chattingUser.email
           }}

           Dijo
         </b>:
          <div>{{ message.text }}</div>
        </li>
      </ul>
    </div>

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
          v-model="formMessage"
      ></textarea>

      <button type="submit" class="btn btn-primary">Enviar</button>
    </form>
  </section>
</template>
