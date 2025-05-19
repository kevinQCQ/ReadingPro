<template>
  <div class="message-board">
    <h1 class="title">留言榜</h1>

    <!-- 留言输入框 -->
    <div class="message-input">
      <textarea
        v-model="newMessage"
        placeholder="请输入您的留言..."
        rows="4"
        class="textarea"
      ></textarea>
      <button @click="addMessage" class="submit-button">提交留言</button>
    </div>

    <!-- 留言列表 -->
    <div class="message-list">
      <h2 class="subtitle">留言列表</h2>
      <div v-if="messages.length > 0">
        <div  v-for="(message) in displayedMessages" :key="message.id" class="message-item">
            <div class="user-info">
              <img :src="'https://tse2-mm.cn.bing.net/th/id/OIP-C.ILB-Yvn8tnhbS4llcMYsygHaHX?cb=iwc2&rs=1&pid=ImgDetMain'" class="avatar" />
              <p class="username">{{ message.user_id }}</p>
            </div>

            <div class="message-content">
              <p class="content">{{ message.content }}</p>
              <p class="timestamp">时间: {{ message.time }}</p>
              <div class="actions">
                <div class="action-item" @click="likeMessage(message.id)">
                  <span class="icon" :class="{ liked: message.liked }">❤️</span>
                  <span class="count">{{ message.likes }}</span>
                </div>
                <div class="action-item" @click="toggleReply(message.id)">
                    <span class="count">回复</span>
                </div>
                <div class="action-item" @click="displaySonReply(message.id)">
                    <span v-if="message.showReplyList===false" class="count">展开...</span>
                    <span v-else class="count">收起...</span>
                </div>
                
              </div>
              <!-- 回复框 -->
              <div v-if="message.showReply" class="reply-box">
                <textarea
                  v-model="message.reply"
                  placeholder="请输入回复内容..."
                  rows="2"
                  class="textarea"
                ></textarea>
                <button @click="addReply(message.id)" class="submit-button">提交回复</button>
              </div>

              <!-- 回复列表 -->
              <div v-if="message.replies.length > 0 && message.showReplyList" class="replies">
                <div
                  v-for="(reply, index) in message.replies"
                  :key="index"
                  class="reply-item"
                >
                  <p class="reply-content">
                    <span class="reply-username">{{ reply.user_id }} 回复 {{ getParentId(reply.parent_id) }}:</span>
                    {{ reply.content }}
                  </p>
                  <p class="reply-timestamp">时间: {{ reply.time }}</p>
                </div>
              </div>
            </div>
        </div>
      </div>
      <div v-if="messages.length === 0" class="no-messages">
        <p>暂无留言，快来留下第一条吧！</p>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { ref } from 'vue';
import { onMounted } from 'vue';
import axios from 'axios';
import { useStore} from 'vuex';
import { computed } from 'vue';


// 定义响应式变量
const newMessage = ref(''); // 存储用户输入的留言
const messages = ref([]); // 存储所有留言
const store = useStore(); // 获取 Vuex store 实例

const displayedMessages = ref([]);

const topMessages = ()=>{
  return messages.value.filter((message) => message.parent_id === 'top');
};


// 页面加载时获取留言数据
onMounted(async () => {
    await getMessages();
    console.log("displayedMessages",displayedMessages.value);
    console.log("topMessages",topMessages());
});


// 获取留言
async function getMessages() {
  messages.value = []; // 清空留言列表
  displayedMessages.value = []; // 清空显示的留言列表
  await axios.get(store.getters.getUrl+'/messageBoard')
    .then((response) => {
      console.log("获取留言成功", response.data.data);

      for(let i=0;i<response.data.data.length;i++)
      {
        let addedMessage = {
          id: response.data.data[i].id,
          user_id: response.data.data[i].user_id,
          content: response.data.data[i].content,
          likes: response.data.data[i].likes,
          replies: [],
          showReply: false,
          reply: '',
          time: response.data.data[i].time,
          parent_id: response.data.data[i].parent_id,
          showReplyList:false,
          liked: false,
        };
        messages.value.unshift(addedMessage);
      }
    })
    .catch((error) => {
      console.error("获取留言失败", error);
    });
    displayedMessages.value = [...topMessages()];
}

// 添加留言
async function addMessage() {
  if (newMessage.value.trim() === '') {
    alert('留言内容不能为空！');
    return;
  }
  let query={
      content: newMessage.value,
      user_id: '匿名用户',
      time: new Date().toLocaleString(),
      parent_id: "top",
      numberOfSon: 0
  };
  console.log("query",query);
  await axios.post(store.getters.getUrl+'/messageBoard/addComment',query).then((response) => {
      console.log("留言成功", response.data);
      getMessages();
      
    }).catch((error) => {
      console.error("留言失败", error);
    });

  newMessage.value = ''; // 清空输入框
}


function addLike(id)
{
  axios.get(store.getters.getUrl+'/messageBoard/addLikes?id='+id).then((response) => {
    console.log("点赞成功", response.data);
  }).catch((error) => {
    console.error("点赞失败", error);
  });
}

function subLike(id)
{
  axios.get(store.getters.getUrl+'/messageBoard/subLikes?id='+id).then((response) => {
    console.log("取消点赞成功", response.data);
  }).catch((error) => {
    console.error("取消点赞失败", error);
  });
}

// 修改点赞逻辑
function likeMessage(id) {
  let index = messages.value.findIndex((message) => message.id === id);
  let message = messages.value[index];
  if (!message.liked) {
    addLike(id); // 调用点赞接口
    message.likes += 1; // 点赞数加1
    message.liked = true; // 标记为已点赞
  } else {
    subLike(id); // 调用取消点赞接口
    message.likes -= 1; // 点赞数减1
    message.liked = false; // 取消点赞
  }
}

