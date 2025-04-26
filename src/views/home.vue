<template>
  <div class="z-library-app">
    <!-- 顶部导航栏 -->
    <headerBox></headerBox>

    <!-- 主要内容区域 -->
    <div class="main-content">
      <!-- Logo和标语 -->
      <div class="logo-section">
        <img src="../assets/logo.zlibrary.svg" alt="" class="logo-img">
        <p class="tagline">您通往知识和文化的门户。每个人都可以使用。</p>
      </div>

      <!-- 搜索功能区域 -->
      <div class="search-section">
        <el-input
          v-model="searchQuery"
          placeholder="按书名、作者、ISBN、DOI、出版社、MD5等搜索..."
          class="search-input"
          @keyup.enter.native="handleSearch"
        >
        </el-input>
        <el-button type="primary" class="search-button" @click="handleSearch">
          <el-icon><Search /></el-icon>
        </el-button>
      </div>

      <!-- 项目信息 -->
      <div class="project-info">
        <p>官方Z-Library项目 - 免费访问电子书和文章</p>
      </div>

      <!-- 最受欢迎书籍 -->
      <div class="popular-books">
        <InterestedBooks>
          <template #title>
            <h2 class="section-header">最受欢迎</h2>
          </template>
        </InterestedBooks>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { Search } from '@element-plus/icons-vue';
import headerBox from '@/components/header-box.vue';
import InterestedBooks from '@/components/InterestedBooks.vue';
import { useBooksStore } from '@/store/books';

const searchQuery = ref('');
const booksStore = useBooksStore();

// 模拟书籍数据
onMounted(() => {
  booksStore.fetchBooks();
});

const books = computed(() => booksStore.books);

const handleSearch = () => {
  console.log('搜索:', searchQuery.value);
  // 这里可以添加搜索逻辑
};
</script>

<style scoped>
.z-library-app {
  font-family: Arial, sans-serif;
  max-width: 1800px;
  margin: 0 auto;
  padding: 10px;
}

.logo a {
  color: #0066cc;
  text-decoration: none;
  font-weight: bold;
}


/* Logo和标语 */
.main-content {
  text-align: center;
  margin-top: 50px;
}

.logo-section {
  margin-bottom: 40px;
}

.logo-img {
  width: 300px; /* 调整Logo的宽度 */
  height: auto; /* 保持图片比例 */
}

.tagline {
  color: #666;
  font-size: 14px;
  margin-top: 10px;
}

/* 搜索功能区域 */
.search-section {
  max-width: 800px;
  margin: 0 auto 40px;
  display: flex;
}

.search-input {
  flex-grow: 1;
}

.search-button {
  background-color: #409eff;
  border-color: #409eff;
  color: white;
}

/* 项目信息 */
.project-info {
  color: #666;
  font-size: 14px;
  margin-bottom: 30px;
}

/* 最受欢迎书籍 */
.popular-books {
  margin-top: 40px;
  width: 1000px;
  margin: 0 auto;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
  border-bottom: 3px solid #abbdef;
  color: #0066cc;
  font-size: 18px;
  font-weight: normal;
}

.books-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
}

.books-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  width: 1000px;
  margin: 0 auto;
}
</style>