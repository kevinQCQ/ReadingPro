<template>
  <headerBox></headerBox>
  <BookDetail :author=this_author :type=this_type :content_url=this_content_url :cover=this_cover :publication_date=this_publication_date :publisher=this_publisher :title=this_title :detail=this_detail></BookDetail>
  <div class="bookActions">
    <RouterLink :to="{
      name: 'bookRead', 
      query: {
       id: 1,
       book_title: title, 
       chapter_path: content_url, 
       chapter_id: '1'
       }}" class="actionButton">开始阅读</RouterLink>
    <button class="actionButton">加入书架</button>
    <button class="actionButton">添加到我的图书馆</button>
    <button class="actionButton">下载 EPUB{{ bookFileSize }}</button>
    <button class="actionButton">目录</button>
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
import { onMounted } from 'vue';
import {ref} from 'vue';


// 目标页面通过route.query获取
const bookId = useRoute().params.id;  // 路径参数
const { author,type,content_url,cover,publication_date,publisher,title,detail} = useRoute().query; // 查询参数


const this_author=ref(author);
const this_type=ref(type);
const this_content_url=ref(content_url);
const this_cover=ref(cover);
const this_publication_date=ref(publication_date);
const this_publisher=ref(publisher);
const this_title=ref(title);
const this_detail=ref(detail);


onMounted(() => {
  // console.log("bookInfor 挂载")
  console.log("bookinfo:",author,type,content_url,cover,publication_date,publisher,title,useRoute().query);
  let change_title="";
  let flag=false;
  for(let i=0;i<title.length;i++){
    if(flag&&title[i]=='.')break
    if(flag)change_title+=title[i];
    if(title[i]==".")flag=!flag;
  }
  this_title.value=change_title;
  window.scrollTo({
    top: 0,
    behavior: "smooth", // 平滑滚动
  });
});

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
  width: 14%;
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