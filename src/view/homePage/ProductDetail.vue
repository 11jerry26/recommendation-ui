<template>
  <div class="page">
    <div class="content-box">
      <div class="top-box">
        <div class="return" @click="router.push('/homePage')">
          <img src="@/assets/operation-img/return.png" alt="return" />
        </div>
        <div class="cart" @click="router.push('/shoppingCart')">
          <img src="@/assets/operation-img/cart.png" alt="cart" />
        </div>
      </div>
      <div class="image-box">
        <img :src="getImageUrl(product.fileName)" alt="product" />
      </div>
      <div class="price-sell">
        <div class="price">￥{{ product.price }}</div>
        <div class="sell">已售{{ product.sellCount }}</div>
      </div>
      <div class="description">{{ product.description }}</div>
      <div class="operation-box">
        <div class="collect" @click="handleCollect">
          <img
            v-if="!isCollected"
            src="@/assets/operation-img/collect-inactive.png"
            alt="collect-inactive"
          />
          <img
            v-else
            src="@/assets/operation-img/collect-active.png"
            alt="collect-active"
          />
        </div>
        <div class="buttons">
          <div class="add-cart" @click="addCartShow = true">加入购物车</div>
          <div class="purchase" @click="purchasePanelshow = true">购买</div>
        </div>
      </div>
    </div>
    <!-- 底部弹出 -->
    <van-popup
      v-model:show="addCartShow"
      position="bottom"
      round
      :style="{ height: '40%' }"
    >
      <div class="product-show">
        <div class="box">
          <img :src="getImageUrl(product.fileName)" alt="product" />
          <div class="right-box">
            <div class="product-price">￥{{ product.price }}</div>
            <Count @change-count="handleCountChange" :count="count"></Count>
          </div>
        </div>
        <div class="button" @click="addCart">加入购物车</div>
      </div>
    </van-popup>

    <van-popup
      v-model:show="purchasePanelshow"
      position="bottom"
      round
      :style="{ height: '40%' }"
    >
      <div class="product-show">
        <div class="box">
          <img :src="getImageUrl(product.fileName)" alt="product" />
          <div class="right-box">
            <div class="product-price">￥{{ product.price }}</div>
            <Count @change-count="handleCountChange" :count="count"></Count>
          </div>
        </div>
        <div class="button" @click="purchase">立即支付￥{{product.price * count}}</div>
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useProductStore } from "@/stores/productStore";
import { getImageUrl } from "@/utils/imageUtil";
import { computed, onMounted, ref, watch } from "vue";
import { useUserStore } from "@/stores/userStore";
import { addCartAPI, handleCollectAPI, purchaseCartProduct, searchCollectStatus } from "@/api/behavior";
import { formatToDateTime } from "@/utils/time";
import { Result } from "@/utils/t-type";
import { showFailToast, showSuccessToast } from "vant";


const router = useRouter();
const productStore = useProductStore();
const product = computed(() => productStore.currentProduct);
const userStore = useUserStore();
const userId = computed(() => userStore.userInfo?.userId);
const isCollected = ref(false);
const addCartShow = ref(false);
const purchasePanelshow = ref(false)
const count = ref(1)

//处理收藏
const handleCollect = () => {
  const isDelete = isCollected.value ? 1 : 0;
  handleCollectAPI({
    userId: userId.value,
    productId: product.value?.productId,
    behaviorTypeId: 3,
    behaviorTime: formatToDateTime(new Date()),
    isDelete: isDelete,
  }).then(({ code, data, msg }: Result) => {
    if (code === 200) {
      if (isCollected.value === false) {
        showSuccessToast("收藏成功");
        isCollected.value = true;
      } else {
        showSuccessToast("取消收藏成功");
        isCollected.value = false;
      }
    } else {
      showFailToast(msg);
    }
  });
};

const handleCountChange = (newCount:number) => {
  count.value = newCount
}

const addCart = () => {
  addCartAPI({
    userId: userId.value,
    productId: product.value?.productId,
    behaviorTypeId: 2,
    behaviorTime: formatToDateTime(new Date()),
    isDelete: 0,
    count:count.value
  }).then(({code,data,msg}:Result) => {
    if(code === 200) {
      showSuccessToast('添加成功')
      addCartShow.value = false
      count.value = 1
    } else {
      showFailToast(msg)
    }
  })
}

const purchase = () => {
  const requestList = [{
    userId: userId.value,
      productId: product.value!.productId,
      cartCount: count.value,
      sellCount: product.value!.sellCount,
      behaviorTime: formatToDateTime(new Date())
  }]
  purchaseCartProduct(requestList).then(({ code, data, msg }: Result) => {
    if (code === 200) {
      showSuccessToast('购买成功');
     purchasePanelshow.value = false
    } else {
      showFailToast(msg);
    }
  });
}


onMounted(() => {
  searchCollectStatus({
    userId: userId.value,
    productId: product.value?.productId,
    behaviorTypeId: 3,
  }).then(({ code, data, msg }: Result) => {
    if (code === 200) {
      isCollected.value = data;
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

        .add-cart:active,
        .purchase:active {
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

.product-show {
  width: 100%;

  .box {
    width: 90%;
    margin: auto;
    display: flex;
    align-items: center;
    margin-top: 10px;

    img {
      width: 80px;
      height: 120px;
      margin-right: 20px;
    }

    .product-price {
      font-size: 18px;
      font-weight: 600;
      color: #d4b07a;
    }
  }

  .button {
    position: fixed;
    bottom: 5px;
    width: 90%;
    margin-left: 20px;
    height: 48px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    background-color: #d4b07a;
  }

  .button:active {
    opacity: 0.8;
  }
}
</style>
