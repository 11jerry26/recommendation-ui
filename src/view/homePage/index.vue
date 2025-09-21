<template>
  <div class="page">
    <div class="content-box">
      <ProductCard v-for="product in productList" :key="product.productId" :product="product"></ProductCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { getProductList } from "@/api/product";
import { useUserStore } from "@/stores/userStore";
import { Product, Result } from "@/utils/t-type";
import { showFailToast } from "vant";


const userStore = useUserStore();
const userId = computed(() => userStore.userInfo?.userId);
const productList = ref<Product[]>([]);

onMounted(() => {
  getProductList({
    pageNum: 1,
    pageSize: 2,
    userId: userId.value,
  }).then(({ code, data, msg }: Result) => {
    if (code === 200) {
      console.log(data[0]);
      productList.value = data;
    } else {
      showFailToast(msg);
    }
  });
});
</script>

<style scoped lang="scss">
.page {
  width: 100%;
  height: 100vh;
  background-color: #272727;
  padding: 10px;
}
</style>
