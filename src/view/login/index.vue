<template>
  <div class="login-box">
    <div class="logo-wrapper">
      <div class="logo">
        <img src="@/assets/login/logo.png" alt="" />
      </div>
      <div>
        <span class="title">网络协同办公系统</span>
      </div>
    </div>
    <div class="input-wrapper">
      <van-form @submit="onSubmit">
        <div class="input-group">
          <van-field
            v-model="username"
            name="username"
            :left-icon="account"
            placeholder="请输入账号"
            :rules="[{ required: true, message: '请输入账号' }]"
            class="single-input"
          />
          <van-field
            v-model="password"
            type="password"
            name="password"
            :left-icon="passwordIcon"
            placeholder="请输入密码"
            :rules="[{ required: true, message: '请输入密码' }]"
            class="single-input"
          />
        </div>
        <van-checkbox v-model="checked" class="remember-box">
          <template #icon="props">
            <img :src="props.checked ? selected : notSelected" />
          </template>
          <span>记住密码</span>
        </van-checkbox>
        <div class="submit-btn">
          <van-button native-type="submit"> 登录 </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { showSuccessToast, showFailToast } from 'vant';
import router from '@/router'
import account from '@/assets/login/account.png';
import selected from '@/assets/login/selected.png';
import passwordIcon from '@/assets/login/password.png';
import notSelected from '@/assets/login/not-selected.png';



const username = ref('');
const password = ref('');
const checked = ref(false);
interface FormData {
  username: string;
  password: string;
}
const onSubmit = (values: FormData) => {
  
};

//登录成功处理业务
async function loginSucceed() {

}

// 之前记住密码时自动填充账号
onMounted(() => {
  const savedUsername = localStorage.getItem('unam')!;
  const savedPassword = localStorage.getItem('pwd')!;
  if (savedUsername && savedPassword) {
    username.value = savedUsername;
    password.value = savedPassword;
    checked.value = true;
  }
});
</script>

<style lang="scss" scoped>
.login-box {
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(0deg, #fff, #cbd6fa);
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  overflow-x: hidden;
}
//logo
.logo-wrapper {
  text-align: center;
  margin: 50px auto;
  // margin: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.logo {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background: white;
  border-radius: 32px;
  margin-bottom: 20px;
  padding: 10px;
  img {
    width: 80px;
    height: auto;
  }
}
.title {
  font-size: 20px;
  font-weight: bold;
}
.input-wrapper {
  margin-bottom: 40px;
}
// 输入账号密码
.single-input {
  margin-top: 32px;
  border-radius: 4px;
  border: 1px solid #d2d2d2;
  overflow: visible !important;
}
:deep(.van-field__left-icon),
:deep(.van-field__control) {
  display: inline-flex;
  vertical-align: middle;
  align-items: center;
}
:deep(.van-field__error-message) {
  position: absolute;
  bottom: -32px;
  left: 0;
  font-size: 12px;
  margin-top: 4px;
}
// 选择自动填充数据会有蓝色背景框，用下面的不会出现这个问题
:deep(.van-field__control:-webkit-autofill) {
  -webkit-box-shadow: 0 0 0 1000px white inset !important;
}
// 记住密码
.remember-box {
  margin: 12px 0 12px 0;
  display: flex;
  align-items: center;
  img {
    height: 16px;
    width: auto;
  }
  span {
    font-size: 12px;
  }
}
// 登录按钮
.submit-btn {
  button {
    width: 100%;
    background: #8e84e0 !important;
    border-radius: 4px;
    border: none !important;
    color: #fff;
  }
}
::v-deep .van-checkbox__label {
  font-size: 16px;
  color: #7768e2;
}
</style>
