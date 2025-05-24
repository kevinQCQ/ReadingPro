<template>
  <div class="interested-books">
    <slot name="title">默认标题</slot>
    <div v-if="loading" class="loading-animation">加载中<span class="dots">{{ dots }}</span></div>

    <div class="books-grid">
      <BookItem v-for="book in displayedBooks" :key="book.id" :book="book" />
    </div>
    <div class="load-more-container">
      <div class="load-more-button" @click="loadBooks" :class="{ loading: loading }">加载更多...</div>
    </div>
  </div>
</template>

<script setup>
import BookItem from './BookItem.vue';
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useStore} from 'vuex';

const store=useStore();
const displayedBooks = ref([]);
const getBack=ref([]);
const page=ref(0);
const size=ref(30);
const loading = ref(false);
const dots = ref(""); // 用于显示点的数量

// 动态更新点的数量
setInterval(() => {
  if (loading.value) {
    dots.value = dots.value.length < 3 ? dots.value + "." : "";
  }
}, 500);


async function getList() {
  loading.value = true; // 开始加载
  let cur_params={
    page:page.value,
    size:size.value
  };
  const res=await axios({
    url: store.getters.getUrl + '/libraryList',
    method: 'GET',
    params: cur_params
  });
  console.log("res",res.data.data.content);
  getBack.value.push(...res.data.data.content);
  page.value=page.value+1;
  loading.value = false; // 加载完成
}

// 初始化显示前30本书
onMounted(async () => {
    loading.value = true; // 开始加载
    console.log("onMounted");
    await getList();
    console.log("getBack",getBack.value);
    for(let i=0;i<30;i++)
    {
        let cur=getBack.value[i];
        displayedBooks.value.unshift({id:i, author:cur.author, type:cur.type, content_url:cur.content_url, cover:cur.cover_image_url, publication_date:cur.publication_date, publisher:cur.publisher, title:cur.title, detail:cur.summary ,fileName:cur.fileName}  )
    }
    loading.value = false; // 加载完成
});

async function loadBooks() {
  loading.value = true; // 开始加载
  console.log("loadBooks");
  await getList();
  console.log("getBack",getBack.value);

  const startIndex = (page.value-1) * size.value;
  const endIndex = startIndex + size.value;
  console.log("startIndex",startIndex,"endIndex",endIndex);

  for(let i=startIndex;i<endIndex;i++)  
  {
      let cur=getBack.value[i];
      console.log("cur",cur);
      displayedBooks.value.push({id:i, author:cur.author, type:cur.type, content_url:cur.content_url, cover:cur.cover_image_url, publication_date:cur.publication_date, publisher:cur.publisher, title:cur.title, detail:cur.summary ,fileName:cur.fileName}  )
  }
  loading.value = false; // 加载完成
  // console.log("displayedBooks",displayedBooks.value);
};

</script>

<style scoped>


.books-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  /* gap: 15px; */
  width: 100%;      /* 让网格宽度自适应父容器 */
  margin: 0 auto;
  box-sizing: border-box;
  justify-items: center; /* 让网格居中 */
}

@media (max-width: 1200px) {
  .books-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 800px) {
  .books-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
}
@media (max-width: 100px) {
  .books-grid {
    grid-template-columns: 1fr;
    gap: 6px;
  }
}

.interested-books {
  margin-top: 40px;
  width: 100%;
  margin: 0 auto;
}

.loading-animation {
  font-size: 18px;
  color: #0066cc;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.dots {
  font-weight: bold;
  margin-left: 5px;
}



.load-more-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.load-more-button {
  padding: 8px 20px;
  background: transparent;
  border: none;
  color: #0066cc;
  font-size: 18px;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  align-items: center;
}

.load-more-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.load-more-button.loading {
  color: #ccc;
  cursor: not-allowed;
}

.arrow {
  margin-left: 5px;
}
</style>