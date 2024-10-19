/* eslint-disable vue/multi-word-component-names */
/* eslint-disable no-unused-vars */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue3-loading-overlay'
import { currency } from './methods/filter'
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css'

const app = createApp(App)
app.config.globalProperties.$filters = {
  currency
}
app.component('Loading', Loading)
app.use(VueAxios, axios)

app.use(router).mount('#app')
