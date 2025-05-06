<template>
  <div class="header">
    <select v-model="yao[5]" @change="main()">
      <option disabled value="-1">第一次</option>
      <option v-for="i in 4" :value="i-1">{{i-1}} 字</option>
    </select>
    <select v-model="yao[4]" @change="main()" :disabled="yao[5]<0">
      <option disabled value="-1">第二次</option>
      <option v-for="i in 4" :value="i-1">{{i-1}} 字</option>
    </select>
    <select v-model="yao[3]" @change="main()" :disabled="yao[4]<0">
      <option disabled value="-1">第三次</option>
      <option v-for="i in 4" :value="i-1">{{i-1}} 字</option>
    </select>
    <select v-model="yao[2]" @change="main()" :disabled="yao[3]<0">
      <option disabled value="-1">第四次</option>
      <option v-for="i in 4" :value="i-1">{{i-1}} 字</option>
    </select>
    <select v-model="yao[1]" @change="main()" :disabled="yao[2]<0">
      <option disabled value="-1">第五次</option>
      <option v-for="i in 4" :value="i-1">{{i-1}} 字</option>
    </select>
    <select v-model="yao[0]" @change="main()" :disabled="yao[1]<0">
      <option disabled value="-1">第六次</option>
      <option v-for="i in 4" :value="i-1">{{i-1}} 字</option>
    </select>
  </div>
  <div style="display:flex; margin-left: 10px" v-show="yao[0]>=0">
    <div>
      <p>{{benGuaName[0] === benGuaName[1] ? benGuaName.substring(2) : benGuaName}}&emsp;</p>
      <p v-for="(j, i) in 6">
        {{ shiYing[i] || '&emsp;' }}&nbsp;
        {{ benGuaLiuQin[i] }}&nbsp;
        {{ benGua[i] ? '▅▅▅▅▅' : '▅▅&emsp;▅▅' }}&nbsp;
        {{ benGuaNaJia[i] }}&nbsp;
        {{ yao[i] === 0 ? '〇' : (yao[i]===3?'✖':'&emsp;') }}&nbsp;
      </p>
    </div>
    <div>
      <p>{{bianGuaName[0] === bianGuaName[1] ? bianGuaName.substring(2) : bianGuaName}}&emsp;</p>
      <p v-for="(j, i) in 6">
        {{ yao[i]===0 || yao[i]===3 ? bianGuaLiuQin[i] : '&emsp;&emsp;' }}&nbsp;
        {{ bianGua[i] ? '▅▅▅▅▅' : '▅▅&emsp;▅▅' }}&nbsp;
        {{ bianGuaNaJia[i] }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { BA_GUA_2_YAO, BA_GUA_2_ALIAS, GUA_64, WU_XING } from '../assets/constant.js'

const benGua = ref([])
const benGuaLiuQin = ref([])
const benGuaNaJia = ref([])
const benGuaName = ref('')
const bianGua = ref([])
const bianGuaLiuQin = ref([])
const bianGuaNaJia = ref([])
const bianGuaName = ref('')
const shiYing = ref(['', '', '', '', '', ''])
const yao = ref([-1, -1, -1, -1, -1, -1])

function main() {
    benGua.value = []
    bianGua.value = []
    shiYing.value = ['', '', '', '', '', '']
    for (const i of yao.value) {
        if (i === -1) return
        else if (i === 0) { benGua.value.push(1); bianGua.value.push(0) }
        else if (i === 1) { benGua.value.push(0); bianGua.value.push(0) }
        else if (i === 2) { benGua.value.push(1); bianGua.value.push(1) }
        else if (i === 3) { benGua.value.push(0); bianGua.value.push(1) }
    }
    const benShangGua = BA_GUA_2_YAO[benGua.value.slice(0, 3).join('')]
    const benXiaGua = BA_GUA_2_YAO[benGua.value.slice(3, 6).join('')]
    const bianShangGua = BA_GUA_2_YAO[bianGua.value.slice(0, 3).join('')]
    const bianXiaGua = BA_GUA_2_YAO[bianGua.value.slice(3, 6).join('')]
    const guaGongIndex = GUA_64.findIndex(i => i.indexOf(BA_GUA_2_ALIAS[benShangGua] + BA_GUA_2_ALIAS[benXiaGua]) === 0)
    const guaGongWuXing = WU_XING[GUA_64[guaGongIndex - guaGongIndex % 8][0]]
    switch (guaGongIndex % 8) {
        case 0: shiYing.value[0] = '世'; shiYing.value[3] = '应'; break
        case 1: shiYing.value[3] = '世'; shiYing.value[0] = '应'; break
        case 2: shiYing.value[1] = '世'; shiYing.value[4] = '应'; break
        case 3: shiYing.value[3] = '世'; shiYing.value[0] = '应'; break
        case 4: shiYing.value[2] = '世'; shiYing.value[5] = '应'; break
        case 5: shiYing.value[5] = '世'; shiYing.value[2] = '应'; break
        case 6: shiYing.value[4] = '世'; shiYing.value[1] = '应'; break
        case 7: shiYing.value[2] = '世'; shiYing.value[5] = '应'; break
    }
    benGuaName.value = GUA_64.find(i => i.indexOf(BA_GUA_2_ALIAS[benShangGua] + BA_GUA_2_ALIAS[benXiaGua]) === 0)
    bianGuaName.value = GUA_64.find(i => i.indexOf(BA_GUA_2_ALIAS[bianShangGua] + BA_GUA_2_ALIAS[bianXiaGua]) === 0)
    benGuaNaJia.value = [NA_JIA[benShangGua][5], NA_JIA[benShangGua][4], NA_JIA[benShangGua][3], NA_JIA[benXiaGua][2], NA_JIA[benXiaGua][1], NA_JIA[benXiaGua][0]]
    bianGuaNaJia.value = [NA_JIA[bianShangGua][5], NA_JIA[bianShangGua][4], NA_JIA[bianShangGua][3], NA_JIA[bianXiaGua][2], NA_JIA[bianXiaGua][1], NA_JIA[bianXiaGua][0]]
    benGuaLiuQin.value = benGuaNaJia.value.map(i => LIU_QIN[guaGongWuXing][i[2]])
    bianGuaLiuQin.value = bianGuaNaJia.value.map(i => LIU_QIN[guaGongWuXing][i[2]])
}

const LIU_QIN = {
  '木': { '木': '兄弟', '火': '子孙', '土': '妻财', '金': '官鬼', '水': '父母' },
  '火': { '木': '父母', '火': '兄弟', '土': '子孙', '金': '妻财', '水': '官鬼' },
  '土': { '木': '官鬼', '火': '父母', '土': '兄弟', '金': '子孙', '水': '妻财' },
  '金': { '木': '妻财', '火': '官鬼', '土': '父母', '金': '兄弟', '水': '子孙' },
  '水': { '木': '子孙', '火': '妻财', '土': '官鬼', '金': '父母', '水': '兄弟' },
}
const NA_JIA = {
  '乾': ['甲子水', '甲寅木', '甲辰土', '壬午火', '壬申金', '壬戌土'],
  '坎': ['戊寅木', '戊辰土', '戊午火', '戊申金', '戊戌土', '戊子水'],
  '艮': ['丙辰土', '丙午火', '丙申金', '丙戌土', '丙子水', '丙寅木'],
  '震': ['庚子水', '庚寅木', '庚辰土', '庚午火', '庚申金', '庚戌土'],
  '巽': ['辛丑土', '辛亥水', '辛酉金', '辛未土', '辛巳火', '辛卯木'],
  '离': ['己卯木', '己丑土', '己亥水', '己酉金', '己未土', '己巳火'],
  '坤': ['乙未土', '乙巳火', '乙卯木', '癸丑土', '癸亥水', '癸酉金'],
  '兑': ['丁巳火', '丁卯木', '丁丑土', '丁亥水', '丁酉金', '丁未土'],
}
</script>

<style scoped>
.header {
    select, button, span {
        margin: 10px;
        font-size: 18px;
    }
}

p {
    color: black;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
}
</style>
