<template>
  <div class="register-page">
    <div class="register-container">
      <h1 class="register-title">注册书舟全球</h1>
      <form @submit.prevent="handleRegister">
        <!-- 用户名 -->
        <div class="form-group">
          <label for="username">用户名</label>
          <input
            type="text"
            id="username"
            v-model="username"
            placeholder="请输入用户名"
            required
          />
        </div>

        <!-- 邮箱 -->
        <div class="form-group">
          <label for="email">邮箱</label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="请输入邮箱"
            required
          />
        </div>

        <!-- 密码 -->
        <div class="form-group">
          <label for="password">密码</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="请输入密码"
            required
          />
        </div>

        <!-- 验证码 -->
        <div class="form-group">
          <label for="verificationCode">验证码</label>
          <div class="verification-container">
            <input
              type="text"
              id="verificationCode"
              v-model="verificationCode"
              placeholder="请输入验证码"
              required
            />
            <button
              type="button"
              class="send-code-button"
              :disabled="isSending"
              @click="sendVerificationCode"
            >
              {{ isSending ? "发送中..." : "发送验证码" }}
            </button>
          </div>
        </div>

        <!-- 提交按钮 -->
        <button type="submit" class="register-button">注册</button>
      </form>

      <p class="login-link">
        已有账号？<RouterLink to="/login">立即登录</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const username = ref('');
const email = ref('');
const password = ref('');
const verificationCode = ref('');
const isSending = ref(false); // 控制发送验证码按钮的状态
const router = useRouter();
const store = useStore();

const validateInputs = () => {
  if (!username.value.trim()) {
    alert('用户名不能为空');
    return false;
  }
  if (!email.value.trim()) {
    alert('邮箱不能为空');
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    alert('请输入正确的邮箱格式');
    return false;
  }
  if (!password.value.trim()) {
    alert('密码不能为空');
    return false;
  }
  return true;
};

const sendVerificationCode = async () => {
  if (!validateInputs()) return;

  try {
    isSending.value = true; // 禁用按钮
    const response = await axios.post(store.getters.getUrl + '/email/send-verification', {
      email: email.value,
    });
    console.log('验证码发送成功:', response.data);
    alert('验证码已发送到您的邮箱，请查收！');
  } catch (error) {
    console.error('验证码发送失败:', error);
    alert('验证码发送失败，请检查邮箱是否正确。');
  } finally {
    isSending.value = false; // 恢复按钮状态
  }
};

const handleRegister = async () => {
  if (!validateInputs()) return;

  if (!verificationCode.value.trim()) {
    alert('验证码不能为空');
    return;
  }

  try {
    const response = await axios.post(store.getters.getUrl + '/email/verify-code', {
      username: username.value,
      email: email.value,
      password: password.value,
      verificationCode: verificationCode.value,
    });
    console.log('注册成功:', response.data);
    alert('注册成功！请登录。');
    router.push('/login'); // 跳转到登录页面
  } catch (error) {
    console.error('注册失败:', error);
    alert('注册失败，请检查输入信息或稍后重试。');
  }
};
</script>

<style scoped>
.register-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f6f8fa;
}

.register-container {
  width: 400px;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.register-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

.form-group label {
  display: block;
  font-size: 14px;
  color: #555;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.verification-container {
  display: flex;
  align-items: center; /* 垂直居中对齐 */
  gap: 10px; /* 输入框和按钮之间的间距 */
}

.send-code-button {
  white-space: nowrap; /* 防止文字换行 */
  padding: 10px;
  font-size: 14px;
  color: #fff;
  background-color: #409eff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.send-code-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}


.register-button {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  color: #fff;
  background-color: #409eff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.register-button:hover {
  background-color: #3078c6;
}

.login-link {
  margin-top: 15px;
  font-size: 14px;
  color: #555;
}

.login-link a {
  color: #409eff;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>