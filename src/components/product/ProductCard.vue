<template>
  <div class="card">
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
import { Product } from "@/utils/t-type"
import { getImageUrl } from "@/utils/imageUtil";
import { computed } from "vue";

const props = defineProps<{
    product:Product
}>()
const product = computed(() => props.product)
</script>

<style scoped lang="scss">
.card {
    width: 175px;
    background-color: black;
    border-radius: 8px;

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