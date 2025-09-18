<template>
  <van-tabbar v-model="active" active-color="#7C68EE" v-if="tabbarShow">
    <van-tabbar-item replace to="/homePage">
      <span>首页</span>
      <template #icon="props">
        <img
          :src="
            props.active ? icons.homePage.active : icons.homePage.inactive
          "
        />
      </template>
    </van-tabbar-item>

    <van-tabbar-item replace to="/shoppingCart">
      <span>购物车</span>
      <template #icon="props">
        <img
          :src="
            props.active
              ? icons.shoppingCart.active
              : icons.shoppingCart.inactive
          "
        />
      </template>
    </van-tabbar-item>

    <van-tabbar-item replace to="/myProfile">
      <span>个人中心</span>
      <template #icon="props">
        <img
          :src="
            props.active ? icons.myProfile.active : icons.myProfile.inactive
          "
        />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
import { computed, onMounted, onUpdated, ref } from 'vue';

// 导入图片资源
import homepageActive from '@/assets/tabbar-icon/homepage-active.png';
import homepageInactive from '@/assets/tabbar-icon/homepage-inactive.png';
import shoppingCartActive from '@/assets/tabbar-icon/shopping-cart-active.png';
import shoppingCartInactive from '@/assets/tabbar-icon/shopping-cart-inactive.png';
import myProfileActive from '@/assets/tabbar-icon/myprofile-active.png';
import myProfileInactive from '@/assets/tabbar-icon/myprofile-inactive.png';
import { useRoute, useRouter } from 'vue-router';
import { get } from 'http';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore()
// 当前选中的 TabBar 项索引（从 0 开始）
const active = ref(0);
const router = useRouter();
const route = useRoute();
const page = ref();

const routeToIndexMap = {
  '/homePage':0,
  '/shoppingCart': 1,
  '/myProfile': 2,
};

// 四个自定义图标的配置（active 和 inactive 状态）
const icons = {
  homePage: {
    active: homepageActive,
    inactive: homepageInactive,
  },
  shoppingCart: {
    active: shoppingCartActive,
    inactive: shoppingCartInactive,
  },
  myProfile: {
    active: myProfileActive,
    inactive: myProfileInactive,
  },
};

const currentRoute = useRouter();
const tabbarShow = computed(() => {
  return [
    '/homePage',
    '/shoppingCart',
    '/myProfile',
  ].includes(route.path);
});

onMounted(() => {
  updateActiveIndex();
});

router.afterEach(() => {
  updateActiveIndex();
});

function updateActiveIndex() {
  const index = routeToIndexMap[route.path as keyof typeof routeToIndexMap];
  if (index !== undefined) {
    active.value = index;
  }
}
</script>

<style scoped lang="scss">

</style>
