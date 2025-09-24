<template>
<div class="big-box">
    <div class="checkbox">
    <van-checkbox v-model="checked" />
  </div>
  <van-swipe-cell>
    <div class="item">
      <div class="left-box">
        <img :src="getImageUrl(product.fileName)" alt="product" />
      </div>
      <div class="right-box">
        <div class="name-count">
          <div class="name">{{ product.productName }}</div>
          <div class="count">
            <Count
              :count="cartCount"
              @change-count="handleCountChange"
              :productId="product.productId"
            ></Count>
          </div>
        </div>
        <div class="price">￥{{ product.price }}</div>
      </div>
    </div>

    <template #right>
      <van-button
        square
        text="删除"
        type="danger"
        class="delete-button"
        @click="handleDeleteCartProduct"
      />
    </template>
  </van-swipe-cell>
</div>

</template>

<script setup lang="ts">
import { CartProduct, Result } from "@/utils/t-type";
import { computed, onMounted, ref, watch } from "vue";
import { getImageUrl } from "@/utils/imageUtil";
import { useUserStore } from "@/stores/userStore";
import { formatToDateTime } from "@/utils/time";
import { deleteCartProduct } from "@/api/behavior";
import { showFailToast, showSuccessToast } from "vant";

const props = defineProps<{
  product: CartProduct;
  checked?: boolean;
}>();

const product = computed(() => props.product);
const checked = computed({
  get:() => props.checked,
  set: (newVal: boolean) => {
    emit('toggle-check', product.value.productId, newVal);
  }
})

const userStore = useUserStore();
const userId = computed(() => userStore.userInfo?.userId);

const cartCount = ref(1);

const handleCountChange = (newCount: number) => {
  cartCount.value = newCount;
};
const emit = defineEmits<{
  (e: "reload-product"): void;
  (e: 'toggle-check', productId: number, checked: boolean): void;
}>();


watch(
  product,
  (newVal) => {
    cartCount.value = newVal.cartCount;
  },
  { immediate: true }
);

const handleDeleteCartProduct = () => {
  deleteCartProduct({
    userId: userId.value,
    productId: product.value.productId,
    behaviorTypeId: 2,
    behaviorTime: formatToDateTime(new Date()),
  }).then(({ code, data, msg }: Result) => {
    if (code === 200) {
      showSuccessToast("删除成功");
      emit("reload-product");
    } else {
      showFailToast(msg);
    }
  });
};


</script>

<style scoped lang="scss">
.big-box {
  width: 100%;
  display: flex;
  align-items: center;

  .checkbox {
    margin-left: 10px;
  }
}

.item {
  width: 90%;
  margin-left: auto;
  height: 6.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  box-shadow: 0px 2px 10px #b5afaf;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;

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
    padding: 0 6px;

    .name-count {
      width: 100%;
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;

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
  }
}

:deep(.van-button--square) {
  height: 100%;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}

:deep(.van-swipe-cell) {
    position: relative;
    overflow: hidden;
    cursor: -webkit-grab;
    cursor: grab;
    width: 100%;
}
</style>
