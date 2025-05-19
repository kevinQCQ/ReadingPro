import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import router from './router';
import { createPinia } from 'pinia';
import store from './store/url'

const app = createApp(App);
const pinia = createPinia();

app.use(ElementPlus);
app.use(router);
app.use(pinia);
app.use(store);

// 全局注册 ElementPlus 组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

app.mount('#app');