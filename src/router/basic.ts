import { AppRouteRecordRaw } from './type'

export const route: AppRouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: '首页',
    meta: {},
    component: () => import('/@/views/dashboard/index.vue'),
  },
  {
    path: '/login',
    name: '登录',
    meta: {},
    component: () => import('/@/views/login/index.vue'),
  },
  {
    path: '/404',
    name: '404',
    meta: {},
    component: () => import('/@/views/404/index.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    meta: {},
    redirect: '/404',
  },
]
