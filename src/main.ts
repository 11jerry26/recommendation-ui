import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'vant/es/toast/style'
import '@/utils/rem'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';


const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate);
app.use(ElementPlus)
app.use(pinia)
app.use(router)
app.mount('#app')
