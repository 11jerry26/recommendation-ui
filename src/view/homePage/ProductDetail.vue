<template>
  <div class="page">
    <div class="content-box">
      <div class="top-box">
        <div class="return" @click="router.push('/homePage')">
          <img src="@/assets/operation-img/return.png" alt="return" />
        </div>
        <div class="cart">
          <img src="@/assets/operation-img/cart.png" alt="cart" />
        </div>
      </div>
      <div class="image-box">
        <img :src=getImageUrl(product.fileName) alt="product" />
      </div>
      <div class="price-sell">
        <div class="price">￥{{product.price}}</div>
        <div class="sell">已售{{product.sellCount}}</div>
      </div>
      <div class="description">{{product.description}}</div>
      <div class="operation-box">
        <div class="collect">
          <img
            src="@/assets/operation-img/collect-inactive.png"
            alt="collect-inactive"
          />
        </div>
        <div class="buttons">
          <div class="add-cart">加入购物车</div>
          <div class="purchase">购买</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useProductStore } from '@/stores/productStore'
import { getImageUrl } from "@/utils/imageUtil";
import { computed, onMounted } from "vue";

const router = useRouter();
const productStore = useProductStore()
const product = computed(() => productStore.currentProduct)

onMounted(() => {
    console.log(product.value?.fileName);
    console.log(productStore.currentProduct);
})
</script>

<style scoped lang="scss">
.page {
  width: 100%;
  height: 100vh;
  background-color: black;

  .content-box {
    width: 100%;

    .top-box {
      position: absolute;
      top: 0.625rem;
      width: 90%;
      left: 50%;
      transform: translateX(-170px);
      background-color: transparent;
      display: flex;
      justify-content: space-between;

      .return,
      .cart {
        width: 30px;
        height: 30px;
        background-color: gray;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 6px;

        img {
          width: 15px;
          height: 15px;
        }
      }
    }

    .image-box {
      width: 100%;
      height: 400px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .price-sell {
      display: flex;
      padding: 10px;
      justify-content: space-between;
      background-color: #d4b07a;

      .price,
      .sell {
        color: white;
      }
    }

    .description {
      color: white;
      padding: 5px;
    }

    .operation-box {
      position: fixed;
      bottom: 0;
      left: 0;
      display: flex;
      justify-content: space-between;
      height: 40px;
      align-items: center;
      padding: 0 20px;
      width: 95%;

      img {
        width: 20px;
        height: 20px;
      }

      .buttons {
        display: flex;
        align-items: center;

        .add-cart,
        .purchase {
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          width: 100px;
          height: 40px;
        }

        .add-cart:active,.purchase:active {
            opacity: 0.8;
        }

        .add-cart {
            background-color: #9f835a;
            border-top-left-radius: 6px;
        }

        .purchase {
            background-color: #d4b07a;
        }
      }
    }
  }
}
</style>
