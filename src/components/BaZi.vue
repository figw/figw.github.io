<template>
  <el-row justify="center">
    <el-col :xs="24" :sm="24" :lg="16" :xl="8">
      <!-- 干支 -->
      <el-row style="color:#cccccc">
        <el-col :span="6">
          <p class="nml" :style="getColor(nianGan)" @dblclick="clearAll()">{{nianGanShen||'年'}}</p>
          <p class="big" :style="getColor(nianGan)" @click="clickGanZhi('nianGan')">{{nianGan||'干'}}</p>
          <p class="big" :style="getColor(nianZhi)" @click="clickGanZhi('nianZhi')">{{nianZhi||'支'}}</p>
          <p class="sml" :style="getColor(i[0])" v-for="i in nianZhiShenList">{{i}}</p>
        </el-col>
        <el-col :span="6">
          <p class="nml" :style="getColor(yueGan)">{{yueGanShen||'月'}}</p>
          <p class="big" :style="getColor(yueGan)" @click="clickGanZhi('yueGan')">{{yueGan||'干'}}</p>
          <p class="big" :style="getColor(yueZhi)" @click="clickGanZhi('yueZhi')">{{yueZhi||'支'}}</p>
          <p class="sml" :style="getColor(i[0])" v-for="i in yueZhiShenList">{{i}}</p>
        </el-col>
        <el-col :span="6">
          <p class="nml" :style="riGan&&'color:black'" @click="sex=(sex+1)%3">{{sex?(sex===1?'乾造':'坤造'):'日主'}}</p>
          <p class="big" :style="getColor(riGan)" @click="clickGanZhi('riGan')">{{riGan||'干'}}</p>
          <p class="big" :style="getColor(riZhi)" @click="clickGanZhi('riZhi')">{{riZhi||'支'}}</p>
          <p class="sml" :style="getColor(i[0])" v-for="i in riZhiShenList">{{i}}</p>
        </el-col>
        <el-col :span="6">
          <p class="nml" :style="getColor(shiGan)">{{shiGanShen||'时'}}</p>
          <p class="big" :style="getColor(shiGan)" @click="clickGanZhi('shiGan')">{{shiGan||'干'}}</p>
          <p class="big" :style="getColor(shiZhi)" @click="clickGanZhi('shiZhi')">{{shiZhi||'支'}}</p>
          <p class="sml" :style="getColor(i[0])" v-for="i in shiZhiShenList">{{i}}</p>
        </el-col>
      </el-row>
      <!-- 干支选择面板 -->
      <el-dialog v-model="showSelectDialog" width="80%" align-center>
        <el-row justify="center">
          <el-col :span="12" v-for="i in [...selectList, '']">
            <p class="nml" :style="getColor(i)" @click="changingMap[changing]=i;showSelectDialog=false">
              {{i||'空'}}
            </p>
          </el-col>
        </el-row>
      </el-dialog>
      <!-- 备注 -->
      <el-row>
        <input v-model="note" style="border:none;width:100%" />
      </el-row>
      <!-- 大运 -->
      <el-row v-if="daYunList.length>0">
        <el-col :span="4" v-for="(i,n) in ['一','二','三','四','五','六','七','八','九','十'].slice(0,daYunList.length)">
          <p class="sml" style="margin-left:0;margin-right:0" @dblclick="changeQiYunAge(n)">
            {{qiYunAge>-1?qiYunAge+n*10+'岁':i+'运'}}
          </p>
        </el-col>
        <el-col :span="4" v-for="i in daYunList" :style="getColor(i[0])">
          <p class="nml" style="margin:0">
            {{i[0]}}<sub v-if="riGan" style="font-size:18px">{{SHI_SHEN[riGan][i[0]]}}</sub>
          </p>
        </el-col>
        <el-col :span="4" v-for="i in daYunList" :style="getColor(i[1])">
          <p class="nml" style="margin:0">
            {{i[1]}}<sub v-if="riGan" style="font-size:18px">{{SHI_SHEN[riGan][CANG_GAN[i[1]][0]]}}</sub>
          </p>
        </el-col>
      </el-row>
      <!-- 流年 -->
      <el-row v-if="daYunList.length>0&&liuNianList.length>0">
        <br />
        <el-scrollbar>
          <div style="display:flex">
            <p class="sml"><br />流<br />年</p>
            <p class="sml" v-for="(i,n) in liuNianList">
              <small>{{n+1}}</small>
              <br />
              <span :style="getColor(i[0])">{{i[0]}}</span>
              <br/>
              <span :style="getColor(i[1])">{{i[1]}}</span>
            </p>
          </div>
        </el-scrollbar>
      </el-row>
    </el-col>
  </el-row>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import {
    TIAN_GAN, YANG_GAN, YIN_GAN,
    DI_ZHI, YANG_ZHI, YIN_ZHI,
    JIA_ZI,
    WU_XING, WU_XING_COLOR,
} from '../assets/constant.js'

