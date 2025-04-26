<template>
  <headerBox></headerBox>
  <div class="book-read">
    <div v-if="book">
      <div class="title-container">
        <h2 class="title">{{ book.title }}</h2>
      </div>
      <div class="book-content">
        <p>{{ bookContent }}</p>
      </div>
      <!-- 添加按钮组 -->
      <div class="button-group">
        <RouterLink :to="getPrevChapterPath()" class="chapter-button">前一章</RouterLink>
        <RouterLink :to="`/books/catalog/${bookId}`" class="chapter-button">返回目录</RouterLink>
        <RouterLink :to="getNextChapterPath()" class="chapter-button">下一章</RouterLink>
      </div>
      <RouterLink to="/books/1" class="back-button">返回书籍详情</RouterLink>
    </div>
    <div v-else>
      <p>加载中...</p>
    </div>
  </div>
  <InterestedBooks>
    <template #title>
      <h2 class="section-header">可能感兴趣的</h2>
    </template>
  </InterestedBooks>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import headerBox from '@/components/header-box.vue';
import InterestedBooks from '@/components/InterestedBooks.vue';

const route = useRoute();
const book = ref(null);
const bookContent = ref('这里是书籍的内容...'); // 模拟书籍内容

// 获取路由参数
const bookId = route.params.id;
onMounted(() => {
  const para = route.params.para;
  console.log(`加载书籍 ID: ${bookId}, 章节参数: ${para}`);
  
  // 在这里可以调用 API 获取书籍内容
  // 模拟数据
  book.value = {
    id: bookId,
    title: `书籍 ${bookId} 第${para}章`,
  };
});

// 获取前一章的路径
const getPrevChapterPath = () => {
  const currentPara = parseInt(route.params.para, 10);
  const prevPara = currentPara > 1 ? currentPara - 1 : 1; // 防止章节小于1
  return `/books/read/${route.params.id}/${prevPara}`;
};

// 获取下一章的路径
const getNextChapterPath = () => {
  const currentPara = parseInt(route.params.para, 10);
  const nextPara = currentPara + 1; // 假设没有章节上限，实际项目中可能需要根据数据判断
  return `/books/read/${route.params.id}/${nextPara}`;
};
</script>

<style scoped>
.book-read {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.title-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
}

.book-content {
  margin: 20px 0;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

/* 新增按钮组样式 */
.button-group {
  display: flex;
  justify-content: center;
  gap: 10px; /* 按钮之间的间距 */
  margin-top: 20px;
}

.chapter-button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #409eff;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-size: 14px;
}

.chapter-button:hover {
  background-color: #3078c6; /* 按钮悬停时的颜色 */
}

.back-button {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #409eff;
  color: white;
  text-decoration: none;
  border-radius: 4px;
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
</style>