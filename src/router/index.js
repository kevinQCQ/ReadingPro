// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import home from '@/views/home.vue'
import bookInfo from '@/views/bookInfo.vue'
import bookRead from '@/views/bookRead.vue'
import bookCatalog from '../views/bookCatalog.vue'
import searchBook from '@/views/searchBook.vue'
import messageBoard from '@/views/messageBoard.vue'
import login from '@/views/login.vue'
import register from '@/views/register.vue'
import dispalayUser from '@/views/displayUser.vue'



const routes = [
    {
        path: '/',
        name: 'home',
        component: home,
    },
    {
        path: '/books',
        name: 'bookInfo',
        component: bookInfo,
        props: true,
    },
    {
        path: '/books/read',
        name: 'bookRead',
        component: bookRead,
        props: true,

    },
    {
        path: '/books/catalog',
        name: 'bookCatalog',
        component: bookCatalog,
        props: true,
    },
    {
        path: '/searchBook',
        name: 'searchBook',
        component: searchBook,
        props: true,
    }
    ,{
        path: '/messageBoard',
        name: 'messageBoard',
        component: messageBoard,
        props: true,
    },
    {
        path: '/register',
        name: 'register',
        component: register,
        props: true,
    },
    {
        path: '/login',
        name: 'login',
        component: login,
        props: true,
    },
    {
        path: '/displayUser',
        name: 'displayUser',
        component: dispalayUser,
        props: true,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;