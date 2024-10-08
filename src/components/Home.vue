<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

let elInputCallback
let searchInputLast = ''
let suggestList = []
const router = useRouter()
const searchEngineConfig = [
    {
        name: 'bing',
        nameCN: '必应',
        favicon: 'https://www.bing.com/favicon.ico',
        search: 'https://cn.bing.com/search?q=',
    },
    {
        name: 'google',
        nameCN: '谷歌',
        favicon: 'https://www.google.cn/chrome/static/images/favicons/favicon-32x32.png',
        search: 'https://www.google.com.hk/search?q=',
    },
    {
        name: 'baidu',
        nameCN: '百度',
        favicon: 'https://www.baidu.com/favicon.ico',
        search: 'https://www.baidu.com/s?wd=',
    },
    {
        name: 'zhihu',
        nameCN: '知乎',
        favicon: 'https://static.zhihu.com/favicon.ico',
        search: 'https://www.zhihu.com/search?q=',
    },
    {
        name: 'bilibili',
        nameCN: '哔哩哔哩',
        favicon: 'https://www.bilibili.com/favicon.ico',
        search: 'https://search.bilibili.com/all?keyword=',
    },
]
const suggestApi = 'https://api.bing.com/qsonhs.aspx?type=cb&cb=window.bingSug&q='

const searchInput = ref('')

window.bingSug = function (data) {
    suggestList = []
    for (const i of (data && data['AS'] && data['AS']['Results']) || []) {
        suggestList.push(...i['Suggests'].map(j => new Object({ value: j['Txt'] }) || []))
    }
    suggestList = suggestList.slice(0, 5)
    elInputCallback && elInputCallback(suggestList)
}

function getSuggest(queryString, callback) {
    if (!queryString) return callback([])
    if (searchInputLast === queryString) return callback(suggestList)
    searchInputLast = queryString
    elInputCallback = callback
    const script = document.createElement('script')
    script.src = suggestApi + encodeURIComponent(queryString)
    document.head.appendChild(script)
}
function runSearch(searchEngineUrl) {
    const url = (searchEngineUrl || searchEngineConfig[0].search) + encodeURIComponent(searchInput.value)
    return window.open(url, '_blank')
}
</script>

<template>
  <div style="display:flex;justify-content:center;align-items:center;height:80vh">
    <div class="search">
      <el-autocomplete v-model="searchInput" :fetch-suggestions="getSuggest" @keyup.enter="runSearch()"
                       style="width:90%;max-width:600px" size="large" placement="top">
      </el-autocomplete>
      <br />
      <el-button class="btn" size="large" round v-for="i in searchEngineConfig" @click="runSearch(i.search)">
        <img :src="i.favicon" alt="" width="20px" />
        &nbsp;{{i.nameCN}}
      </el-button>
      <br /><br />
      <el-button class="btn" size="large" @click="router.push('/fireworks')">看烟花</el-button>
      <el-button class="btn" size="large" @click="router.push('/bazi')">八字排盘</el-button>
      <el-button class="btn" size="large" @click="router.push('/liuyao')">六爻装卦</el-button>
    </div>
  </div>
</template>

<style scoped>
.btn {
    margin-top: 20px;
}
.search {
    width: 100%;
    text-align: center;
}
</style>
