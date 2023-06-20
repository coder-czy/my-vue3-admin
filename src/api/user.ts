import {
  ResultData,
  LoginResult,
  ApiMethodContants,
  UserLogin,
} from '../type/user.type'
import http from '/@/utils/request'
import { getRefreshToken } from '/@/utils/storage'

const url = import.meta.env.VITE_BASIC_URL

// 刷新token
export function updateToken(): Promise<ResultData<LoginResult>> {
  return http.request({
    url: `${url}/update/token`,
    method: ApiMethodContants.POST,
    headers: { Authorization: 'Bearer ' + getRefreshToken() },
  })
}

export function login(data: UserLogin): Promise<ResultData<LoginResult>> {
  return http.request({
    url: `${url}/login`,
    method: ApiMethodContants.POST,
    data,
  })
}
