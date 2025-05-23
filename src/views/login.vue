<template>
    <div class="login-page">
      <div class="login-container">
        <h1 class="login-title">登录书舟全球</h1>
        <form @submit.prevent="handleLogin">
          <!-- 邮箱 -->
          <div class="form-group">
            <label for="email">邮箱</label>
            <input
              type="email"
              id="email"
              v-model="email"
              placeholder="请输入邮箱"
              required
            />
          </div>
  
          <!-- 密码 -->
          <div class="form-group">
            <label for="password">密码</label>
            <input
              type="password"
              id="password"
              v-model="password"
              placeholder="请输入密码"
              required
            />
          </div>
  
          <!-- 提交按钮 -->
          <button type="submit" class="login-button">登录</button>
        </form>
  
        <p class="register-link">
          没有账号？<RouterLink to="/register">立即注册</RouterLink>
        </p>
      </div>
    </div>
  </template>
  
<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const email = ref('');
const password = ref('');
const router = useRouter();
const store = useStore();

const handleLogin = async () => {
    const response = await axios.get(store.getters.getUrl + '/login', {
      params: {
        userEmail: email.value,
        password: password.value,
      },
    }).then((response) => {
      console.log(response.data);
      if(response.data.data!==null)
      {
        console.log('登录成功:', response.data);
        alert('登录成功！');
        // 保存用户信息到 Vuex 或本地存储
        store.commit('setUser', true);
        store.commit('setUserInfo', response.data.data);
        console.log('用户信息:', store.getters.getUserInfo);
        router.push('/displayUser');   // 跳转到登录页面

      }
      else 
      {
        alert('登录失败，请检查邮箱和密码');
      }

    }).catch((error) => {
      console.error('登录失败:', error);
      alert('登录失败，请检查邮箱和密码');
    });
};
</script>
  
  <style scoped>
  .login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f6f8fa;
  }
  
  .login-container {
    width: 400px;
    padding: 20px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .login-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #333;
  }
  
  .form-group {
    margin-bottom: 15px;
    text-align: left;
  }
  
  .form-group label {
    display: block;
    font-size: 14px;
    color: #555;
    margin-bottom: 5px;
  }
  
  .form-group input {
    width: 100%;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  .login-button {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    color: #fff;
    background-color: #409eff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .login-button:hover {
    background-color: #3078c6;
  }
  
  .register-link {
    margin-top: 15px;
    font-size: 14px;
    color: #555;
  }
  
  .register-link a {
    color: #409eff;
    text-decoration: none;
  }
  
  .register-link a:hover {
    text-decoration: underline;
  }
  </style>