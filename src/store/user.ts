import { defineStore } from 'pinia'
import { userInfo } from '/@/type'

export const userStore = defineStore('user', {
  state: () => {
    return {
      userName: '',
    }
  },
  getters: {},
  actions: {
    setUserInfo(userInfo: userInfo) {
      this.userName = userInfo.userName
    },
  },
})
