import { createApp } from 'vue'
// import { createPinia } from 'pinia'
// const pinia = createPinia()
// import './styles/element/index.scss'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import App from './App.vue'
import { router } from '/@/router'
import pinia from '/@/store'

import './style.css'
import '/@/utils/token'

createApp(App)
  .use(pinia)
  .use(router)
  .use(ElementPlus, {
    locale: zhCn,
  })
  .mount('#app')
