<template>
  <div class="page">
    <div class="header-row">
      <span>购物车</span>
      <div class="count" v-if="cartProductList.length > 0">({{cartProductList.length}})</div>
    </div>
    <div class="content-box">
      <div v-if="cartProductList.length > 0">
        <ProductItem v-for="item in cartProductList" :key="item.productId" :product="item"></ProductItem>
      </div>
      <van-empty v-else  description="购物车暂时还没有商品哦！" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { getAllCartProduct } from "@/api/behavior";
import { useUserStore } from "@/stores/userStore";
import { CartProduct, Result } from "@/utils/t-type";
import { showFailToast } from "vant";
import { computed, onMounted, ref } from "vue";

const userStore = useUserStore()
const userId = computed(() => userStore.userInfo?.userId)
const cartProductList = ref<CartProduct[]>([])

onMounted(() => {
  getAllCartProduct({
    userId:userId.value
  }).then(({code,data,msg}:Result) => {
    if(code === 200) {
      cartProductList.value = data
      console.log(cartProductList.value);
      
    } else {
      showFailToast(msg)
    }
  })
})
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

  .content-box {
    padding-top: 10px;
  }
}
</style>