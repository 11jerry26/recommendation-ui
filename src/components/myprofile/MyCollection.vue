<template>
  <div class="collection-box">
    <div v-if="collectionList.length > 0">
        <CollectItem v-for="item in collectionList" :key="item.productId" :product="item"></CollectItem>
    </div>
    <van-empty v-else description="您还没有收藏商品哦" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { getMyCollection } from '@/api/myprofile'
import { useUserStore } from "@/stores/userStore";
import { Result } from "@/utils/t-type";
import { showFailToast } from "vant";

const userStore = useUserStore()
const userId = computed(() => userStore.userInfo?.userId)
const collectionList = ref<any[]>([])

onMounted(() => {
    getMyCollection({
        userId:userId.value,
        behaviorTypeId:3,
        isDelete:0
    }).then(({code,data,msg}:Result) => {
        if(code === 200) {
            console.log(data);
            collectionList.value = data
        } else {
            showFailToast(msg)
        }
    })
})
</script>

<style scoped lang="scss">
.collection-box {
    background-color: white;
    width: 100%;
    padding-top: 15px;
}
</style>