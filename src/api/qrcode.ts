import http from '/@/utils/request'
import {
  ApiMethodContants,
  ResultData,
  pageQuery,
  updateData,
  createData,
} from '/@/type'

const url = import.meta.env.VITE_BASIC_URL

// 查询列表
export function queryCodeData(params: pageQuery): Promise<ResultData<any>> {
  return http.request({
    url: `${url}/qrcode`,
    method: ApiMethodContants.GET,
    params,
  })
}

// id查询
export function queryDataById(params: {
  id: string
}): Promise<ResultData<any>> {
  return http.request({
    url: `${url}/qrcode/one`,
    method: ApiMethodContants.GET,
    params,
  })
}
// 更新列表
export function updateCodeData(
  id: string,
  data: updateData
): Promise<ResultData<any>> {
  return http.request({
    url: `${url}/qrcode/${id}`,
    method: ApiMethodContants.PATCH,
    data,
  })
}
// 新增数据
export function createCodeData(data: createData): Promise<ResultData<any>> {
  return http.request({
    url: `${url}/qrcode`,
    method: ApiMethodContants.POST,
    data,
  })
}
