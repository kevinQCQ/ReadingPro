<template>
  <div class="listmain">
    <div class="catalog-title">目录</div>
    <div class="chapter-row" v-for="row in chapterRows" :key="row.key">
      <RouterLink v-for="chapterNum in row.chapters" :key="chapterNum" :to="`/books/read/${bookId}/${chapterNum}`" class="chapter-link">
        第{{ chapterNum }}章
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const bookId = route.params.id;
const chapters = ref([]);

// 模拟获取章节数据
const fetchChapters = () => {
  chapters.value = Array.from({ length: 50 }, (_, i) => i + 1);
};

onMounted(() => {
  fetchChapters();
});

// 计算属性，每行获取三个章节
const chapterRows = computed(() => {
  return chapters.value.chunked(2).map((row, index) => ({
    key: index,
    chapters: row
  }));
});

// 扩展数组，添加chunked方法
Array.prototype.chunked = function(chunkSize) {
  const chunks = [];
  for (let i = 0; i < this.length; i += chunkSize) {
    chunks.push(this.slice(i, i + chunkSize));
  }
  return chunks;
};
</script>

<style scoped>
.listmain {
  width: 800px; /* 设置最大宽度 */
  margin: 0 auto; /* 水平居中 */
  overflow: hidden;
  padding-top: 10px; /* 标题与边框之间的间距 */
}

.catalog-title {
  font-size: 28px;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 10px; /* 标题与章节列表之间的间距 */
  border-bottom: 2px solid #007bff; /* 目录顶部边框 */
}

.chapter-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px; /* 每行之间的间距 */
}

.chapter-link {
  flex: 1;
  padding: 0 10px;
  line-height: 36px;
  border-bottom: 1px dashed #CCC;
  font-size: 14px;
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  box-sizing: border-box;
  color: #007bff;
  text-decoration: none;
}

.chapter-link:hover {
  color: #0056b3;
}
</style>