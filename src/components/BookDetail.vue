<template>
  <div class="bookInfo">
    <div class="bookCover">
      <img :src="cover" alt="cover">
    </div>
    <div class="bookDetails">
      <h1>{{ title }}</h1>
      <div class="bookAuthor">
        <span>{{ author }}</span>
      </div>
      <div class="bookRating">
        <span>⭐ {{ bookRating }} / 5.0</span>
        <span>📝 {{ commentCount }} comments</span>
        <span>📖 纸质书</span>
      </div>
      <div class="bookQuote">
        <p>{{  }}</p>
      </div>
      <div class="bookAttributes">
        <div class="attributeRow"  :key="index">
          <span>类型:</span>
          <span>{{type}}</span>
        </div>
        <div class="attributeRow" :key="index">
          <span>出版日期:</span>
          <span>{{ publication_date }}</span>
        </div>
        <div class="attributeRow" :key="index">
          <span>出版商:</span>
          <span>{{ props.publisher }}</span>
        </div>
        <div class="attributeRow" :key="index"></div>
        <div class="attributeRow" :key="index">
          <span>{{ props.detail }}</span>
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
  author: {
    type: String,
    required: true,
  },
  type: { 
    type: String,
    required: true,
  },
  content_url: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    required: true,
  },
  publication_date: {
    type: String,
    required: true,
  },
  detail: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
})



onMounted(() => {
  // 获取路由参数
  // console.log(`加载书籍 ID: ${bookId}`);
  console.log(props.detail)
})

const bookCover = ref('https://s3proxy.cdn-zlib.sk/covers300/collections/genesis/25728e84dca6ab1a24fd76ac46fc6bdb759cdfc3fecd00053e5c3a72e64fcdfc.jpg');
const bookTitle = ref('毛泽东选集一至七卷');
const bookAuthor = ref('毛泽东');
const bookRating = ref(5.0);
const commentCount = ref(142);
const bookQuote = ref('天生一个仙人洞，无限风光在险峰');
const bookAttributes = ref([
  { label: '类别:', value: 'Society, Politics & Philosophy' },
  { label: '年:', value: '1991' },
  { label: '语言:', value: 'Chinese' },
  { label: 'ISBN 10:', value: '7010009147' },
  { label: '系列:', value: '毛泽东选集' },
  { label: 'IPFS:', value: 'CID，CID Blake2b' },
  { label: '内容类型:', value: '图书' },
  { label: '出版商:', value: '人民出版社' },
  { label: '页数:', value: '340' },
  { label: 'ISBN 13:', value: '9787010009148' },
  { label: '文件:', value: 'EPUB，2.78 MB' }
]);
const bookFileSize = ref('2.78 MB');
</script>

<style scoped>
.bookInfo {
  display: flex;
  align-items: flex-start;
  width: 1000px;
  margin: 30px auto; /* 水平居中 */
  gap: 20px;
}
.bookCover img {
  width: 280px;
  height: 400px;
}
.bookDetails {
  flex: 1;
  text-align: left; /* 左对齐文本 */
}
.bookRating,
.bookAttributes {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.attributeRow {
  flex: 0 0 40%; /* 每行四个信息 */
  display: flex;
  justify-content: space-between;
}
</style>