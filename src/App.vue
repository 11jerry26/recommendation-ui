<template>
  <div id="app">
    <router-view></router-view>
    <tabbar-component />
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
body {
  font-size: 16px;
  background-color: #f8f8f8;
  -webkit-font-smoothing: antialiased;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
}

* {
  box-sizing: border-box;
}
</style>
