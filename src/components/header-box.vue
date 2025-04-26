<template>
    <!-- 顶部导航栏 -->
    <el-header class="top-header">
      <div class="logo">
        <a href="/">首 页</a>
      </div>
      <div class="header-right">
        <el-button type="text" class="language-btn">简体</el-button>
        <div class="icons">
          <el-tooltip content="设置" placement="bottom">
            <el-icon><Setting /></el-icon>
          </el-tooltip>
          <el-tooltip content="通知" placement="bottom">
            <el-icon><Bell /></el-icon>
          </el-tooltip>
        </div>
        <el-button type="text" class="login-btn">登录</el-button>
        <el-button type="text" class="search-btn">
          <el-icon><Search /></el-icon>
        </el-button>
        <el-button circle class="menu-btn">
          <el-icon><Menu /></el-icon>
        </el-button>
      </div>
    </el-header>
</template>

<script setup>
import { Setting, Bell, Search, Menu } from '@element-plus/icons-vue';

</script>

<style scoped>
a{
  text-decoration: none;
}

.top-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.header-right {
  display: flex;
  align-items: center;
}

.language-btn, .login-btn, .search-btn {
  margin-right: 15px;
  color: #0066cc;
}

.icons {
  display: flex;
  align-items: center;
  margin-right: 15px;
}

.icons i {
  margin-left: 10px;
  cursor: pointer;
}

.menu-btn {
  margin-left: 10px;
}
</style>