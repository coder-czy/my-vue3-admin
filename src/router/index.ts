import { createRouter, createWebHashHistory } from 'vue-router'
import { route } from './basic'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: route,
  strict: true,
})

// 路由守卫
router.beforeEach((to, form, next) => {
  if (!loggedIn()) {
    next('/login')
  } else {
    next()
  }
})

function loggedIn() {
  // 判断用户是否已登录
  return true
}
