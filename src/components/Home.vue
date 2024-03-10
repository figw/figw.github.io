<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchEngineConfig = [
    {
        name: 'bing',
        nameCN: '必应',
        favicon: 'favicon-bing.ico',
        search: 'https://cn.bing.com/search?q=',
    },
    {
        name: 'google',
        nameCN: '谷歌',
        favicon: 'favicon-google.ico',
        search: 'https://www.google.com.hk/search?q=',
    },
    {
        name: 'baidu',
        nameCN: '百度',
        favicon: 'favicon-baidu.ico',
        search: 'https://www.baidu.com/s?wd=',
    },
    {
        name: 'zhihu',
        nameCN: '知乎',
        favicon: 'favicon-zhihu.ico',
        search: 'https://www.zhihu.com/search?q=',
    },
    {
        name: 'bilibili',
        nameCN: '哔哩哔哩',
        favicon: 'favicon-bilibili.ico',
        search: 'https://search.bilibili.com/all?keyword=',
    },
]
const suggestApi = 'https://api.bing.com/qsonhs.aspx?q='
const suggestMapper = i => i['AS']['Results']['Suggests'].map(j => new Object({ value: j['Txt'] }))

const searchInput = ref('')

function getSuggests(queryString, callback) {
    if (!queryString) return callback([])
    callback([]) // todo
}
function openUrl(url) {
    return window.open(url, '_blank')
}
</script>

<template>
  <el-autocomplete v-model="searchInput" :fetch-suggestions="getSuggests" style="width:500px"></el-autocomplete>
  <br /><br />
  <el-button v-for="i in searchEngineConfig" @click="openUrl(i.search + searchInput)">
    <img :src="'/src/assets/'+i.favicon" alt="" width="20px" />
    &nbsp;{{i.nameCN}}
  </el-button>
  <br /><br />
  <el-button @click="router.push('/bazi')">八字排盘</el-button>
  <el-button @click="router.push('/liuyao')">六爻装卦</el-button>
</template>
