<template>
  <div class="z-library-app">
    <!-- 顶部导航栏 -->
    <headerBox></headerBox>

    <!-- 分类导航栏 -->
    <nav class="category-nav">
      <ul class="category-list">
        <li
          class="category-item"
          :class="{ active: selectedCategory === '爱情' }"
          @click="filterBooks('爱情')"
        >
          爱情
        </li>
        <li
          class="category-item"
          :class="{ active: selectedCategory === '成长' }"
          @click="filterBooks('成长')"
        >
          成长
        </li>
        <li
          class="category-item"
          :class="{ active: selectedCategory === '战争' }"
          @click="filterBooks('战争')"
        >
          战争
        </li>
        <li
          class="category-item"
          :class="{ active: selectedCategory === '社会与阶级' }"
          @click="filterBooks('社会与阶级')"
        >
          社会与阶级
        </li>
        <li
          class="category-item"
          :class="{ active: selectedCategory === '人性' }"
          @click="filterBooks('人性')"
        >
          人性
        </li>
        <li
          class="category-item"
          :class="{ active: selectedCategory === '自由与束缚' }"
          @click="filterBooks('自由与束缚')"
        >
          自由与束缚
        </li>
        <li
          class="category-item"
          :class="{ active: selectedCategory === '死亡与永生' }"
          @click="filterBooks('死亡与永生')"
        >
          死亡与永生
        </li>
        <li
          class="category-item"
          :class="{ active: selectedCategory === '自然与环境' }"
          @click="filterBooks('自然与环境')"
        >
          自然与环境
        </li>
        <li
          class="category-item"
          :class="{ active: selectedCategory === '历史与文化' }"
          @click="filterBooks('历史与文化')"
        >
          历史与文化
        </li>
        <li
          class="category-item"
          :class="{ active: selectedCategory === '宗教与信仰' }"
          @click="filterBooks('宗教与信仰')"
        >
          宗教与信仰
        </li>
        <li
          class="category-item"
          :class="{ active: selectedCategory === '科技与未来' }"
          @click="filterBooks('科技与未来')"
        >
          科技与未来
        </li>
        <li
          class="category-item"
          :class="{ active: selectedCategory === '自我发现' }"
          @click="filterBooks('自我发现')"
        >
          自我发现
        </li>
      </ul>
    </nav>

    <!-- 主要内容区域 -->
    <div class="main-content">
      <!-- Logo和标语 -->
      <div class="logo-section">
        
        <p class="tagline">您通往知识和文化的门户。每个人都可以使用。</p>
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

.category-nav {
  background-color: #f5f5f5;
  padding: 10px 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.category-list {
  display: flex;
  justify-content: center;
  gap: 20px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-item {
  font-family: "Microsoft YaHei", Arial, sans-serif;
  display: inline-block; /* 确保文字水平排列 */
  white-space: normal; /* 确保文字正常换行 */
  writing-mode: horizontal-tb; /* 确保文字水平书写 */
  font-size: 14px;
  font-weight: bold;
  color: #409eff;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 4px;
  transition: background-color 0.3s ease, color 0.3s ease;
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
  font-size: 14px;
  margin-top: 10px;
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