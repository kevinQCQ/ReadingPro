<template>
  <RouterLink :to="{
    path:'/books/${props.book.id}',
    query: {
      author: props.book.author,
      title: props.book.title,
      cover: props.book.cover,
      detail: props.book.detail,
      type: props.book.type,
      content_url: props.book.content_url,
      publication_date: props.book.publication_date,
      publisher: props.book.publisher,
    }
  }" class="book-card">
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
      <h3 class="book-title">{{ props.book.title }}</h3>
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

onMounted(() => {
  // console.log(props.book)
  // 模拟图片加载
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
}

.book-card:hover {
  transform: translateY(-5px);
}

.book-cover-container {
  width: 100%;
  height: 0;
  padding-bottom: 140%; /* 保持封面的宽高比 */
  position: relative;
  overflow: hidden;
}

.book-cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.book-info {
  margin-top: 10px;
  text-align: center;
}

.book-title {
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>