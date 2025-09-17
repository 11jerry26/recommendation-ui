import { defineStore } from 'pinia';
import { UserInfo } from '@/utils/t-type';

interface AuthState {
  token: string | null;
  userInfo: UserInfo | null; // 新增 userInfo 字段
}

export const useUserStore = defineStore('user', {
  state: (): AuthState => ({
    token: null,
    userInfo: null, // 初始化 userInfo
  }),
  persist: true, 
  actions: {
    // 设置 Token
    setToken(token: string): void {
      this.token = token;
      sessionStorage.setItem('token', token);
    },

    // 清除 Token
    clearToken(): void {
      this.token = null;
      sessionStorage.removeItem('token');
    },

    // 设置用户信息
    setUserInfo(userInfo: UserInfo): void {
      this.userInfo = userInfo;
      sessionStorage.setItem('userInfo', JSON.stringify(userInfo)); // 可选：持久化
    },

    // 清除用户信息
    clearUserInfo(): void {
      this.userInfo = null;
      sessionStorage.removeItem('userInfo'); // 可选：清理持久化数据
    },

    // 初始化状态（从 sessionStorage 恢复）
    initializeStore(): void {
      const token = sessionStorage.getItem('token');
      if (token) {
        this.token = token;
      }
      const userInfo = sessionStorage.getItem('userInfo');
      if (userInfo) {
        this.userInfo = JSON.parse(userInfo) as UserInfo;
      }
    },
  },

  getters: {
    // 是否已认证
    isAuthenticated(): boolean {
      return !!this.token;
    },

    // 获取用户信息（可选）
    getUserInfo(): UserInfo | null {
      return this.userInfo;
    },
  },
});