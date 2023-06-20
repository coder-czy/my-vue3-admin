export interface userInfo {
  userName: string
  userId?: string | number
}

export interface ListResultData<T> {
  list: Array<T>
  total: number
}

export interface ResultData<T> {
  code: number
  msg: string
  data: T | ListResultData<T>
}

export interface LoginResult {
  accessToken: string
  refreshToken: string
}

export enum ApiMethodContants {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

export interface UserLogin {
  username: string
  password: string
}