// 显示/隐藏回复框
function toggleReply(id) {
  messages.value.forEach((message) => { 
    if(message.id === id){
      message.showReply = !message.showReply;
    }
  });
}

//找出user_id
function getParentId(id)
{
  console.log("id",id);
  console.log("messages.value",messages.value);
  let real_id=Number(id);
  for(let i=0;i<messages.value.length;i++)
  {
    if(messages.value[i].id===real_id)
    {
      return messages.value[i].user_id;
    }
  }
}


//展开回复
async function displaySonReply(id) {
  console.log("id",id);
  console.log("messages.value",messages.value);

  let index=messages.value.findIndex((message) => message.id === id);

  messages.value[index].replies = []; // 清空当前留言的回复列表
  messages.value[index].showReplyList = !messages.value[index].showReplyList;

  await axios.get(store.getters.getUrl+'/messageBoard/getReply?parent_id='+id).then((response) => {
    console.log("获取回复成功", response.data.data);
    for(let i=0;i<response.data.data.length;i++)
    {
      let addedMessage = {
        id: response.data.data[i].id,
        user_id: response.data.data[i].user_id,
        content: response.data.data[i].content,
        likes: response.data.data[i].likes,
        replies: [],
        showReply: false,
        reply: '',
        time: response.data.data[i].time,
        parent_id: response.data.data[i].parent_id,
        showReplyList:false,
        liked: false,
      };
      messages.value[index].replies.push(addedMessage);
    }
  }).catch((error) => {
    console.error("获取回复失败", error);
  });

  console.log("messages.value[index].replies",messages.value[index].replies);
}
  
// 添加回复
async function addReply(id) {
  let replyContent ;
  let index ;
  for(let i=0;i<messages.value.length;i++)
  {
    if(messages.value[i].id===id)
    {
      replyContent=messages.value[i].reply;
      index=i;
      break;
    }
  }
  if (replyContent === '') {
    alert('回复内容不能为空！');
    return;
  }
  let query={
      content: replyContent,
      user_id: '匿名用户',
      time: new Date().toLocaleString(),
      parent_id: messages.value[index].id,
      numberOfSon: 0
  };

  await axios.post(store.getters.getUrl+'/messageBoard/addComment',query).then((response) => {
      console.log("回复成功", response.data);

      let addedMessage = {
        id:response.data.data.id,
        user_id: query.user_id,
        content: query.content,
        likes: 0,
        replies: [],
        showReply: false,
        reply: '',
        time: query.time,
        parent_id: messages.value[index].id,
        showReplyList:false,
        liked: false,
      };
      
      console.log("addedMessage",addedMessage);

      messages.value.unshift(addedMessage);
    }).catch((error) => {
      console.error("回复失败", error);
  });

  for(let i=0;i<messages.value.length;i++)
  {
    if(messages.value[i].id===id)
    {
      messages.value[i].reply='';
      messages.value[i].showReply=false;
      break;
    }
  }
  await displaySonReply(messages.value[index].id); // 展开对应的留言的回复列表
}


</script>
  
<style scoped>

.top-message {
  background-color: #f0f8ff; /* 浅蓝色背景，突出显示 */
  border: 2px solid #409eff; /* 蓝色边框 */
  border-radius: 8px; /* 圆角 */
  padding: 10px; /* 内边距 */
  margin-bottom: 15px; /* 与其他元素的间距 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 添加阴影 */
}

.message-board {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  font-family: "Microsoft YaHei", Arial, sans-serif;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.message-input {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
  width:100%;
}

.textarea {
  width: 90%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  resize: none;
}

.submit-button {
  align-self: flex-end;
  padding: 8px 20px;
  font-size: 16px;
  color: white;
  background-color: #409eff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #3078c6;
}

.message-list {
  margin-top: 20px;
}

.subtitle {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

.message-item {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.user-info {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 10px;
  gap:10px;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.username {
  font-size: 14px;
  color: #555;
  text-align: center;
}

.message-content {
  flex: 1;
}

.content {
  font-size: 16px;
  color: #333;
  margin-bottom: 5px;
  margin-left: 10px;
}

.timestamp,
.reply-timestamp {
  font-size: 12px;
  color: #999;
  margin-bottom: 10px;
  margin-left: 10px;
}

.actions {
  display: flex;
  flex-direction: row; /* 垂直排列 */
  align-items: center;
  margin-left: 10px;
  gap: 10px; /* 按钮之间的间距 */
}

.action-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  color: #555;
  transition: color 0.3s ease;
  margin-top: 2px;
}

.action-item:hover {
  color: #ff4d4f; /* 鼠标悬停时的颜色，爱心为红色 */
}

.icon {
  font-size: 16px; /* 调整图标大小 */
  color: white; /* 默认白色 */
  filter: grayscale(100%) brightness(2); /* 默认白色 */
  transition: color 0.3s ease; /* 添加颜色过渡效果 */
}

.icon.liked {
  filter: none; /* 点赞后恢复原始颜色 */
}

.count {
  font-size: 12px; /* 数字或文字大小 */
}
  
.like-button,
.reply-button {
  padding: 5px 10px;
  font-size: 14px;
  color: white;
  background-color: #409eff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.like-button:hover,
.reply-button:hover {
  background-color: #3078c6;
}

.reply-box {
  margin-top: 10px;
}

.replies {
  margin-top: 10px;
  padding-left: 10px;
  border-left: 2px solid #ddd;
}

.reply-item {
  margin-bottom: 5px;
}

.reply-content {
  font-size: 14px;
  color: #555;
}

.reply-username {
  font-weight: bold;
  color: #333;
}
  </style>