const nianGan = ref(''), nianZhi = ref(''), yueGan = ref(''), yueZhi = ref(''), riGan = ref(''), riZhi = ref(''), shiGan = ref(''), shiZhi = ref('')

const nianGanShen = computed(() => riGan.value && nianGan.value && SHI_SHEN[riGan.value][nianGan.value])
const yueGanShen = computed(() => riGan.value && yueGan.value && SHI_SHEN[riGan.value][yueGan.value])
const shiGanShen = computed(() => riGan.value && shiGan.value && SHI_SHEN[riGan.value][shiGan.value])

const nianZhiShenList = computed(() => nianZhi.value && CANG_GAN[nianZhi.value].map(
    i => i + (riGan.value ? ' · ' + SHI_SHEN[riGan.value][i] : '')
))
const yueZhiShenList = computed(() => yueZhi.value && CANG_GAN[yueZhi.value].map(
    i => i + (riGan.value ? ' · ' + SHI_SHEN[riGan.value][i] : '')
))
const riZhiShenList = computed(() => riZhi.value && CANG_GAN[riZhi.value].map(
    i => i + (riGan.value ? ' · ' + SHI_SHEN[riGan.value][i] : '')
))
const shiZhiShenList = computed(() => shiZhi.value && CANG_GAN[shiZhi.value].map(
    i => i + (riGan.value ? ' · ' + SHI_SHEN[riGan.value][i] : '')
))

const changing = ref('')
const changingMap = ref({ nianGan, nianZhi, yueGan, yueZhi, riGan, riZhi, shiGan, shiZhi })
const daYunList = ref([])
const liuNianList = ref([])
const note = ref('')
const qiYunAge = ref(-1)
const selectList = ref([])
const sex = ref(0)
const showSelectDialog = ref(false)

watch(nianGan, i => i && !isSameYinYang(i, nianZhi.value) && (nianZhi.value = ''))
watch(yueGan, i => i && !isSameYinYang(i, yueZhi.value) && (yueZhi.value = ''))
watch(riGan, i => i && !isSameYinYang(i, riZhi.value) && (riZhi.value = ''))
watch(shiGan, i => i && !isSameYinYang(i, shiZhi.value) && (shiZhi.value = ''))
watch(nianGan, () => { generateDaYun(); generateLiuNian() })
watch(nianZhi, () => generateLiuNian())
watch(yueGan, () => generateDaYun())
watch(yueZhi, () => generateDaYun())
watch(sex, () => { generateDaYun(); generateLiuNian() })

function changeQiYunAge(index) {
    if (index === 1) qiYunAge.value++
    else if (index === 0 && qiYunAge.value > -1) qiYunAge.value--
}

function clearAll() {
    nianGan.value = nianZhi.value = yueGan.value = yueZhi.value = riGan.value = riZhi.value = shiGan.value = shiZhi.value = ''
    note.value = ''
    qiYunAge.value = -1
    sex.value = 0
}

function clickGanZhi(name) {
    switch (name) {
        case 'nianGan':
        case 'yueGan':
        case 'riGan':
        case 'shiGan': selectList.value = TIAN_GAN; break
        case 'nianZhi': selectList.value = nianGan.value ? (YANG_GAN.includes(nianGan.value) ? YANG_ZHI : YIN_ZHI) : DI_ZHI; break
        case 'yueZhi': selectList.value = yueGan.value ? (YANG_GAN.includes(yueGan.value) ? YANG_ZHI : YIN_ZHI) : DI_ZHI; break
        case 'riZhi': selectList.value = riGan.value ? (YANG_GAN.includes(riGan.value) ? YANG_ZHI : YIN_ZHI) : DI_ZHI; break
        case 'shiZhi': selectList.value = shiGan.value ? (YANG_GAN.includes(shiGan.value) ? YANG_ZHI : YIN_ZHI) : DI_ZHI; break
    }
    changing.value = name
    showSelectDialog.value = true
}

