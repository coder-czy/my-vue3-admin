import { AppRouteRecordRaw } from './type'

export const route: AppRouteRecordRaw[] = [
  {
    path: '/',
    name: '首页',
    meta: {},
    component: () => import('/@/views/dashboard/index.vue'),
  },
  {
    path: '/login',
    name: '登录',
    meta: {
      white: true,
    },
    component: () => import('/@/views/login/index.vue'),
  },
  {
    path: '/showPage/:id',
    name: '二维码详情',
    meta: {
      white: true,
    },
    component: () => import('/@/views/showPage/index.vue'),
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
