<template>
  <div class="user-profile">
    <div class="profile-header">
      <img :src="'https://tse1-mm.cn.bing.net/th/id/OIP-C.g5M-iZUiocFCi9YAzojtRAAAAA?cb=iwp2&rs=1&pid=ImgDetMain'" alt="头像" class="avatar" />
      <div class="profile-info">
        <h1 class="nickname">{{ user.userName }}</h1>
        <p class="bio">{{ user.bio }}</p>
        <div class="tags">
          <span v-for="tag in user.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
      </div>
    </div>

    <div class="profile-stats">
      <div class="stat-item">
        <span class="stat-label">邮箱:  </span>
        <span class="stat-value">{{ user.userEmail }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">个人简介</span>
        <span class="stat-value">{{ user.summary }}</span>
      </div>
    </div>

    <div class="profile-actions">
      <button class="edit-button" @click="toggleEdit">{{ isEditing ? '取消编辑' : '编辑' }}</button>
    </div>

    <transition name="fade">
      <div v-if="isEditing" class="edit-form">
        <div class="form-group">
          <label for="nickname">昵称</label>
          <input type="text" id="nickname" v-model="user.userName" />
        </div>
        <div class="form-group">
          <label for="email">邮箱</label>
          <input type="text" id="nickname" v-model="user.userEmail" />
        </div>
        <div class="form-group">
          <label for="bio">简介</label>
          <textarea id="bio" v-model="user.bio"></textarea>
        </div>
        <div class="form-group">
          <label for="tags">个人标签</label>
          <input type="text" id="tags" v-model="newTag" @keyup.enter="addTag" />
          <div class="tag-list">
            <span v-for="tag in user.tags" :key="tag" class="tag">
              {{ tag }} <button class="tag-remove" @click="removeTag(tag)">×</button>
            </span>
          </div>
        </div>
        <button class="save-button" @click="saveChanges">保存</button>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref ,computed} from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const user = computed(() => store.getters.getUserInfo);

const isEditing = ref(false);
const newTag = ref('');

const toggleEdit = () => {
  isEditing.value = !isEditing.value;
};

const saveChanges = () => {
  isEditing.value = false;
  alert('用户信息已更新！');
};

const addTag = () => {
  if (newTag.value.trim() !== '' && !user.value.tags.includes(newTag.value.trim())) {
    user.value.tags.push(newTag.value.trim());
    newTag.value = '';
  }
};

const removeTag = (tag) => {
  const index = user.value.tags.indexOf(tag);
  if (index !== -1) {
    user.value.tags.splice(index, 1);
  }
};
</script>

<style scoped>
.user-profile {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 60px;
  margin-right: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.profile-info {
  flex: 1;
}

.nickname {
  font-size: 28px;
  font-weight: bold;
  color: #333;
}

.bio {
  font-size: 16px;
  color: #666;
  margin-top: 5px;
}

.tags {
  margin-top: 10px;
}

.tag {
  display: inline-block;
  background-color: #f0f0f0;
  color: #333;
  padding: 4px 8px;
  margin-right: 8px;
  border-radius: 4px;
  font-size: 14px;
}

.profile-stats {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.stat-label {
  font-size: 14px;
  color: #666;
}

.profile-actions {
  text-align: center;
  margin-bottom: 20px;
}

.edit-button {
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #409eff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.edit-button:hover {
  background-color: #3078c6;
}

.edit-form {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 12px;
  margin-top: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-size: 16px;
  color: #555;
  margin-bottom: 5px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
}

.save-button {
  width: 100%;
  padding: 10px;
  font-size: 18px;
  color: #fff;
  background-color: #409eff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.save-button:hover {
  background-color: #3078c6;
}

.tag-remove {
  background-color: transparent;
  border: none;
  color: #999;
  font-size: 16px;
  cursor: pointer;
}

.tag-remove:hover {
  color: #333;
}

/* 动画效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>