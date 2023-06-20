export interface pageQuery {
  pageSize?: number
  pageIndex?: number
  code?: string
  areaCode?: string
  customer?: string
  id?: string
}

export interface updateData {
  code?: string
  areaCode?: string
  customer?: string
  delFlag?: 0 | 1
}

export interface createData {
  number: number
}

export interface tableType {
  id: string
  code?: string
  areaCode?: string
  customer?: string
  status?: 0 | 1 | string
  delFlag?: 0 | 1
  updateDate?: string
  createDate?: string
}

export interface queryData {
  id?: string
  code?: string
  areaCode?: string
  customer?: string
  status?: 0 | 1
  pageIndex: number
  pageSize: number
}
