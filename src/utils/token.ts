import pinia from '/@/store'

import { userStore } from '/@/store/user'
import { getToken, getRefreshToken } from '/@/utils/storage'

let user_store = userStore(pinia)
const accessToken = getToken()
const refreshToken = getRefreshToken()

if (accessToken && refreshToken) {
  user_store.setUserInfo({ accessToken, refreshToken })
}
