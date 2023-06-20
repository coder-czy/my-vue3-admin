import { createRouter, createWebHashHistory } from 'vue-router'

import { route } from './basic'
// import { getToken } from '/@/utils/storage'
import { userStore } from '/@/store/user'
import pinia from '/@/store'
import { login } from '../api/user'

// const whiteRouter = ['/login']

export const router = createRouter({
  history: createWebHashHistory(),
  routes: route,
  strict: true,
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const user_store = userStore(pinia)

  const hasToken = user_store.accessToken

  if (!hasToken && !to.meta?.white) {
    next('/login')
  } else {
    next()
  }
})
