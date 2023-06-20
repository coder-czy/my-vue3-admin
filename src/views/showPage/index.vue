<template>
   <div v-loading="loading" class=" h-full text-center text-2xl text-stone-900 font-bold flex justify-center items-center">
    {{ text }}
   </div>
</template>

<script setup lang='ts'>
import {ref} from 'vue'
import { useRoute } from "vue-router";

import { queryDataById } from "/@/api/qrcode";
import { tableType } from "/@/type";

const text = ref('空')
const loading = ref(false)

const route =  useRoute()
const id = route.params?.id as string
if(id){
   loading.value = true
   queryDataById({id}).then(res=>{
   console.log(res);
   let data:tableType = res?.data
   if(data)
   text.value = `${data.areaCode}-${data.code}-${data.customer}`
   loading.value = false
})
}


</script>

<style scoped>

</style>
