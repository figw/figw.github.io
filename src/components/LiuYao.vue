<template>
  <el-row justify="center" v-show="yao[0]<0">
    <el-col>
      <p class="pFont" @click="dialogMark=5; dialogVisible=true"            >第一次{{yao[5]<0 ? '' : '：'+yao[5]+' 字'}}</p>
      <p class="pFont" @click="dialogMark=4; yao[5]<0||(dialogVisible=true)">第二次{{yao[4]<0 ? '' : '：'+yao[4]+' 字'}}</p>
      <p class="pFont" @click="dialogMark=3; yao[4]<0||(dialogVisible=true)">第三次{{yao[3]<0 ? '' : '：'+yao[3]+' 字'}}</p>
      <p class="pFont" @click="dialogMark=2; yao[3]<0||(dialogVisible=true)">第四次{{yao[2]<0 ? '' : '：'+yao[2]+' 字'}}</p>
      <p class="pFont" @click="dialogMark=1; yao[2]<0||(dialogVisible=true)">第五次{{yao[1]<0 ? '' : '：'+yao[1]+' 字'}}</p>
      <p class="pFont" @click="dialogMark=0; yao[1]<0||(dialogVisible=true)">第六次{{yao[0]<0 ? '' : '：'+yao[0]+' 字'}}</p>
    </el-col>
  </el-row>
  <el-dialog v-model="dialogVisible" width="80%" align-center>
    <el-row justify="center">
      <el-col>
        <p class="pFont" @click="yao[dialogMark]=0; dialogVisible=false; dialogMark===0&&main()">0 字</p>
        <p class="pFont" @click="yao[dialogMark]=1; dialogVisible=false; dialogMark===0&&main()">1 字</p>
        <p class="pFont" @click="yao[dialogMark]=2; dialogVisible=false; dialogMark===0&&main()">2 字</p>
        <p class="pFont" @click="yao[dialogMark]=3; dialogVisible=false; dialogMark===0&&main()">3 字</p>
      </el-col>
    </el-row>
  </el-dialog>
  <el-row justify="center" v-show="yao[0]>=0">
    <el-col>
      <p class="pFont">{{benGuaName.slice(3)}}</p>
      <p class="pFont" v-for="(j, i) in 6">{{ benGuaLiuQin[i] + '&emsp;' + (shiYing[i]||'&emsp;') + '&emsp;' + (benGua[i]?'▅▅▅▅▅':'▅▅&emsp;▅▅') + (false?'&emsp;'+benGuaNaJia[i]:'') + '&emsp;' + (yao[i]===0?'〇':(yao[i]===3?'✖':'&emsp;')) }}</p>
    </el-col>
    <el-col>
      <p class="pFont">{{bianGuaName.slice(3)}}&emsp;&emsp;</p>
      <p class="pFont" v-for="(j, i) in 6">{{ (yao[i]===0||yao[i]===3)?bianGuaLiuQin[i]:'&emsp;&emsp;' + '&emsp;' + (bianGua[i]?'▅▅▅▅▅':'▅▅&emsp;▅▅') + '&emsp;' + bianGuaNaJia[i] }}</p>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref } from 'vue'
import { WU_XING } from '../assets/constant.js'

const gua8 = {
    '111': '乾', '010': '坎', '100': '艮', '001': '震', '110': '巽', '101': '离', '000': '坤', '011': '兑'
}
const gua64 = [
    '乾乾-乾卦', '乾巽-天风姤', '乾艮-天山遁', '乾坤-天地否', '巽坤-风地观', '艮坤-山地剥', '离坤-火地晋', '离乾-火天大有',
    '坎坎-坎卦', '坎兑-水泽节', '坎震-水雷屯', '坎离-水火既济', '兑离-泽火革', '震离-雷火丰', '坤离-地火明夷', '坤坎-地水师',
    '艮艮-艮卦', '艮离-山火贲', '艮乾-山天大畜', '艮兑-山泽损', '离兑-火泽睽', '乾兑-天泽履', '巽兑-风泽中孚', '巽艮-风山渐',
    '震震-震卦', '震坤-雷地豫', '震坎-雷水解', '震巽-雷风恒', '坤巽-地风升', '坎巽-水风井', '兑巽-泽风大过', '兑震-泽雷随',
    '巽巽-巽卦', '巽乾-风天小畜', '巽离-风火家人', '巽震-风雷益', '乾震-天雷无妄', '离震-火雷噬嗑', '艮震-山雷颐', '艮巽-山风蛊',
    '离离-离卦', '离艮-火山旅', '离巽-火风鼎', '离坎-火水未济', '艮坎-山水蒙', '巽坎-风水涣', '乾坎-天水讼', '乾离-天火同人',
    '坤坤-坤卦', '坤震-地雷复', '坤兑-地泽临', '坤乾-地天泰', '震乾-雷天大壮', '兑乾-泽天夬', '坎乾-水天需', '坎坤-水地比',
    '兑兑-兑卦', '兑坎-泽水困', '兑坤-泽地萃', '兑艮-泽山咸', '坎艮-水山蹇', '坤艮-地山谦', '震艮-雷山小过', '震兑-雷泽归妹',
]
const benGua = ref([])
const benGuaLiuQin = ref([])
const benGuaNaJia = ref([])
const benGuaName = ref('')
const bianGua = ref([])
const bianGuaLiuQin = ref([])
const bianGuaNaJia = ref([])
const bianGuaName = ref('')
const dialogMark = ref()
const dialogVisible = ref(false)
const shiYing = ref(['', '', '', '', '', ''])
const yao = ref([-1, -1, -1, -1, -1, -1])

function main() {
    for (const i of yao.value) {
        if (i === 0)      { benGua.value.push(1); bianGua.value.push(0) }
        else if (i === 1) { benGua.value.push(0); bianGua.value.push(0) }
        else if (i === 2) { benGua.value.push(1); bianGua.value.push(1) }
        else if (i === 3) { benGua.value.push(0); bianGua.value.push(1) }
    }
    const benShangGua = gua8[benGua.value.slice(0, 3).join('')]
    const benXiaGua = gua8[benGua.value.slice(3, 6).join('')]
    const bianShangGua = gua8[bianGua.value.slice(0, 3).join('')]
    const bianXiaGua = gua8[bianGua.value.slice(3, 6).join('')]
    const guaGongIndex = gua64.findIndex(i => i.indexOf(benShangGua + benXiaGua) === 0)
    const guaGongWuXing = WU_XING[gua64[guaGongIndex - guaGongIndex % 8][0]]
    switch (guaGongIndex % 8) {
        case 0: shiYing.value[0] = '世'; shiYing.value[3] = '应'; break
        case 1: shiYing.value[5] = '世'; shiYing.value[2] = '应'; break
        case 2: shiYing.value[4] = '世'; shiYing.value[1] = '应'; break
        case 3: shiYing.value[3] = '世'; shiYing.value[0] = '应'; break
        case 4: shiYing.value[2] = '世'; shiYing.value[5] = '应'; break
        case 5: shiYing.value[1] = '世'; shiYing.value[4] = '应'; break
        case 6: shiYing.value[2] = '世'; shiYing.value[5] = '应'; break
        case 7: shiYing.value[3] = '世'; shiYing.value[0] = '应'; break
    }
    benGuaName.value = gua64.find(i => i.indexOf(benShangGua + benXiaGua) === 0)
    bianGuaName.value = gua64.find(i => i.indexOf(bianShangGua + bianXiaGua) === 0)
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
p.pFont {
    color: black;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
}
</style>
