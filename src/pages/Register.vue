<script>
import {AUTH_ERROR_MESSAGES, register} from "../services/auth";
import AlertNotification from "../components/AlertNotification.vue";
export default {
  name: "Register",
  data: () => ({
    form: {
      email: '',
      password: '',
    },
    status: {
      text: '',
      type: 'success',
    }
  }),
  methods: {
    handleRegister(){
      //TODO validar

      register({...this.form})
          .then(() => {
            this.status = {
              text: 'la cuenta se creo correctamente',
              type: 'success'
            }
            this.$router.push('/perfil');
          })
          .catch(err => {
            this.status = {
              type: 'danger',
              text: AUTH_ERROR_MESSAGES[err.code] || err.code,
            }
          })
    }
  }
}
</script>

<template>
    <section>
      <h1 class="mb-3">Crear una cuenta</h1>

      <AlertNotification
          v-if="status.text !== ''" :type="status.type">
        {{ status.text }}
      </AlertNotification>

      <form action="#" method="post" @submit.prevent="handleRegister">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input type="email" name="email" id="email" class="form-control" v-model="form.email">
        </div>

        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" name="password" id="password" class="form-control" v-model="form.password">
        </div>
        <button type="submit" class="btn btn-primary w-100">Crear</button>
      </form>
    </section>
</template>


