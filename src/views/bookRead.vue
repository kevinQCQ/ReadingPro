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
          <div v-if="isLoading" class="loading-spinner"></div>
          <div v-if="isLoading" class="loading-text">加载中...</div>
          <div v-if="!isLoading" class="content-title">
              <h2 class="chapter-title">第{{ my_chapter_id }}章</h2>
          </div>
          <div>
              <h3 v-for="(content,index) in content_arr" :key="index">{{ content }}</h3>
          </div>
        </div>
      </div>
      <!-- 添加按钮组 -->
      <div class="button-group">
        <button v-if="my_chapter_id!=1" @click="getPrevChapterPath" class="chapter-button">前一章</button>
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
const isLoading = ref(false); // 用于控制加载状态


onMounted(async() => {
  isLoading.value=true;
  console.log("get_Novel_Chapter", await get_Novel_Chapter());
  real_title.value=await change_title();
  content_arr.value=[...await get_Novel_Chapter()];
  console.log("content_arr.value",content_arr.value);
  isLoading.value=false;
  window.scrollTo({
    top: 0,
    behavior: "smooth", // 平滑滚动
  });
});

// 获取前一章的路径
const getPrevChapterPath = async() => {
  isLoading.value=true;
  my_chapter_id.value=parseInt(my_chapter_id.value)-1;
  content_arr.value=await get_Novel_Chapter();
  console.log("content_arr.value",content_arr.value)
  isLoading.value=false;
  // 滚动到顶部
  window.scrollTo({
    top: 0,
    behavior: "smooth", // 平滑滚动
  });
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
  isLoading.value=true;
  my_chapter_id.value=parseInt(my_chapter_id.value)+1;
  content_arr.value=await get_Novel_Chapter();
  console.log("content_arr.value",content_arr.value)
  isLoading.value=false;
  // 滚动到顶部
  window.scrollTo({
    top: 0,
    behavior: "smooth", // 平滑滚动
  });
};
</script>

<style scoped>
.book-read {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.loading-spinner {
  border: 4px solid #f3f3f3; /* Light grey */
  border-top: 4px solid #409eff; /* Blue */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 20px auto; /* 居中 */
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading-text {
  text-align: center;
  font-size: 16px;
  color: #409eff; /* 蓝色 */
  margin-top: 10px; /* 上边距 */
}

.chapter-title
{
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px; /* 上边距 */
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

.book-content h3 {
  font-family: "Microsoft YaHei", Arial, sans-serif; /* 使用易读的字体 */
  font-size: 18px; /* 字体大小 */
  line-height: 1.8; /* 行高，增加阅读舒适度 */
  color: #333; /* 深灰色，减少视觉疲劳 */
  text-align: justify; /* 两端对齐，提升排版效果 */
  margin-bottom: 16px; /* 每段之间的间距 */
}

.book-content {
  font-family: "Microsoft YaHei", Arial, sans-serif; /* 默认字体 */
  font-size: 16px; /* 默认字体大小 */
  line-height: 1.8; /* 默认行高 */
  color: #333; /* 默认字体颜色 */
  background-color: #fdfdfd; /* 背景颜色，柔和的白色 */
  padding: 20px; /* 内边距 */
  border-radius: 8px; /* 圆角 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加轻微阴影 */
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
  background-color: #409eff; /* 按钮背景颜色 */
  color: white; /* 按钮文字颜色 */
  text-decoration: none;
  border: none; /* 去掉边框 */
  border-radius: 8px; /* 圆角 */
  font-size: 16px; /* 字体大小 */
  font-weight: bold; /* 字体加粗 */
  cursor: pointer; /* 鼠标悬停时显示手型 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 添加阴影 */
  transition: all 0.3s ease; /* 添加过渡效果 */
}

.chapter-button:hover {
  background-color: #3078c6; /* 悬停时的背景颜色 */
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15); /* 悬停时的阴影 */
  transform: translateY(-2px); /* 悬停时的轻微上移效果 */
}

.chapter-button:active {
  background-color: #1e5fa4; /* 点击时的背景颜色 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* 点击时的阴影 */
  transform: translateY(0); /* 点击时恢复位置 */
}


.back-button {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #409eff;
  color: white;
  text-decoration: none;
  border: none; /* 去掉边框 */
  border-radius: 8px; /* 圆角 */
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.back-button:hover {
  background-color: #3078c6;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.back-button:active {
  background-color: #1e5fa4;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transform: translateY(0);
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