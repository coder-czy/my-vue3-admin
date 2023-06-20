import { defineStore } from 'pinia'
import { LoginResult } from '/@/type'

export const userStore = defineStore('user', {
  state: () => {
    return {
      accessToken: '',
      refreshToken: '',
    }
  },
  getters: {},
  actions: {
    setUserInfo(token: LoginResult) {
      this.accessToken = token.accessToken
      this.refreshToken = token.refreshToken
    },
  },
})
