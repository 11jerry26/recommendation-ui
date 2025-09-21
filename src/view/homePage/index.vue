<template>
  <div class="page">
    <div class="content-box">
      <van-list
        v-if="productList.length > 0"
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="card-container">
          <ProductCard
            v-for="product in productList"
            :key="product.productId"
            :product="product"
          ></ProductCard>
        </div>
      </van-list>
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
const curPage = ref(1);
const loading = ref(false);
const finished = ref(false);

const onLoad = async () => {
  try {
    loading.value = true;
    const { code, data, msg } = await getProductList({
      pageNum: curPage.value,
      pageSize: 6,
      userId: userId.value,
    });

    if (code === 200) {
      productList.value.push(...data);
      console.log(productList.value);

      // 判断是否加载完成
      if (data.length < 6) {
        finished.value = true;
      } else {
        curPage.value++;
      }
    } else {
      console.error('请求失败:', msg);
      finished.value = true; 
    }
  } catch (error) {
    console.error('网络错误:', error);
    finished.value = true;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  onLoad()
});
</script>

<style scoped lang="scss">
.page {
  width: 100%;
  height: 100%;
  background-color: #272727;
  padding: 10px 8px;

  .content-box {
    padding-bottom: 48px;
  }

  .card-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr); 
    gap: 10px; 
  }

  .empty-tip {
    color: #fff;
    text-align: center;
    padding: 20px;
  }
}
</style>
