<template>
  <headerBox></headerBox>
  <div class="book-read">
    <div>
      <div class="title-container">
        <h2 class="title">{{ real_title }}</h2>
      </div>
      <div class="book-content">
        <p>你好，欢迎来到阅读页面！</p>
        <div>
          <div class="content-title">
              <h2 class="chapter-title">第{{ my_chapter_id }}章</h2>
          </div>
          <div>
              <h3 v-for="(content,index) in content_arr" :key="index">{{ content }}</h3>
          </div>
        </div>
      </div>
      <!-- 添加按钮组 -->
      <div class="button-group">
        <button v-if="my_chapter_id.value!=1" @click="getPrevChapterPath" class="chapter-button">前一章</button>
        <!-- <button :to="`/books/catalog/${bookId}`" class="chapter-button">返回目录</button> -->
        <button @click="getNextChapterPath()" class="chapter-button">下一章</button>
      </div>
      <RouterLink to="/books/1" class="back-button">返回书籍详情</RouterLink>
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
import { useRoute ,useRouter } from 'vue-router';
import headerBox from '@/components/header-box.vue';
import InterestedBooks from '@/components/InterestedBooks.vue';
import axios from 'axios'

let route = useRoute();

const content_arr=ref([])
const my_book_title=ref(route.query.book_title)
const my_chapter_path=ref(route.query.chapter_path)
const my_chapter_id=ref(route.query.chapter_id)   
const real_title=ref(route.query.book_title)  

onMounted(async() => {
  console.log("get_Novel_Chapter", await get_Novel_Chapter());
  real_title.value=await change_title();
  content_arr.value=[...await get_Novel_Chapter()];
  console.log("content_arr.value",content_arr.value);
});

// 获取前一章的路径
const getPrevChapterPath = async() => {
  my_chapter_id.value=parseInt(my_chapter_id.value)-1;
  content_arr.value=await get_Novel_Chapter();
  console.log("content_arr.value",content_arr.value)
};

async function change_title()
{
    let cur="";
    let flag=false;
    for(let i=0;i<real_title.value.length;i++){
        if(flag&&real_title[i]=='.')break;
        if(flag)cur+=real_title.value[i];
        if(real_title.value[i]==".")flag=!flag;
    }
    return cur;
}

async function get_Novel_Chapter()
{
    let cur_content=[];
    const cur_params={
        book_title:encodeURI(my_book_title.value),
        chapter_path:encodeURI(my_chapter_path.value),
        chapter_id:encodeURI("第"+my_chapter_id.value+"章")
    };
    
    await axios.get('http://121.40.60.94:8088/library/novelChapter',{params:cur_params}).then(
        (res) => {
            for(let i=0;i<res.data.data.length;i++)
            {
                cur_content.push(res.data.data[i]);
            }
        }
    ).catch((err)=>{console.log(err)});
    console.log("cur_content",cur_content);
    return cur_content;
}

// 获取下一章的路径
const getNextChapterPath = async () => {
  my_chapter_id.value=parseInt(my_chapter_id.value)+1;
  content_arr.value=await get_Novel_Chapter();
  console.log("content_arr.value",content_arr.value)
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