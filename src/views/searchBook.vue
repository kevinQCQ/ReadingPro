<template>
<div class="search-book">
    <h1 class="search-title">🔍 搜索结果</h1>
    <div v-if="books.length > 0" class="books-list" >
    <div v-for="(book , index) in books" :key="index" class="book-item" @click="handleClick(index)">
        <img :src="book.cover_image_url" alt="书籍封面" class="book-cover" />
        <div class="book-info">
        <h3 class="book-title">{{ book.title }}</h3>
        <p class="book-author">作者: {{ book.author }}</p>
        </div>
    </div>
    </div>
    <div v-else class="no-results">
    <p>没有查找到书籍...</p>
    </div>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute , useRouter} from 'vue-router';
import axios from 'axios';

const route = useRoute(); // 获取路由信息
const books = ref([]); // 存储搜索结果
const router = useRouter(); // 获取路由实例

onMounted(async () => {
try {
    const response = await axios.get('http://121.40.60.94:8088/search/', {
    params: {
        query: route.query.query, // 获取查询参数
    },
    });
    books.value = response.data.data || []; // 将返回的数据赋值给 books
} catch (error) {
    console.error('搜索失败:', error);
}
});

function handleClick(index) {
    let cur_book=books.value[index];
    console.log("index",index);
    console.log("cur_book",cur_book);
    router.push({
        name: 'bookInfo', 
        params:{
            id: 1
        },

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
    });
}


</script>

<style scoped>
.search-book {
    max-width: 1000px; /* 增加宽度 */
    margin: 0 auto;
    padding: 20px;
    font-family: "Microsoft YaHei", Arial, sans-serif;
}

.search-title {
    text-align: center;
    margin-bottom: 30px;
    font-size: 32px; /* 增大字体 */
    font-weight: bold;
    color: #409eff; /* 使用蓝色提升视觉效果 */
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2); /* 添加文字阴影 */
}

.books-list {
    display: flex;
    flex-direction: column;
    gap: 20px; /* 每本书之间的间距 */
}

.book-item {
    display: flex;
    align-items: center;
    padding: 15px; /* 增加内边距 */
    border: 1px solid #ddd;
    border-radius: 10px;
    background-color: #f9f9f9;
    transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.book-item:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15); /* 增强悬停效果 */
    transform: scale(1.02); /* 悬停时略微放大 */
}

.book-cover {
    width: 100px; /* 增大图片宽度 */
    height: 140px; /* 增大图片高度 */
    object-fit: cover;
    border-radius: 8px;
    margin-right: 20px;
}

.book-info {
    flex: 1;    
}

.book-title {
    font-size: 22px; /* 增大标题字体 */
    font-weight: bold;
    margin: 0;
    color: #333;
}

.book-author {
    font-size: 16px; /* 增大作者字体 */
    color: #666;
    margin-top: 8px;
}

.no-results {
    text-align: center;
    margin-top: 30px;
    font-size: 18px;
    color: #999;
}
</style>