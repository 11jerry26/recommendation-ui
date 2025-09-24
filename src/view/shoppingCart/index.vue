<template>
  <div class="page">
    <div class="header-row">
      <span>购物车</span>
      <div class="count" v-if="cartProductList.length > 0">({{cartProductList.length}})</div>
    </div>
    <div class="content-box">
      <div v-if="cartProductList.length > 0">
        <ProductItem v-for="item in cartProductList" :key="item.productId" :product="item" @reload-product="handleReload"
        :checked="checkedProductIds.includes(item.productId)"
        @toggle-check="handleToggleCheck"></ProductItem>
      </div>
      <van-empty v-else  description="购物车暂时还没有商品哦！" />
    </div>
    <div class="bottom-box" v-if="cartProductList.length > 0">
       <van-checkbox 
        v-model="isAllChecked" 
        class="check-all"
        @change="handleCheckAll"
      >
        全选
      </van-checkbox>
      <div class="right-box">
        <div class="total">
          <p>合计:</p>
          <div class="total-price">￥{{totalPrice}}</div>
        </div>

        <div class="button" @click="handlePurchase">
          结&nbsp;算
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getAllCartProduct, purchaseCartProduct } from "@/api/behavior";
import { useUserStore } from "@/stores/userStore";
import { CartProduct, Result } from "@/utils/t-type";
import { showFailToast, showSuccessToast } from "vant";
import { computed, onMounted, ref, toRaw } from "vue";
import{formatToDateTime} from '@/utils/time'

const userStore = useUserStore()
const userId = computed(() => userStore.userInfo?.userId)
const cartProductList = ref<CartProduct[]>([])
const checkedProductIds = ref<number[]>([])
const checkedProductList = computed(() => {
  if (cartProductList.value.length === 0 || checkedProductIds.value.length === 0) {
    return [];
  }
  return cartProductList.value.filter(item => {
    return checkedProductIds.value.includes(item.productId);
  });
});
const requestList = ref<any[]>([])
const totalPrice = computed(() => {
  const rawCartProductList = checkedProductList.value.map(item => toRaw(item));
  if(rawCartProductList.length === 0) {
    return 0;
  } else {
    let total = 0
    rawCartProductList.forEach(item => {
      total += item.price * item.cartCount
    })
    return total
  }
})

const loadCartProduct = () => {
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
}

const handleReload = () => {
  loadCartProduct()
}

// 处理商品选中状态切换
const handleToggleCheck = (productId: number, checked: boolean) => {
  if (checked) {  // 选中时添加
    if (!checkedProductIds.value.includes(productId)) {
      checkedProductIds.value.push(productId);
    }
  } else {  // 未选中时移除
    checkedProductIds.value = checkedProductIds.value.filter(id => id !== productId);
  }
};

// 全选/取消全选
const isAllChecked = computed({
  get() {
    return cartProductList.value.length > 0 && 
           checkedProductIds.value.length === cartProductList.value.length
  },
  set(checked) {
    if (checked) {
      // 全选 - 添加所有商品ID
      checkedProductIds.value = cartProductList.value.map(item => item.productId)
    } 
    else {
      // 取消全选 - 清空数组
      if(checkedProductIds.value.length === cartProductList.value.length) {
        checkedProductIds.value = []
      }
    }
  }
})

const handleCheckAll = (checked: boolean) => {
  isAllChecked.value = checked
}

const handlePurchase = () => {
  if (checkedProductList.value.length === 0) {
    showFailToast('请先勾选要购买的商品');
    return;
  }

  const requestList = checkedProductList.value.map(item => {
    const rawItem = toRaw(item); // 转换为原始对象（非 Proxy）
    return {
      userId: userId.value,
      productId: rawItem.productId,
      cartCount: rawItem.cartCount,
      sellCount: rawItem.sellCount,
      behaviorTime: formatToDateTime(new Date())
    };
  });

  console.log("请求数据（数组）：", requestList);

  purchaseCartProduct(requestList).then(({ code, data, msg }: Result) => {
    if (code === 200) {
      showSuccessToast('购买成功');
      checkedProductIds.value = []
      loadCartProduct();
    } else {
      showFailToast(msg);
    }
  });
};

onMounted(() => {
  loadCartProduct()
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

.bottom-box {
  width: 100vw;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  position: fixed;
  bottom: 48px;
  left: 0;
  border-top: 1px solid #DCDCDC;

  .right-box {
    display: flex;
    align-items: center;

    .total {
      display: flex;
      align-items: center;
      margin-left: auto;

      p {
        font-size: 14px;
      }

      .total-price {
        color: chocolate;
        font-weight: 500;
        font-size: 16px;
      }
    }

    .button {
      width: 100px;
      height: 36px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 6px;
      background-color: chocolate;
      margin-left: 10px;
      font-weight: 500;
      color: white;
    }

    .button:active {
      opacity: 0.8;
    }
  }
}

.check-all {
  font-size: 14px;
}
</style>