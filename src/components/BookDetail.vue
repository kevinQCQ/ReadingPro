<template>
  <div class="bookInfo">
    <!-- 书籍封面 -->
    <div class="bookCover">
      <img :src="cover" alt="书籍封面" />
    </div>

    <!-- 书籍详细信息 -->
    <div class="bookDetails">
      <h1 class="bookTitle">{{ title }}</h1>
      <div class="bookAuthor">
        <span>作者: {{ author }}</span>
      </div>
      <div class="bookRating">
        <span>⭐ {{ bookRating }} / 5.0</span>
        <span>📝 {{ commentCount }} 条评论</span>
        <span>📖 纸质书</span>
      </div>
      <div class="bookQuote" v-if="bookQuote">
        <blockquote>“{{ bookQuote }}”</blockquote>
      </div>
      <div class="bookAttributes">
        <div class="attributeRow">
          <span class="attributeLabel">类型:</span>
          <span class="attributeValue">{{ type }}</span>
        </div>
        <div class="attributeRow">
          <span class="attributeLabel">出版日期:</span>
          <span class="attributeValue">{{ publication_date }}</span>
        </div>
        <div class="attributeRow">
          <span class="attributeLabel">出版商:</span>
          <span class="attributeValue">{{ publisher }}</span>
        </div>
        <div class="attributeRow">
          <span class="attributeLabel">简介:</span>
          <span class="attributeValue">{{ detail }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const bookId = route.params.id;

const props = defineProps({
  author: { type: String, required: true },
  type: { type: String, required: true },
  content_url: { type: String, required: true },
  cover: { type: String, required: true },
  publication_date: { type: String, required: true },
  detail: { type: String, required: true },
  publisher: { type: String, required: true },
  title: { type: String, required: true },
});

const bookRating = ref(4.5); // 示例评分
const commentCount = ref(120); // 示例评论数
const bookQuote = ref('天生一个仙人洞，无限风光在险峰'); // 示例引言

onMounted(() => {
  console.log(`加载书籍 ID: ${bookId}`);
});
</script>
<style scoped>
.bookInfo {
  display: flex;
  align-items: flex-start;
  width: 100%;
  max-width: 1200px;
  margin: 20px auto; /* 水平居中，减少外边距 */
  gap: 20px; /* 减少封面和详细信息之间的间距 */
  font-family: "Microsoft YaHei", Arial, sans-serif;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.bookCover img {
  width: 300px;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.bookDetails {
  flex: 1;
  text-align: left;
}

.bookTitle {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 5px; /* 减少标题和作者之间的间距 */
  color: #333;
}

.bookAuthor {
  font-size: 16px;
  color: #666;
  margin-bottom: 10px; /* 减少作者和评分之间的间距 */
}

.bookRating {
  display: flex;
  gap: 10px; /* 减少评分项之间的间距 */
  font-size: 14px;
  color: #888;
  margin-bottom: 10px; /* 减少评分和引言之间的间距 */
}

.bookQuote {
  font-style: italic;
  color: #555;
  margin-bottom: 15px; /* 减少引言和属性之间的间距 */
  padding-left: 10px;
  border-left: 4px solid #409eff;
}

.bookAttributes {
  display: flex;
  flex-direction: column;
  gap: 10px; /* 减少属性行之间的间距 */
}

.attributeRow {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #444;
}

.attributeLabel {
  font-weight: bold;
  color: #333;
}

.attributeValue {
  color: #666;
}
</style>