<template>
  <div class="interested-books">
    <slot name="title">默认标题</slot>
    <div class="books-grid">
      <BookItem v-for="book in displayedBooks" :key="book.id" :book="book" />
    </div>
    <div class="load-more-container" v-if="hasMoreBooks">
      <div class="load-more-button" @click="loadMoreBooks" :class="{ loading: loading }">
        <span v-if="!loading">加载更多</span>
        <span v-else>加载中...</span>
        <span class="arrow" v-if="!loading">↓</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import BookItem from './BookItem.vue';
import { ref, computed, onMounted } from 'vue';
import { useBooksStore } from '@/store/books';
import axios from 'axios';


// const booksStore = useBooksStore();
// const books = computed(() => booksStore.books);

const allBooks = ref([]);

const displayedBooks = ref([]);
const currentPage = ref(1);
const booksPerPage = 3;
const loading = ref(false);

const getBack=ref([]);



async function getList() {
  const res=await axios({
    url: 'http://121.40.60.94:8088/libraryList',
    method: 'GET',
  })
  // console.log(res.data.data.content);
  getBack.value.push(...res.data.data.content);
}

// 初始化显示前10本书
onMounted(async () => {
  

    console.log("onMounted");
    await getList();
    // console.log(getBack._rawValue[0]);

    

    for(let i=0;i<5;i++)
    {
        let cur=getBack._rawValue[i];
        // console.log(cur)
        displayedBooks.value.unshift({id:i, author:cur.author, type:cur.type, content_url:cur.content_url, cover:cur.cover_image_url, publication_date:cur.publication_date, publisher:cur.publisher, title:cur.title, detail:cur.summary}  )
    }
    // console.log(displayedBooks.value);

    for(let i=0;i<getBack._rawValue.length;i++)
    {
        let cur=getBack._rawValue[i];
        allBooks.value.unshift({id:i, author:cur.author, type:cur.type, content_url:cur.content_url, cover:cur.cover_image_url, publication_date:cur.publication_date, publisher:cur.publisher, title:cur.title, detail:cur.summary});
    }
    console.log(allBooks.value);
    
  
    // booksStore.fetchBooks();
    // loadBooks();
});

const loadBooks = () => {
  
  const startIndex = (currentPage.value - 1) * booksPerPage;
  const endIndex = startIndex + booksPerPage;
  const booksToDisplay = allBooks.value.slice(startIndex, endIndex);
  displayedBooks.value = [...displayedBooks.value, ...booksToDisplay];
};

const loadMoreBooks = () => {
  if (loading.value) return;
  loading.value = true;

  setTimeout(() => {
    currentPage.value++;
    loadBooks();
    loading.value = false;
  }, 1000); // 模拟网络延迟
};

const hasMoreBooks = computed(() => {
  return currentPage.value * booksPerPage < allBooks.value.length;
});
</script>

<style scoped>
.interested-books {
  margin-top: 40px;
  width: 1000px;
  margin: 0 auto;
}

.books-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
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