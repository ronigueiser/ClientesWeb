<script setup>
import {subscribeToAuthChanges, upadteUserProfile} from "../services/auth";
import AlertNotification from "../components/AlertNotification.vue";
import {onMounted, onUnmounted, ref} from "vue";
import UserProfileDetails from "../components/UserProfileDetails.vue";

const {form, status, handleProfileUpdate} = useProfileForm();
const {user} = useAuth();


function useProfileForm () {
  const form = ref({displayName: ''});
  const status = ref({
    type: 'info',
    text: '',
  });
  function handleProfileUpdate(){
      //TODO validacion

      upadteUserProfile({
        displayName: form.value.displayName,
      })
          .then(() => {
            status.value= {
              text: 'Se actualizó correctamente la información',
              type: 'success',

            }
          })
          .catch(err => {
            status.value= {
              type: 'danger',
              text: err,
            };
          })
    }

    return {
      form,
      status,
      handleProfileUpdate,
    }
}

function useAuth(){
  const user = ref({
      id: null,
      email: null,
      displayName: null,
  });

  let unsubscribe;

  onMounted(() => {
    unsubscribe = subscribeToAuthChanges(newUserData => user.value = newUserData);

  });

  onUnmounted(() => {
    unsubscribe()
  })
  return{
    user,
  }
}

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
      <h1 class="mb-3">Perfil</h1>

      <AlertNotification
          v-if="status.text !== ''" :type="status.type">
        {{ status.text }}
      </AlertNotification>

<!--      <dl class="mb-3">-->
<!--        <dt>Email</dt>-->
<!--        <dd>{{ user.email }}</dd>-->
<!--        <dt>Nombre de usuario</dt>-->
<!--        <dd>-->
<!--          <template v-if="user.displayName">-->
<!--            {{ user.displayName }}-->
<!--          </template>-->

<!--          <template v-else>-->
<!--            <span class="fst-italic">No contiene nombre de usuario</span>-->
<!--          </template>-->
<!--        </dd>-->
<!--      </dl>-->

      <UserProfileDetails :user="user" />

      <hr>

      <section>
        <h2 class="mb-3">Actualizar información</h2>

        <form action="#" method="post" @submit.prevent="handleProfileUpdate">
          <div class="mb-3">
            <label for="displayName" class="form-label">Nombre de ususario </label>
            <input type="text" id="displayName" class="form-control" v-model="form.displayName">
          </div>
          <button type="submit" class="btn btn-primary">Actualizar</button>
        </form>
      </section>
    </section>
</template>


