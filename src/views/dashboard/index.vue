<template>
  <div class="home">
    <el-container>
      <el-header
        class="flex justify-between shadow-md fixed w-full z-20 bg-white"
      >
        <img :src="img" class="h-full" alt="" />
        <div
          class="h-full w-32 text-center bg-gradient-to-r from-blue-400 to-purple-500 text-white flex items-center justify-center text-lg cursor-pointer"
          @click="logout"
        >
          退出登录*
        </div>
      </el-header>
      <el-main class="mt-16 mb-0 pb-0" v-loading="loading">
        <div class="flex justify-between items-center pb-2">
          <div class="flex">
            <el-input
              class="mr-2"
              placeholder="请输入ID"
              v-model="params.id"
              @keyup.enter="searchHandle"
            ></el-input>
            <el-input
              class="mr-2"
              placeholder="请输入国际区号"
              v-model="params.areaCode"
              @keyup.enter="searchHandle"
            ></el-input>
            <el-input
              class="mr-2"
              placeholder="请输入编码"
              v-model="params.code"
              @keyup.enter="searchHandle"
            ></el-input>
            <el-input
              class="mr-2"
              placeholder="请输入客户名称"
              v-model="params.customer"
              @keyup.enter="searchHandle"
            ></el-input>
            <el-button type="primary" @click="searchHandle">搜索</el-button>
          </div>
          <div class="flex justify-center items-center">
            <el-input-number v-model="num" :min="1" :max="1000" />

            <el-button
              class="ml-2"
              :loading="createLoading"
              type="primary"
              @click="createData"
              >新增{{ num }}条</el-button
            >
          </div>
        </div>
        <el-table stripe :data="data.tableData" height="calc(100vh - 182px)">
          <el-table-column prop="id" label="ID" width="80px" />
          <el-table-column prop="areaCode" label="国际区号" width="100" />
          <el-table-column prop="code" label="编码" />
          <el-table-column prop="customer" label="客户名称" />
          <el-table-column prop="status" label="编辑状态" />
          <el-table-column prop="createDate" label="创建时间" />
          <el-table-column prop="updateDate" label="更新时间" />
          <el-table-column fixed="right" label="操作">
            <template #default="scope">
              <el-button
                link
                type="primary"
                @click="editHandle(scope?.row)"
                size="small"
                >编辑</el-button
              >
              <el-button
                link
                type="primary"
                @click="delHandle(scope?.row)"
                size="small"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div class="flex justify-between pt-4">
          <el-button type="primary" @click="exportAllExcel"
            >导出Excel</el-button
          >
          <el-pagination
            v-model:current-page="params.pageIndex"
            v-model:page-size="params.pageSize"
            :page-sizes="[10, 20, 50, 100]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-main>
    </el-container>

    <!-- 编辑 -->
    <el-dialog v-model="dialogFormVisible" title="编辑">
      <div class="pr-6">
        <el-form :model="data.form">
          <el-form-item label="ID" label-width="100px">
            {{ data.form.id }}
          </el-form-item>
          <el-form-item label="国际区号" label-width="100px">
            <el-input v-model="data.form.areaCode" autocomplete="off" />
          </el-form-item>
          <el-form-item label="编码" label-width="100px">
            <el-input v-model="data.form.code" autocomplete="off" />
          </el-form-item>
          <el-form-item label="客户名称" label-width="100px">
            <el-input v-model="data.form.customer" autocomplete="off" />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="submitEdit"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

import img from '/@/assets/img/logo.png'
import { clearAll } from '/@/utils/storage'
import { createCodeData, updateCodeData, queryCodeData } from '/@/api/qrcode'
import { tableType, queryData } from '/@/type'
import { formatTime } from '/@/utils/common'
import * as XLSX from 'xlsx/xlsx.mjs'
import { userStore } from "/@/store/user";

const data = reactive<{ tableData: tableType[]; form: tableType }>({
  tableData: [],
  form: {
    id: '',
    areaCode: '',
    code: '',
    customer: '',
    createDate: '',
  },
})

// 编辑数据

