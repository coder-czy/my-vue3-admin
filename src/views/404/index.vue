<template>
  <div class="not-found">
    <img :src="img" alt="404">
  </div>
</template>
<script lang="ts" setup>
import img from '/@/assets/img/404.png'
</script>
<style lang="scss">
.not-found {
  height: 100vh;
  img{
    height: 100%;
    margin: 0 auto;
  }
}
</style>