<template>
  <div class="page">
    <div class="user-info">
      <div class="avatar">
        <img src="@/assets/operation-img/avatar.png" alt="avatar" />
      </div>
      <div class="name">黄油奶牛</div>
      <div class="log-out" @click="showExit = true"> 
        <img src="@/assets/login/logout.png" alt="logout">
      </div>
    </div>
    <div class="my-order">
      <div class="text">我的订单</div>
      <img src="@/assets/operation-img/arrow.png" alt="alt" />
    </div>
    <div class="bottom-box">
      <van-tabs v-model:active="active" :color="'#d4b07a'">
        <van-tab title="猜你喜欢">猜你喜欢</van-tab>
        <van-tab title="我的收藏">我的收藏 2</van-tab>
      </van-tabs>
    </div>

     <van-popup v-model:show="showExit" class="custom-popup">
            <div class="confirm-box">
              <div class="warning-img">
                <img
                  src="@/assets/login/warning.png"
                  alt="warning"
                  style="height: 48px; width: 48px"
                />
              </div>
              <p>是否退出当前账号，回到首页？</p>
              <div class="confirm-buttons">
                <div class="cancel" @click="showExit = false">取消</div>
                <div class="sure" @click="logout">确定</div>
              </div>
            </div>
          </van-popup>
  </div>
</template>

<script setup lang="ts">
import { showSuccessToast } from "vant";
import { ref } from "vue";
import { useRouter } from "vue-router";

const active = ref(0);
const showExit = ref(false)
const router = useRouter()

const logout = () => {
  router.push('/login')
  showSuccessToast('退出成功！');
}
</script>

<style scoped lang="scss">
.page {
  width: 100vw;
  height: 100%;
  background-color: black;

  .user-info {
    display: flex;
    align-items: center;
    height: 48px;
    padding-left: 10px;

    .avatar {
      img {
        width: 30px;
        height: 30px;
      }
    }

    .log-out {
      margin-left: auto;
      margin-right: 20px;
      img {
         width: 30px;
        height: 30px;
      }
    }

    .name {
      font-weight: 600;
      color: white;
      width: 80px;
      height: 40px;
      display: flex;
      align-items: center;
      margin-left: 10px;
    }
  }

  .my-order {
    width: 90%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    margin-top: 10px;
    border-radius: 6px;

    .text {
      color: white;
      font-size: 20px;
    }

    img {
      width: 20px;
      height: 20px;
    }
  }

  .bottom-box {
    margin-top: 20px;
    width: 100vw;
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
