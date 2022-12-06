<script setup>
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import UserProfileDetails from "../components/UserProfileDetails.vue";
import {getUserProfile} from "../services/user-profiles.js";
import {useUserProfile} from "../composition/useUserProfile.js";



const {user} = useUserProfile();

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
    <section class="mb-3">
      <h1 class="mb-3">Email o nombre del usuario</h1>
     <UserProfileDetails :user="user"/>
    </section>

  <router-link :to="`/usuario/${user.id}/chat`" class="btn btn-primary">Iniciar chat con {{ user.displayName || user.email }}</router-link>

</template>


