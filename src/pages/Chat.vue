<script>
import {saveChatMessage, suscribeToChatMessages} from "../chat/chat";
import {dateToString} from "../helpers/date";
import Loader from "../components/Loader.vue";
import {subscribeToAuthChanges} from "../services/auth";
// import {onMounted, onUnmounted, ref} from "vue";
//
//
// const {messages, messagesLoaded} = useChat()
// const {newMesage, save} = useChatForm()
// const {user} = useAuth()
//
//
// function useChat(){
//   const messages = ref([]);
//   const messagesLoaded = ref(false);
//
//   let unsubscribe
//
//   onMounted(() =>{
//     unsubscribe = suscribeToChatMessages(newMessages => {
//       messages.value = newMessages;
//       messagesLoaded.value = true;
//     });
//   })
//
//   onUnmounted(()=> {
//     unsubscribe()
//   });
//
//   return{
//     messages,
//     messagesLoaded,
//   }
// }
//
// function useChatForm(){
//
//   const newMessage = ref({
//     text: '',
//   });
//
//   function save() {
//     saveChatMessage({
//       ...newMessage.value,
//       name: user.value.displayName || user.value.email,
//     })
//     newMessage.value.text = "";
//   }
//   return {
//     newMessage,
//     save
//   }
// }
//
//
// function useAuth() {
//
//   const user = ref ({
//     id: null,
//     email: null,
//     displayName: null,
//   });
//
//   let unsubscribe;
//
//
//
//   onMounted(() => {
//     unsubscribe = subscribeToAuthChanges(newUserData => user.value = newUserData);
//   });
//
//   onUnmounted(() => {
//     unsubscribe();
//   })
//
//   return {
//     user,
//   }
// }



export default {
  name: "Chat",
  components: {Loader},
  data: () => ({
    messages: [],
    newMessage: {
      text: '',
    },
    user: {
      id: null,
      email: null,
      displayName: null,
    },
    messageLoaded: false,
    unsubscribeFunction: () => {},
    unsubscribeAuthFunction: () => {},
  }),
  methods: {
    dateToString,
    save(){
      //TODO: validacion
      saveChatMessage({
        ...this.newMessage,
        name: this.user.displayName || this.user.email,
        userId: this.user.id,
      });
          this.newMessage.text = "";
    }
  },
  mounted() {
    this.unsubscribeFunction = suscribeToChatMessages(newMessages =>{
      // console.log("Mensajes: ", newMessages)
      this.messages = newMessages;
      this.messageLoaded = true;
    })
    this.unsubscribeAuthFunction = subscribeToAuthChanges(newUserData => this.user = newUserData)
  },
  unmounted() {
    this.unsubscribeFunction();
    this.unsubscribeAuthFunction();
  }
}
</script>

<template>
    <section>
      <h1 class="mb-3">Chat</h1>

      <main class="container py-3">
      <h1>Dv Chat</h1>

      <div class="row">
        <div class="col-8">
          <h2>Sala de Chat</h2>
          <div id="messages">
            <ul v-if="messageLoaded">
              <li v-for="message in messages" :key="message.id">
                <b>
                  ({{ dateToString(message.created_at) }})
                  <router-link
                      v-if="message.userId !== user.id"
                      :to="`/usuario/${message.userId}`"
                  >{{ message.name }}</router-link>
                  <template
                      v-else
                  >{{ message.name }}</template>
                  dijo
                </b>: {{ message.text }}
              </li>
            </ul>
            <Loader v-else/>
          </div>
        </div>

        <div class="col-4">
          <h2>Enviá un mensaje</h2>

          <form action="#"
                method="post"
                id="form-chat"
                @submit.prevent="save"
          >

            <div class="mb-3">
              <span class="form-label">Nombre</span>
              <div>{{ this.user.displayName || this.user.email }}</div>
            </div>
            <div class="mb-3">
              <label for="text" class="form-label">Mensaje</label>
              <textarea id="text" class="form-control" v-model="newMessage.text"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Enviar</button>

          </form>

        </div>

      </div>

      </main>
    </section>
</template>


