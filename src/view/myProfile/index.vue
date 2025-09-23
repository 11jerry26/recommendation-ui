<template>
  <div class="page">
    <div class="user-info">
      <div class="avatar">
        <img src="@/assets/operation-img/avatar.png" alt="avatar" />
      </div>
      <div class="name">黄油奶牛</div>
    </div>
    <div class="my-order">
      <div class="text">我的订单</div>
      <img src="@/assets/operation-img/arrow.png" alt="alt" />
    </div>
    <div class="bottom-box">
      <van-tabs v-model:active="active" :color="'#d4b07a'">
        <van-tab title="猜你喜欢">猜你喜欢</van-tab>
        <van-tab title="我的收藏">我的收藏 2</van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const active = ref(0);
</script>

<style scoped lang="scss">
.page {
  width: 100vw;
  height: 100%;
  background-color: black;

  .user-info {
    display: flex;
    align-items: center;
    height: 48px;
    padding-left: 10px;

    .avatar {
      img {
        width: 30px;
        height: 30px;
      }
    }

    .name {
      font-weight: 600;
      color: white;
      width: 80px;
      height: 40px;
      display: flex;
      align-items: center;
      margin-left: 10px;
    }
  }

  .my-order {
    width: 90%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    margin-top: 10px;
    border-radius: 6px;

    .text {
      color: white;
      font-size: 20px;
    }

    img {
      width: 20px;
      height: 20px;
    }
  }

  .bottom-box {
    margin-top: 20px;
    width: 100vw;
  }
}
</style>
