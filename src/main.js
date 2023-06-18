import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import HighchartsVue from 'highcharts-vue'
import router from './router'
import './assets/css/tailwind.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(HighchartsVue)

app.use(router).mount('#app')