function generateDaYun() {
    const times = 6
    if (sex.value === 0 || !nianGan.value || !yueGan.value || !yueZhi.value) return daYunList.value = []
    let jiaZiList = [...JIA_ZI, ...JIA_ZI]
    if ((sex.value === 1 ? YIN_GAN : YANG_GAN).includes(nianGan.value)) jiaZiList = jiaZiList.reverse()
    const index = jiaZiList.findIndex(i => i === yueGan.value + yueZhi.value)
    daYunList.value = jiaZiList.slice(index + 1, index + 1 + times)
}

function generateLiuNian() {
    const times = 69
    if (!nianGan.value || !nianZhi.value) return liuNianList.value = []
    const jiaZiList = [...JIA_ZI, ...JIA_ZI, ...JIA_ZI]
    const index = jiaZiList.findIndex(i => i === nianGan.value + nianZhi.value)
    liuNianList.value = jiaZiList.slice(index, index + times)
}

function getColor(key) {
    return WU_XING_COLOR[WU_XING[key]] && 'color:' + WU_XING_COLOR[WU_XING[key]]
}

function isSameYinYang(gan, zhi) {
    return (YANG_GAN.includes(gan) && YANG_ZHI.includes(zhi)) || (YIN_GAN.includes(gan) && YIN_ZHI.includes(zhi))
}

const CANG_GAN = {
  '子': ['癸'],
  '丑': ['己', '癸', '辛'],
  '寅': ['甲', '丙', '戊'],
  '卯': ['乙'],
  '辰': ['戊', '乙', '癸'],
  '巳': ['丙', '庚', '戊'],
  '午': ['丁', '己'],
  '未': ['己', '丁', '乙'],
  '申': ['庚', '壬', '戊'],
  '酉': ['辛'],
  '戌': ['戊', '辛', '丁'],
  '亥': ['壬', '甲'],
}
const SHI_SHEN = {
  '甲': { '甲': '比', '乙': '劫', '丙': '食', '丁': '伤', '戊': '才', '己': '财', '庚': '杀', '辛': '官', '壬': '枭', '癸': '印' },
  '乙': { '甲': '劫', '乙': '比', '丙': '伤', '丁': '食', '戊': '财', '己': '才', '庚': '官', '辛': '杀', '壬': '印', '癸': '枭' },
  '丙': { '甲': '枭', '乙': '印', '丙': '比', '丁': '劫', '戊': '食', '己': '伤', '庚': '才', '辛': '财', '壬': '杀', '癸': '官' },
  '丁': { '甲': '印', '乙': '枭', '丙': '劫', '丁': '比', '戊': '伤', '己': '食', '庚': '财', '辛': '才', '壬': '官', '癸': '杀' },
  '戊': { '甲': '杀', '乙': '官', '丙': '枭', '丁': '印', '戊': '比', '己': '劫', '庚': '食', '辛': '伤', '壬': '才', '癸': '财' },
  '己': { '甲': '官', '乙': '杀', '丙': '印', '丁': '枭', '戊': '劫', '己': '比', '庚': '伤', '辛': '食', '壬': '财', '癸': '才' },
  '庚': { '甲': '才', '乙': '财', '丙': '杀', '丁': '官', '戊': '枭', '己': '印', '庚': '比', '辛': '劫', '壬': '食', '癸': '伤' },
  '辛': { '甲': '财', '乙': '才', '丙': '官', '丁': '杀', '戊': '印', '己': '枭', '庚': '劫', '辛': '比', '壬': '伤', '癸': '食' },
  '壬': { '甲': '食', '乙': '伤', '丙': '才', '丁': '财', '戊': '杀', '己': '官', '庚': '枭', '辛': '印', '壬': '比', '癸': '劫' },
  '癸': { '甲': '伤', '乙': '食', '丙': '财', '丁': '才', '戊': '官', '己': '杀', '庚': '印', '辛': '枭', '壬': '劫', '癸': '比' },
}
</script>

<style scoped>
p, input {
    margin: 5px;
    text-align: center;
    font-weight: bold;
}

p.sml, input {
    font-size: 20px;
}

p.nml {
    font-size: 30px;
}

p.big {
    font-size: 50px;
}
</style>
