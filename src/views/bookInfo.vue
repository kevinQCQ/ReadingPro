<template>
  <headerBox></headerBox>
  <BookDetail :author=author :type=type :content_url=content_url :cover=cover :publication_date=publication_date :publisher=publisher :title=title :detail=detail></BookDetail>
  <div class="bookActions">
    <RouterLink :to="`/books/read/${bookId}/1`" class="actionButton">开始阅读</RouterLink>
    <button class="actionButton">添加到我的图书馆</button>
    <button class="actionButton">下载 EPUB，{{ bookFileSize }}</button>
    <RouterLink :to="`/books/catalog/${bookId}`" class="actionButton">目录</RouterLink>
  </div>
  <InterestedBooks>
    <template #title>
      <h2 class="section-header">可能感兴趣的</h2>
    </template>
  </InterestedBooks>

</template>

<script setup>
import headerBox from '@/components/header-box.vue';
import BookDetail from '@/components/BookDetail.vue';
import InterestedBooks from '@/components/InterestedBooks.vue';
import { useRoute } from 'vue-router';


// 目标页面通过route.query获取
const bookId = useRoute().params.id;  // 路径参数
const { author,type,content_url,cover,publication_date,publisher,title,detail} = useRoute().query; // 查询参数

function formatDate() {
  console.log(author,type,content_url,cover,publication_date,publisher,title);
}

formatDate();





</script>

<style scoped>
.bookActions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
  width: 100%; /* 使按钮栏宽度与信息栏一致 */
  justify-content: center; /* 水平居中按钮 */
}
.actionButton {
  width: 250px;
  padding: 15px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 100px;
  cursor: pointer;
  text-decoration: none; /* 移除链接下划线 */
  display: inline-block; /* 确保 RouterLink 和 button 一致 */
  text-align: center;
}
.actionButton:hover {
  background-color: #0056b3;
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