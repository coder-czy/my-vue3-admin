<template>
  <div
    class="flex h-screen w-screen bg-gradient-to-r from-blue-400 to-purple-500"
  >
    <div
      class="shadow-lg w-96 py-7 px-7 m-auto bg-white justify-center items-center rounded-lg"
    >
      <h1 class="text-center text-lg mb-4">{{ title }}</h1>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="80px"
        class="demo-ruleForm"
        :label-position="labelPosition"
        size="large"
      >
        <el-form-item
          label="账号"
          prop="account"
        >
          <el-input v-model="ruleForm.account" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input
            v-model="ruleForm.password"
            :type="showPass ? 'text' : 'password'"
            autocomplete="off"
          >
            <template #suffix>
              <div @click="toggleShow">
                <el-icon class="el-input__icon">
                  <View v-if="showPass" />
                  <Hide v-else />
                </el-icon>
              </div>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item> </el-form-item>
      </el-form>
      <div
        class="bg-gradient-to-r from-blue-400 to-purple-500 w-2/3 m-auto text-white text-center rounded-md text-md py-2"
        @click="submitForm(ruleFormRef)"
      >
        登录
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { Hide, View } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { userStore } from '/@/store'

onMounted(() => {
  resizeHandler()
  window.addEventListener('resize',resizeHandler)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize',resizeHandler)
})

// 响应式
let labelPosition = ref('left')
const { body } = document
const WIDTH = 375 // refer to Bootstrap's responsive design
function resizeHandler() {
  const rect = body.getBoundingClientRect()
  if (rect.width - 1 < WIDTH) {
    labelPosition.value = 'top'
  } else {
    labelPosition.value = 'left'
  }
  
}

const title = import.meta.env.VITE_GLOB_APP_SHORT_NAME
// 路由跳转
const { push } = useRouter()
const toHome = () => {
  push('/dashboard')
}

// 切换密码图标
let showPass = ref(true)
const toggleShow = () => {
  showPass.value = !showPass.value
}

const ruleFormRef = ref<FormInstance>()

const validateAccount = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入账号'))
  } else {
    if (ruleForm.password !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('password', () => null)
    }
    callback()
  }
}
const validatePassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    callback()
  }
}

const ruleForm = reactive({
  account: '',
  password: '',
})

const rules = reactive<FormRules>({
  account: [{ validator: validateAccount, trigger: 'blur' }],
  password: [{ validator: validatePassword, trigger: 'blur' }],
})

const user_store = userStore()
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
      user_store.setUserInfo({ userName: ruleForm.account })
      toHome()
    } else {
      console.log('error submit!')
      return false
    }
  })
}
</script>

<style scoped></style>
