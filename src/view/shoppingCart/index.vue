<template>
  <div class="page">
    <div class="header-row">
      <span>购物车</span>
      <div class="count">(6)</div>
    </div>
    <div class="content-box">
      <ProductItem></ProductItem>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.page {
  width: 100vw;
  height: 48px;
  background-color: black;

  .header-row {
    width: 100vw;
    height: 48px;
    display: flex;
    align-items: center;

    span {
      font-size: 18px;
      font-weight: 700;
      color: white;
      margin: 0 10px;
    }

    .count {
      font-size: 14px;
      font-weight: 400;
      color: white;
    }
  }
}
</style>