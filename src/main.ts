import { createApp } from 'vue'
// import './styles/element/index.scss'
import ElementPlus from 'element-plus'
import App from './App.vue'
import { router } from '/@/router'
import './style.css'
import { createPinia } from 'pinia'

createApp(App).use(router).use(createPinia()).use(ElementPlus).mount('#app')
