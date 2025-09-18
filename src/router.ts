import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    name: 'notFound',
    path: '/:path(.*)+',
    redirect: {
      name: 'login',
    },
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/view/login/index.vue'),
    meta: {
      title: '登录',
      isLoginPage: true,
    },
  },
  {
    name: 'homePage',
    path: '/homePage',
    component: () => import('@/view/homePage/index.vue'),
    meta: {
      title: '首页',
    },
  },
  {
    name: 'shoppingCart',
    path: '/shoppingCart',
    component: () => import('@/view/shoppingCart/index.vue'),
    meta: {
      title: '购物车',
    },
  },
  {
    name: 'myProfile',
    path: '/myProfile',
    component: () => import('@/view/myProfile/index.vue'),
    meta: {
      title: '个人中心',
    },
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
  scrollBehavior(to, from, savedPosition) {
    // 切换路由时新页面始终滚动到顶部
    return { top: 0 };
  },
});

export default router;
