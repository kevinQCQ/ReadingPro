<template>
    <headerBox></headerBox>
    <div class="search-results">
      <h2 class="result-title">{{ resultTitle }}</h2>
      <div v-if="searchResults.length > 0" class="books-list">
        <div v-for="book in searchResults" :key="book.id" class="book-item" @click="handleClick(book)">
          <img :src="book.cover_image_url" alt="书籍封面" class="book-cover" />
          <div class="book-info">
            <h3 class="book-title">{{ book.title }}</h3>
            <p class="book-author">作者: {{ book.author }}</p>
          </div>
        </div>
      </div>
      <div v-else class="no-results">
        <p>没有找到相关书籍。</p>
      </div>
    </div>
</template>
  


<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import headerBox from '@/components/header-box.vue';
import { useRoute ,useRouter} from 'vue-router';

// 定义响应式变量
const route = useRoute(); // 获取路由信息
const searchResults = ref([]); // 存储搜索结果
const searchQuery = ref(''); // 存储搜索关键词
const resultTitle = ref(''); // 存储结果标题
const type =ref(route.query.type); // 存储书籍类型
const router = useRouter(); // 获取路由实例

// 模拟从后端获取搜索结果
async function fetchSearchResults() {
  try {
    // 假设从路由中获取搜索关键词
    searchQuery.value = type.value; // 这里可以替换为动态获取的关键词

    // 模拟请求后端接口
    const response = await axios.get('http://121.40.60.94:8088/search/searchByType', {
      params: { type: searchQuery.value },
    });

    // 处理返回数据
    searchResults.value = response.data.data || [];
    resultTitle.value = `搜索结果: ${searchQuery.value}`;
  } catch (error) {
    console.error('获取搜索结果失败:', error);
    resultTitle.value = '搜索结果获取失败';
  }
}

// 在组件挂载时获取搜索结果
onMounted(() => {
  fetchSearchResults();
});

function handleClick(cur_book)
{
    router.push({
        name: 'bookInfo', 
        query:{
            author: cur_book.author,
            type: cur_book.type,
            content_url: cur_book.content_url,
            cover: cur_book.cover_image_url,
            publication_date: cur_book.publication_date,
            publisher: cur_book.publisher,
            title: cur_book.title,
            detail: cur_book.detail
        }
    })
}

</script>


<style scoped>
.search-results {
  padding: 20px;
  font-family: "Microsoft YaHei", Arial, sans-serif;
}

.result-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}

.books-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 每行显示 4 本书 */
  gap: 20px;
}

.book-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  transition: box-shadow 0.3s ease;
}

.book-item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.book-cover {
  width: 120px;
  height: 160px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 10px;
}

.book-info {
  text-align: center;
}

.book-title {
  font-size: 16px;
  font-weight: bold;
  margin: 0;
  color: #333;
}

.book-author {
  font-size: 14px;
  color: #666;
  margin-top: 5px;
}

.no-results {
  text-align: center;
  font-size: 18px;
  color: #999;
  margin-top: 20px;
}
</style>