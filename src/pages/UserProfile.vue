<script setup>
import {subscribeToAuthChanges, upadteUserProfile} from "../services/auth";
import AlertNotification from "../components/AlertNotification.vue";
import {onMounted, onUnmounted, ref} from "vue";



const user = {}


// export default {
//   name: "Profile",
//   data: () => ({
//     form: {
//       displayName: '',
//     },
//     user: {
//       id: null,
//       email: null,
//       displayName: null,
//     },
//     status: {
//       type: 'info',
//       text:'',
//     },
//     unsubscribeFn: () => {},
//   }),
//   methods: {
//     handleProfileUpdate(){
//       //TODO validacion
//
//       upadteUserProfile({
//         displayName: this.form.displayName,
//       })
//           .then(() => {
//             this.status = {
//               text: 'Se actualizó correctamente la información',
//               type: 'success',
//
//             }
//           })
//           .catch(err => {
//             this.status = {
//               type: 'danger',
//               text: err,
//             };
//           })
//     }
//   },
//   mounted() {
//     this.unsubscribeFn = subscribeToAuthChanges(newUserData => this.user = newUserData)
//     this.form.displayName = this.user.displayName;
//   },
//   unmounted() {
//     this.unsubscribeFn();
//   }
// }
</script>

<template>
    <section>
      <h1 class="mb-3">Email o nombre del usuario</h1>
      <dl class="mb-3">
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
    </section>
</template>


