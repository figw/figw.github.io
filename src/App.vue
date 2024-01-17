<template>
    <div v-if="!Object.values(isComponentsShow).find(i => i)">
        <h1>主页施工中...</h1>
        <el-button @click="switchComponentsShow('BaZi')">八字</el-button>
        <el-button @click="switchComponentsShow('LiuYao')">六爻</el-button>
    </div>
    <div v-else style="position: fixed; z-index: 99">
        <button @click="switchComponentsShow()">主页</button>
    </div>
    <BaZi v-if="isComponentsShow.BaZi"></BaZi>
    <LiuYao v-if="isComponentsShow.LiuYao"></LiuYao>
</template>

<script setup>
import { ref } from 'vue'
import BaZi from './BaZi.vue'
import LiuYao from './LiuYao.vue'

const isComponentsShow = ref({ BaZi: true, LiuYao: false })

function switchComponentsShow (onName) {
    for (const i in isComponentsShow.value) isComponentsShow.value[i] = (i === onName)
}
</script>
