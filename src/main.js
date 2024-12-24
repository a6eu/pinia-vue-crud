import './style.css'
import App from './App.vue'
import { createApp } from 'vue';
import { createPinia } from 'pinia';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
createApp(App).mount('#app')
