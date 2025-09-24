<template>
  <div class="item" @click="toProductDetail">
    <div class="left-box">
      <img :src="getImageUrl(product.fileName)" alt="product" />
    </div>
    <div class="right-box">
      <div class="name-count">
        <div class="name">{{ product.productName }}</div>
        <div class="description">{{ product.description }}</div>
      </div>

      <div class="price">￥{{ product.price }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CartProduct, Product, Result } from "@/utils/t-type";
import { computed, onMounted, ref, watch } from "vue";
import { getImageUrl } from "@/utils/imageUtil";
import { useUserStore } from "@/stores/userStore";
import { formatToDateTime } from "@/utils/time";
import { browseProductAPI, deleteCartProduct } from "@/api/behavior";
import { showFailToast, showSuccessToast } from "vant";
import { useProductStore } from "@/stores/productStore";
import { useRouter } from "vue-router";

const props = defineProps<{
  product: Product;
}>();

const router = useRouter()
const product = computed(() => props.product);
const userStore = useUserStore();
const userId = computed(() => userStore.userInfo?.userId);
const productStore = useProductStore()

const toProductDetail = () => {
  productStore.setCurrentProduct(product.value)
  browseProductAPI({
        userId:userId.value,
        productId:product.value.productId,
        behaviorTypeId:1,
        behaviorTime:formatToDateTime(new Date()),
        isDelete:0
    }).then(({code,data,msg}:Result) => {
        if(code === 200) {
            console.log(data);
        } else {
            showFailToast(msg)
        }
    }
    )
  router.push('/productDetail')
}
</script>

<style scoped lang="scss">
.item {
  width: 90%;
  margin: auto;
  height: 6.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  box-shadow: 0px 2px 10px #b5afaf;
  border-radius: 8px;

  .left-box {
    flex: 1;
    height: 100px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-bottom-left-radius: 8px;
      border-top-left-radius: 8px;
    }
  }

  .right-box {
    flex: 3;
    height: 80px;
    padding: 0 0 0 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .name-count {
      width: 100%;
      height: 40px;

      .name {
        font-weight: 600;
      }

      .count {
        width: 80px;
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

    .description {
      font-size: 12px;
      font-weight: 400;
      color: #b5afaf;
    }
  }
}
</style>
