import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/utils/rem'


const app = createApp(App)
const pinia = createPinia()
app.use(ElementPlus)
app.use(pinia)
app.use(router)
app.mount('#app')