const editHandle = (row: tableType) => {
  data.form = JSON.parse(JSON.stringify(row))
  dialogFormVisible.value = true
}
const submitEdit = () => {
  updateCodeData(data?.form?.id, data.form).then(() => {
    ElMessage({ message: '更新成功', type: 'success' })
    dialogFormVisible.value = false
    params.id = ''
    queryInitData(params)
  })
}

const delHandle = (row: tableType) => {
  ElMessageBox.confirm('是否确认删除该信息', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'error',
  }).then(() => {
    updateCodeData(row.id, { delFlag: 1 }).then(() => {
      ElMessage({ message: '删除成功', type: 'success' })
      queryInitData(params)
    })
  })
}

// 分页查询
const loading = ref(false)
const total = ref(0)
const params = reactive<queryData>({
  pageIndex: 1,
  pageSize: 20,
  id: '',
  areaCode: '',
  customer: '',
  code: '',
})
// 查询数据
const queryInitData = (params:queryData) => {
  queryCodeData(params).then((res) => {
    loading.value = true
    // 查Id
    if (params.id) {
      
      if (res?.data) {
        let result = JSON.parse(JSON.stringify(res.data))
        result.createDate = formatTime(result.createDate)
        result.updateDate = formatTime(result.updateDate)
        result.status = result.status === 0 ? '未编辑' : '已编辑'
        data.tableData = [result]
        total.value = 1
      } else {
        data.tableData = []
        total.value = 0
      }
      // 查其他
    } else {
      data.tableData = JSON.parse(JSON.stringify(res?.data?.data ?? []))
      data.tableData.forEach((val) => {
        val.createDate = formatTime(val.createDate)
        val.updateDate = formatTime(val.updateDate)
        val.status = val.status === 0 ? '未编辑' : '已编辑'
      })
      total.value = res?.data?.total ?? 0
    }
    loading.value = false
  })
}
queryInitData({ pageIndex: params.pageIndex, pageSize: params.pageSize })

// 页码
const handleSizeChange = () => {
  queryInitData(params)
}
const handleCurrentChange = () => {
  queryInitData(params)
}

// 编辑
const dialogFormVisible = ref(false)
// 搜索功能
const searchHandle = () => {
  params.pageIndex = 1
  queryInitData(params)
}

const createLoading = ref(false)
const num = ref(1)
// 新增功能
const createData = () => {
  createLoading.value = true
  createCodeData({ number: num.value }).then(() => {
    createLoading.value = false
    params.pageIndex = 1
    queryInitData(params)
  })
}

// 退出登录
const user_store = userStore()
const { replace } = useRouter()
const logout = () => {
  clearAll()
  user_store.setUserInfo({accessToken:'',refreshToken:''})
  replace('/login')
}

// 下载Excel
function exportAllExcel() {
  ElMessageBox.confirm('是否确认导出全部未编辑数据?', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    // 获取列表
    let parameter = {
      pageIndex: 1,
      pageSize: 1000,
      status: 0,
    }
    queryCodeData(parameter).then((res) => {
      loading.value = true
      let arr = res?.data?.data
      if (data) {
        exportList(arr)
      } else {
        ElMessage({ message: '暂无数据可导出', type: 'warning' })
      }
      loading.value = false
    })
  })
}
const url = import.meta.env.VITE_EXPORT_URL+'#/showPage/'
function exportList(arr) {
  let excelData = [
    ['二维码地址'], //导出表头
  ] // 表格表头
  console.log(url);
  
  arr.forEach((item: { id: string }) => {
    let rowData: string[] = []
    //导出内容的字段
    rowData = [url + item.id]
    excelData.push(rowData)
  })
  let workSheet = XLSX.utils.aoa_to_sheet(excelData)
  let bookNew = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(bookNew, workSheet, '二维码信息') // 工作簿名称
  let name = '二维码地址.xlsx'
  XLSX.writeFile(bookNew, name) // 保存的文件名
}
</script>

<style scoped lang="scss">
.home {
  // padding: 24px 32px;
  height: 100vh;
  :deep(.el-header) {
    padding: 0;
    padding-left: 24px;
  }
  :deep(.el-main) {
    padding-bottom: 0;
  }
  :deep(.el-container) {
    height: 100%;
  }
}
</style>
