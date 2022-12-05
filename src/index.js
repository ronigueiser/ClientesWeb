import 'bootstrap/dist/css/bootstrap.min.css';
import './css/app.css';
import './services/firebase';
import './services/firestore';
// import './prueba-chat/chat';

import {createApp} from "vue";
import App from "./App.vue";
import router from "./router/router.js";

const app = createApp(App)

app.use(router)

app.mount('#app')