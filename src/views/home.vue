<template>
  <div class="z-library-app">
    <!-- 顶部导航栏 -->
    <headerBox></headerBox>

    <!-- 网络文学、言情、武侠、历史、悬疑推理、奇幻、科幻、传说、神话、寓言、传记、戏剧、散文、诗歌、长篇小说、短篇小说、中篇小说 -->
    <!-- 分类导航栏 -->
    <nav class="category-nav">
      <ul class="category-list">
        <li
          v-for="category in categories"
          :key="category"
          class="category-item"
          :class="{ active: selectedCategory === category }"
          @click="filterBooks(category)"
        >
          {{ category }}
        </li>
      </ul>
    </nav>

    <!-- 主要内容区域 -->
    <div class="main-content">
      <!-- Logo和标语 -->
      <div class="logo-section">
        <p class="tagline">您通往知识和文化的门户。每个人都可以使用。</p>
        <p class="tagline">当前全站共{{bookNumber}}本图书</p>
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
import headerBox from '@/components/header-box.vue';
import InterestedBooks from '@/components/InterestedBooks.vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const searchQuery = ref('');
const router = useRouter();
const bookNumber = ref(0); // 用于存储书籍数量

// 模拟书籍数据
onMounted(() => {
  axios.get('http://121.40.60.94:8088/libraryList/getNumber')
    .then(response => {
      bookNumber.value = response.data.data;
    })
    .catch(error => {
      console.error('获取书籍数量失败:', error);
    });
});

const books = computed(() => booksStore.books);

// 分类列表
const categories = [
  '网络文学', '言情', '武侠', '历史', '悬疑推理', '奇幻', '科幻',
  '传说', '神话', '寓言', '传记', '戏剧', '散文', '诗歌',
  '长篇小说', '短篇小说', '中篇小说'
];

const selectedCategory = ref(''); // 当前选中的分类

// 筛选书籍
function filterBooks(category) {
  selectedCategory.value = category; // 更新选中的分类
  console.log(`筛选分类: ${category}`);
  // 在这里可以添加筛选逻辑，例如根据分类从后端获取数据

  router.push({
    name: 'bookCatalog',
    query:{
      type: category // 将分类作为查询参数传递
    }
  })
}

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

.category-nav {
  background-color: #f5f5f5;
  padding: 10px 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.category-list {
  display: flex;
  flex-wrap: wrap; /* 允许换行 */
  justify-content: center;
  gap: 10px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-item {
  font-family: "Microsoft YaHei", Arial, sans-serif;
  display: inline-block; /* 确保文字水平排列 */
  white-space: normal; /* 确保文字正常换行 */
  writing-mode: horizontal-tb; /* 确保文字水平书写 */
  text-emphasis: center; /* 确保文字居中对齐 */
  font-size: 14px;
  font-weight: bold;
  color: #409eff;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 4px;
  transition: background-color 0.3s ease, color 0.3s ease;
  max-width: 100px; /* 限制分类项的最大宽度 */
  word-break: break-word; /* 长单词换行 */
  overflow-wrap: break-word; /* 支持换行 */
}

.category-item:hover {
  background-color: #409eff;
  color: white;
}

.category-item.active {
  background-color: #3078c6;
  color: white;
}

/* Logo和标语 */
.main-content {
  text-align: center;
  margin-top: 20px;
}

.logo-section {
  margin-bottom: 15px;
}

.logo-img {
  width: 300px; /* 调整Logo的宽度 */
  height: auto; /* 保持图片比例 */
}

.tagline {
  color: #666;
  font-size: 11px;
  margin-top: 6px;
}

/* 项目信息 */
.project-info {
  color: #666;
  font-size: 14px;
  margin-bottom: 30px;
}

/* 最受欢迎书籍 */
.popular-books {
  margin-top: 10px;
  width: 100%;
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