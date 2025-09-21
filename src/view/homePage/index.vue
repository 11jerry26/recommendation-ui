<template>
  <div>首页</div>
  <div class="content-box">
    <img :src=getImageUrl(product.fileName) alt="projuct" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import {getProductList} from '@/api/product'
import { useUserStore } from "@/stores/userStore";
import { Result } from "@/utils/t-type";
import { showFailToast } from "vant";
import { getImageUrl } from '@/utils/imageUtil'

const userStore = useUserStore()
const userId = computed(() => userStore.userInfo?.userId)
const product = ref()

onMounted(() => {
  getProductList({
    pageNum:1,
    pageSize:2,
    userId:userId.value
  }).then(({code,data,msg}:Result) => {
    if(code === 200) {
      console.log(data[0]);
      product.value = data[0]
      console.log(product.value);
      
    } else {
      showFailToast(msg)
    }
  })
})
</script>

<style scoped lang="scss">
.content-box {
  img {
    width: 120px;
    height: 160px;
  }
}
</style>
