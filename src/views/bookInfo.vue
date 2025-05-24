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
       fileName: fileName,
       chapter_id: '1'
       }}" class="actionButton">开始阅读</RouterLink>
    <button class="actionButton">加入书架</button>
    <button class="actionButton">添入图书馆</button>
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
import { onMounted ,watch} from 'vue';
import {ref} from 'vue';


// 目标页面通过route.query获取
const bookId = useRoute().params.id;  // 路径参数
const { author,type,content_url,cover,publication_date,publisher,title,detail,fileName} = useRoute().query; // 查询参数


const this_author=ref(author);
const this_type=ref(type);
const this_content_url=ref(content_url);
const this_cover=ref(cover);
const this_publication_date=ref(publication_date);
const this_publisher=ref(publisher);
const this_title=ref(title);
const this_detail=ref(detail);

const route = useRoute(); // 获取路由信息

// 更新数据的方法
function updateBookInfo() {
  const { author, type, content_url, cover, publication_date, publisher, title, detail ,fileName} = route.query;

  this_author.value = author || '';
  this_type.value = type || '';
  this_content_url.value = content_url || '';
  this_cover.value = cover || '';
  this_publication_date.value = publication_date || '';
  this_publisher.value = publisher || '';
  this_title.value = title || '';
  this_detail.value = detail || '';
}


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

  updateBookInfo();
  window.scrollTo({
    top: 0,
    behavior: 'smooth', // 平滑滚动
  });
});

// 监听路由变化
watch(
  () => route.query,
  () => {
    updateBookInfo();
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // 平滑滚动
    });
  }
);

</script>

<style scoped>
.bookActions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
  width: 100%;
  justify-content: center;
  flex-wrap: wrap; /* 小屏时自动换行 */
}

.actionButton {
  min-width: 90px;         /* 统一最小宽度 */
  padding: 10px 0;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 100px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  font-size: 16px;
  transition: background 0.3s;
  margin-bottom: 8px;
  box-sizing: border-box;
}

.actionButton:hover {
  background-color: #0056b3;
}

@media (max-width: 600px) {
  .bookActions {
    gap: 6px;
  }
  .actionButton {
    min-width: 70px;
    font-size: 13px;
    padding: 8px 0;
    border-radius: 60px;
  }
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