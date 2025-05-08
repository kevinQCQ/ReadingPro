<template>
  <RouterLink
    :to="{
      path: `/books/${props.book.id}`,
      query: {
        author: props.book.author,
        title: props.book.title,
        cover: props.book.cover,
        detail: props.book.detail,
        type: props.book.type,
        content_url: props.book.content_url,
        publication_date: props.book.publication_date,
        publisher: props.book.publisher,
      },
    }"
    class="book-card"
  >
    <div class="book-cover-container">
      <img
        v-if="loaded"
        :src="props.book.cover"
        :alt="props.book.title"
        class="book-cover"
      />
      <div v-else class="placeholder">
        <p>加载中...</p>
      </div>
    </div>
    <div class="book-info">
      <h3 class="book-title">{{ book_title }}</h3>
    </div>
  </RouterLink>
</template>

<script setup>
import { defineProps, ref, onMounted } from 'vue';

const props = defineProps({
  book: {
    type: Object,
    required: true,
  },
});

const loaded = ref(false);
const book_title =ref(props.book.title);

function change_title() {
  let change_title = '';
  let flag = false;
  for (let i = 0; i < book_title.value.length; i++) {
    if (flag && book_title.value[i] == '.') break;
    if (flag) change_title += book_title.value[i];
    if (book_title.value[i] == '.') flag = !flag;
  }
  return change_title;
}

onMounted(() => {

  book_title.value = change_title();

  const img = new Image();
  img.src = props.book.cover;
  img.onload = () => {
    loaded.value = true;
  };
  img.onerror = () => {
    loaded.value = true;
    console.log(`图片加载失败: ${props.book.cover}`);
  };
});
</script>

<style scoped>
.book-card {
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s;
  display: inline-block; /* 让卡片并排显示 */
  /* margin: 10px; */
  width: 150px; /* 计算每个卡片的宽度 */
  vertical-align: top; /* 对齐顶部 */
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  text-align: center; /* 确保内容居中 */
}

.book-card:hover {
  transform: translateY(-5px);
}

.book-cover-container {
  width: 100%;
  height: 200px; /* 统一的高度 */
  position: relative;
  overflow: hidden;
  border-radius: 4px;
}

.book-cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* 裁剪图片以适应容器 */
  border-radius: 4px;
}

.placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
}

.book-info {
  /* margin: 10px; */
  /* padding: 10px; */
  text-align: center;
}

.book-title {
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>