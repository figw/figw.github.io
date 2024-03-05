import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import 'element-plus/dist/index.css'
import './style.css'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import App from './App.vue'
import BaZi from './components/BaZi.vue'
import Home from './components/Home.vue'
import LiuYao from './components/LiuYao.vue'
import NotFound from './components/NotFound.vue'

const routes = [
    {
        path: '/',
        name: '主页',
        component: Home,
    },
    {
        path: '/bazi',
        name: '八字',
        component: BaZi,
    },
    {
        path: '/liuyao',
        name: '六爻',
        component: LiuYao,
    },
    {
        path: '/:pathMatch(.*)',
        component: NotFound
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

const app = createApp(App)

app.use(router)
app.use(ElementPlus, { locale: zhCn })
app.mount('#app')
