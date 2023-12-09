import { createApp } from 'vue'
import './style.css'
import 'ant-design-vue/dist/reset.css';
import App from './App.vue'
import { createPinia } from 'pinia';
const pinia = createPinia();

const app = createApp(App)
    .use(pinia)

app.mount('#app')

