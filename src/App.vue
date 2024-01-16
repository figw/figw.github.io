<template>
    <el-button @click="switchComponentsShow('BaZi')">八字</el-button>
    <el-button @click="switchComponentsShow('LiuYao')">六爻</el-button>
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
