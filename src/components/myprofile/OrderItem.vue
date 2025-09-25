<template>
  <div class="item">
    <div class="top-box">
      <div class="left-box">
        <img :src="getImageUrl(order.fileName)" alt="product" />
      </div>
      <div class="right-box">
        <div class="name-count">
          <div class="name-price">
            <div class="name">{{ order.productName }}</div>
            <div class="count">×{{ order.count }}</div>
          </div>
          <div class="description">{{ order.description }}</div>
          <div class="description">{{ order.createTime }}</div>
        </div>

        <div class="price">￥{{ order.price }}</div>
      </div>
    </div>

    <div class="operations">
        <div class="delete" @click="showConfirm = true">删除订单</div>
      <div class="buttons">
        <div class="add-button" @click="addToCart">加入购物车</div>
        <div class="purchase-again" @click="purchaseAgain">再买一单</div>
      </div>
    </div>

     <van-popup v-model:show="showConfirm" class="custom-popup">
            <div class="confirm-box">
              <div class="warning-img">
                <img
                  src="@/assets/login/warning.png"
                  alt="warning"
                  style="height: 48px; width: 48px"
                />
              </div>
              <p>确定删除该订单？</p>
              <div class="confirm-buttons">
                <div class="cancel" @click="showConfirm = false">取消</div>
                <div class="sure" @click="sureDelete">确定</div>
              </div>
            </div>
          </van-popup>
  </div>
</template>

<script setup lang="ts">
import { CartProduct, Order, Product, Result } from "@/utils/t-type";
import { computed, onMounted, ref, watch } from "vue";
import { getImageUrl } from "@/utils/imageUtil";
import { useUserStore } from "@/stores/userStore";
import { formatToDateTime } from "@/utils/time";
import { addCartAPI, browseProductAPI, deleteCartProduct } from "@/api/behavior";
import { showFailToast, showSuccessToast } from "vant";
import { useProductStore } from "@/stores/productStore";
import { useRouter } from "vue-router";
import { getProductByIdAPI } from "@/api/product";
import { deleteUserOrder } from "@/api/myprofile";

const props = defineProps<{
  order: Order;
}>();

const router = useRouter();
const order = computed(() => props.order);
const userStore = useUserStore();
const userId = computed(() => userStore.userInfo?.userId);
const productStore = useProductStore();
const showConfirm = ref(false)

const emit = defineEmits<{
    (e:'reload-orders'):void
}>()

const addToCart = () => {
  addCartAPI({
    userId: userId.value,
    productId: order.value.productId,
    behaviorTypeId: 2,
    behaviorTime: formatToDateTime(new Date()),
    isDelete: 0,
    count: 1,
  }).then(({ code, data, msg }: Result) => {
    if (code === 200) {
      showSuccessToast("添加成功");
    } else {
      showFailToast(msg);
    }
  });

  router.push("/shoppingCart");
};

const purchaseAgain = () => {
    getProductByIdAPI({
        productId:order.value.productId
    }).then(({code,data,msg}:Result) => {
        if(code === 200) {
            productStore.setCurrentProduct(data)
            router.push('/productDetail')
        } else {
            showFailToast(msg)
        }
    })
}

const sureDelete = () => {
    deleteUserOrder({
        id:order.value.id
    }).then(({code,data,msg}:Result) => {
        if(code === 200) {
            showSuccessToast('删除成功')
            showConfirm.value =false
            emit('reload-orders')
        } else {
            showFailToast(msg)
        }
    })
}
</script>

<style scoped lang="scss">
.item {
  width: 90%;
  margin: auto;
  margin-bottom: 10px;
  box-shadow: 0px 2px 10px #b5afaf;
  border-radius: 8px;

  .top-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

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

      .name-price {
        display: flex;
        align-items: center;

        .count {
          font-size: 14px;
          color: #b5afaf;
          margin-left: auto;
        }
      }

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
      margin-left: auto;
      margin-right: 20px;
    }

    .description {
      font-size: 12px;
      font-weight: 400;
      color: #b5afaf;
    }
  }
}

.operations {
  display: flex;
  align-items: center;

  .delete {
    color: #b5afaf;
    font-size: 12px;
    margin-left: 5px;
  }

  .buttons {
    margin-left: auto;
    display: flex;
    margin-right: 10px;
    padding-bottom: 5px;
  }

  .add-button,
  .purchase-again {
    width: 80px;
    height: 30px;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .add-button:active,
  .purchase-again:active {
    opacity: 0.8;
  }

  .add-button {
    color: black;
    font-size: 14px;
    background-color: #d4b07a;
    margin-right: 5px;
  }

  .purchase-again {
    color: white;
    font-size: 0.875rem;
    font-weight: 500;
    background-color: chocolate;
  }
}

.confirm-box {
  background: linear-gradient(180deg, #e8defe 0%, #f6f8fe 100%);
  width: 295px;
  height: 200px;
  border-radius: 8px !important;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    font-size: 18px;
    font-weight: 400;
    text-align: center;
    margin: 0 auto 10px;
  }
}

.warning-img {
  margin: auto;
  display: flex;
  justify-content: center;
}

.confirm-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
  margin: auto;
}

.sure,
.cancel {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 400;
  width: 120px;
  height: 32px;
  border-radius: 16px;
}

.sure {
  border: 1px solid black;
}

.cancel {
  background-color: #8d7a5d;
  color: white;
}
</style>
