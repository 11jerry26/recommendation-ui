<template>
  <div class="counter-container">
    <!-- 减号按钮 -->
    <button 
      class="counter-btn minus-btn" 
      @click="decrement"
      :disabled="count <= min"
      :aria-disabled="count <= min"
    >
      -
    </button>
    
    <!-- 数字显示 -->
    <div class="counter-value">
      {{ count }}
    </div>
    
    <!-- 加号按钮 -->
    <button 
      class="counter-btn plus-btn" 
      @click="increment"
      :disabled="count >= max"
      :aria-disabled="count >= max"
    >
      +
    </button>
  </div>
</template>

<script setup lang="ts">
import { changeCartProductCount } from '@/api/behavior';
import { useUserStore } from '@/stores/userStore';
import { Result } from '@/utils/t-type';
import { showFailToast } from 'vant';
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';

const userStore = useUserStore()
const userId = computed(() => userStore.userInfo?.userId);
const min = 1
const max = Infinity
const props = defineProps<{
  count:number;
  productId:number
}>()
const route = useRoute()
const count = computed({
  get:() => props.count,
  set: (newValue) => {
    // 发送事件通知父组件更新count值
    emit('change-count', newValue);
  }
})

const emit = defineEmits<{
    (e:'change-count', newCount:number):void
}>();



// 减操作
const decrement = () => {
  if (count.value > min) {
    count.value -= 1;
    // emit('change-count',count.value)
  }
};

// 加操作
const increment = () => {
  if (count.value < max) {
    count.value += 1;
    // emit('change-count',count.value)
  }
};

watch(count,(newVal) => {
  if(route.path === '/shoppingCart') {
    changeCartProductCount({
      userId:userId?.value,
      productId:props.productId,
      count:newVal
    }).then(({code,data,msg}:Result) => {
      if(code === 200) {
        console.log(data);
      } else {
        showFailToast(msg)
      }
    })
  }
})
</script>

<style scoped>
.counter-container {
  display: inline-flex;
  align-items: center;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  user-select: none;
  margin-top: 20px;
}

.counter-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  border: none;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0;
}

.counter-btn:hover {
  background-color: #e8e8e8;
}

.counter-btn:disabled {
    background-color: #C9C7C7;
    color: black;
    cursor: not-allowed;
}

.minus-btn {
  border-right: 1px solid #eee;
}

.plus-btn {
  border-left: 1px solid #eee;
}

.counter-value {
  width: 48px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
  background-color: #fff;
}
</style>
