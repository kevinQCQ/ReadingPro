<template>
  <header class="bilibili-navbar">
    <div class="navbar-container">
      <!-- Logo -->
      <div class="navbar-logo">
        <RouterLink to="/" class="navbar-logo-text">书舟全球</RouterLink>
      </div>

      <!-- 导航链接 -->
      <nav class="navbar-links">
        <RouterLink to="/" class="navbar-link" :class="{ active: activeLink === '首页' }" @click="setActiveLink('首页')">首页</RouterLink>
        <RouterLink :to="{name: 'messageBoard'}" class="navbar-link" :class="{ active: activeLink === '留言榜' }" @click="setActiveLink('留言榜')">留言榜</RouterLink>
      </nav>

      <!-- 搜索框 -->
      <div class="navbar-search">
        <input type="text" v-model="searchQuery" placeholder="搜索内容..." />
        <button @click="handleSearch">搜索</button>
      </div>

      <!-- 用户操作 -->
      <div class="navbar-user">
        <template v-if="userInfo">
          <img :src="userInfo.avatar || defaultAvatar" class="navbar-avatar" />
          <span class="navbar-username">{{ userInfo.userName }}</span>
        </template>
        <template v-else>
          <RouterLink to="/login" class="navbar-login">登录</RouterLink>
          <RouterLink to="/register" class="navbar-register">注册</RouterLink>
        </template>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useStore } from 'vuex';

const activeLink = ref('首页');
const searchQuery = ref('');
const router = useRouter();
const store = useStore();

const setActiveLink = (link) => {
  activeLink.value = link;
};

const handleSearch = () => {
  router.push({
    name: 'searchBook',
    query: { query: searchQuery.value }
  });
};

// 获取用户信息
const userInfo = computed(() => store.getters.getUserInfo); // 或 store.state.userInfo
const defaultAvatar = 'https://tse1-mm.cn.bing.net/th/id/OIP-C.g5M-iZUiocFCi9YAzojtRAAAAA?cb=iwp2&rs=1&pid=ImgDetMain';
</script>

<style scoped>
/* ...已有样式... */
.navbar-user {
  display: flex;
  align-items: center;
  gap: 10px;
}
.navbar-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}
.navbar-username {
  color: #409eff;
  font-weight: bold;
  margin-left: 4px;
}

.bilibili-navbar {
  /* position: fixed; */
  top: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px 20px;
}

.navbar-logo-text {
  font-family: "Microsoft YaHei", Arial, sans-serif;
  font-size: 24px;
  font-weight: bold;
  color: #409eff;
  text-decoration: none;
  transition: color 0.3s ease, transform 0.3s ease;
}

.navbar-logo-text:hover {
  color: #3078c6;
  transform: scale(1.1);
}

.navbar-links {
  display: flex;
  gap: 20px;
}

.navbar-link {
  font-size: 16px;
  color: #333;
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 4px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.navbar-link:hover {
  background-color: #f5f5f5;
}

.navbar-link.active {
  background-color: #409eff;
  color: white;
}

.navbar-search {
  display: flex;
  align-items: center;
  gap: 10px;
}

.navbar-search input {
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.navbar-search button {
  padding: 5px 10px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.navbar-search button:hover {
  background-color: #3078c6;
}

.navbar-user {
  display: flex;
  gap: 10px;
}

.navbar-login,
.navbar-register {
  font-size: 14px;
  color: #409eff;
  text-decoration: none;
  padding: 5px 10px;
  border: 1px solid #409eff;
  border-radius: 4px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.navbar-login:hover,
.navbar-register:hover {
  background-color: #409eff;
  color: white;
}
</style>