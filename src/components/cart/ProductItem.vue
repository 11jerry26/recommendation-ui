<template>
  <div class="item">
    <div class="left-box">
      <img src="@/assets/product-img/aoliao.png" alt="aoliao" />
    </div>
    <div class="right-box">
      <div class="name-count">
        <div class="name">美式复古衬衫</div>
        <div class="count">×1</div>
      </div>
      <div class="price">￥50</div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.item {
  width: 100vw;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left-box {
    flex: 1;
    height: 100px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .right-box {
    flex: 3;
    height: 80px;

    .name-count {
      width: 100%;
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .count {
        width: 20px;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    .price {
      color: #d4b07a;
      font-size: 18px;
      font-weight: 700;
    }
  }
}
</style>
