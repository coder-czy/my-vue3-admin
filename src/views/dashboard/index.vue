<template>
   <div class="">
    主页{{ userName }}
   </div>
</template>

<script setup lang='ts'>
// import {ref,reactive} from 'vue'
import {userStore} from '/@/store'
const user_store = userStore()
const userName = user_store.userName

</script>

<style scoped>

</style>
