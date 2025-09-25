<template>
  <div class="page">
    <div class="header-row">
        <img src="@/assets/operation-img/return.png" alt="return" @click="router.push('/myProfile')">
        <div class="title">我的订单</div>
        <div class="blank-box"></div>
    </div>
    <div class="content-box">
        <OrderItem v-for="(order,index) in orderInfoList" :key="index" :order="order"></OrderItem>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getUserOrder } from "@/api/myprofile";
import { getProductByIdAPI } from "@/api/product";
import { useUserStore } from "@/stores/userStore";
import { Result } from "@/utils/t-type";
import { showFailToast } from "vant";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter()
const userStore = useUserStore()
const userId = computed(() => userStore.userInfo?.userId)
const orderInfoList = ref<any[]>([])

onMounted(() => {
    getUserOrder({
        userId:userId.value,
        isDelete:0
    }).then(({code,data,msg}:Result) => {
        if(code === 200) {
            console.log(data);
            
            data.forEach((order:any) => {
                getProductByIdAPI({
                    productId:order.productId
                }).then((res:Result) => {
                    if(res.code === 200) {
                        orderInfoList.value.push({
                            productId:order.productId,
                            productName:res.data.productName,
                            fileName:res.data.fileName,
                            description:res.data.description,
                            price:order.price,
                            createTime:order.createTime,
                            count:order.count
                        })
                    } else {
                        showFailToast(msg)
                    }
                })
            })
            
        } else {
            showFailToast(msg)
        }
    })
})
</script>

<style scoped lang="scss">
.page {
    width: 100vw;
    overflow-x: hidden;

    .header-row {
        width: 100%;
        height: 48px;
        background-color: black;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 5px;

        img {
            width: 20px;
            height: 20px;
        }

        .title {
            font-size: 16px;
            font-weight: 600;
            color: white;
        }

        .blank-box {
            width: 30px;
        }
        
    }

    .content-box {
        margin-top: 10px;
    }
}
</style>