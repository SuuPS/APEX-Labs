import { createApp } from 'vue'
import 'ant-design-vue/dist/reset.css';
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia';
const pinia = createPinia();
import router from './router/router.ts'

const app = createApp(App)
    .use(router)
    .use(pinia)

app.mount('#app')

