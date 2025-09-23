<template>
  <div class="card" @click="toDetail">
    <div class="image-box">
        <img :src=getImageUrl(product.fileName) alt="product">
    </div>
    <div class="bottom-box">
        <div class="description">
            <div>{{product.description}}</div>
        </div>
        <div class="price">
            <div>￥{{product.price}}</div>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Product, Result } from "@/utils/t-type"
import { getImageUrl } from "@/utils/imageUtil";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useProductStore } from '@/stores/productStore'
import { browseProductAPI } from "@/api/behavior";
import { useUserStore } from "@/stores/userStore";
import{formatToDateTime} from '@/utils/time'
import { showFailToast } from "vant";

const productStore = useProductStore()
const userStore = useUserStore()
const userId = computed(() => userStore.userInfo?.userId)
const router = useRouter()
const props = defineProps<{
    product:Product
}>()
const product = computed(() => props.product)

const browseProduct = () => {
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
}

const toDetail = () => {
    productStore.setCurrentProduct(product.value)
    router.push('/productDetail')
    browseProduct()
}
</script>

<style scoped lang="scss">
.card {
    width: 175px;
    background-color: black;
    border-radius: 8px;
    padding-bottom: 5px;

    img {
        width: 100%;
        height: 200px;
        border-radius: 8px;
    }

    .bottom-box {
        width: 95%;
        margin: auto;

        .description {
            margin-top: 5px;
            margin-bottom: 5px;
            color: white;
            font-size: 14px;
            font-weight: 600;
        }

        .price {
            color: #D4B07A;
            font-weight: 600;
        }
    }
}
</style>