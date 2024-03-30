<script setup>
import { computed, ref, watch } from 'vue'
import {
    CANG_GAN,
    CHANG_SHENG,
    DI_ZHI,
    JIA_ZI,
    KONG_WANG,
    NA_YIN,
    SHI_SHEN,
    TIAN_GAN,
    WU_XING_COLOR,
    WU_XING,
    YANG_GAN,
    YANG_ZHI,
    YIN_GAN,
    YIN_ZHI,
} from '../assets/constant.js'

const nianGan = ref(''), nianZhi = ref(''), yueGan = ref(''), yueZhi = ref(''), riGan = ref(''), riZhi = ref(''), shiGan = ref(''), shiZhi = ref('')
// const nianGan = ref('甲'), nianZhi = ref('子'), yueGan = ref('丙'), yueZhi = ref('寅'), riGan = ref('戊'), riZhi = ref('辰'), shiGan = ref('庚'), shiZhi = ref('午')

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
const qiYunAge = ref(-1)
const selectList = ref([])
const sex = ref(0)
const showDaYunTitle = ref(true)
const showKongWang = ref(true)
const showNaYin = ref(true)
const showNoteDialog = ref(false)
const showSelectDialog = ref(false)
const note = ref('')

watch(nianGan, i => i && !isSameYinYang(i, nianZhi.value) && (nianZhi.value = ''))
watch(yueGan, i => i && !isSameYinYang(i, yueZhi.value) && (yueZhi.value = ''))
watch(riGan, i => i && !isSameYinYang(i, riZhi.value) && (riZhi.value = ''))
watch(shiGan, i => i && !isSameYinYang(i, shiZhi.value) && (shiZhi.value = ''))
watch(nianGan, () => generateDaYun())
watch(yueGan, () => generateDaYun())
watch(yueZhi, () => generateDaYun())
watch(sex, () => generateDaYun())

function changeQiYunAge(index) {
    if (index === 1) qiYunAge.value++
    else if (index === 0 && qiYunAge.value > -1) qiYunAge.value--
}
function clearAll() {
    nianGan.value = nianZhi.value = yueGan.value = yueZhi.value = riGan.value = riZhi.value = shiGan.value = shiZhi.value = ''
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
function getColor(key) {
    return WU_XING_COLOR[WU_XING[key]] && 'color:' + WU_XING_COLOR[WU_XING[key]]
}
function isSameYinYang(gan, zhi) {
    return (YANG_GAN.includes(gan) && YANG_ZHI.includes(zhi)) || (YIN_GAN.includes(gan) && YIN_ZHI.includes(zhi))
}
</script>

<template>
<el-row justify="center">
<el-col :xs="24" :sm="24" :lg="16" :xl="8">
  <!--  干支  -->
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
  <!--  干支选择面板  -->
  <el-dialog v-model="showSelectDialog" width="80%" align-center>
    <el-row justify="center">
      <el-col :span="12" v-for="i in [...selectList, '']">
        <p class="nml" :style="getColor(i)" @click="changingMap[changing]=i;showSelectDialog=false">
          {{i||'空'}}
        </p>
      </el-col>
    </el-row>
  </el-dialog>
  <!--  长生 & 空亡 & 纳音  -->
  <!-- <br />
  <el-row v-if="riGan">
    <el-col :span="6"><p v-if="nianZhi" @dblclick="showKongWang=showNaYin=!showNaYin">{{CHANG_SHENG[riGan][nianZhi]}}</p></el-col>
    <el-col :span="6"><p v-if="yueZhi">{{CHANG_SHENG[riGan][yueZhi]}}</p></el-col>
    <el-col :span="6"><p v-if="riZhi">{{CHANG_SHENG[riGan][riZhi]}}</p></el-col>
    <el-col :span="6"><p v-if="shiZhi">{{CHANG_SHENG[riGan][shiZhi]}}</p></el-col>
  </el-row>
  <el-row v-show="showKongWang">
    <el-col :span="6"><p v-if="nianGan&&nianZhi">{{KONG_WANG[nianGan][nianZhi]}}空</p></el-col>
    <el-col :span="6"><p v-if="yueGan&&yueZhi">{{KONG_WANG[yueGan][yueZhi]}}空</p></el-col>
    <el-col :span="6"><p v-if="riGan&&riZhi">{{KONG_WANG[riGan][riZhi]}}空</p></el-col>
    <el-col :span="6"><p v-if="shiGan&&shiZhi">{{KONG_WANG[shiGan][shiZhi]}}空</p></el-col>
  </el-row>
  <el-row v-show="showNaYin">
    <el-col :span="6"><p v-if="nianGan&&nianZhi" :style="getColor(NA_YIN[nianGan][nianZhi])">{{NA_YIN[nianGan][nianZhi]}}</p></el-col>
    <el-col :span="6"><p v-if="yueGan&&yueZhi" :style="getColor(NA_YIN[yueGan][yueZhi])">{{NA_YIN[yueGan][yueZhi]}}</p></el-col>
    <el-col :span="6"><p v-if="riGan&&riZhi" :style="getColor(NA_YIN[riGan][riZhi])">{{NA_YIN[riGan][riZhi]}}</p></el-col>
    <el-col :span="6"><p v-if="shiGan&&shiZhi" :style="getColor(NA_YIN[shiGan][shiZhi])">{{NA_YIN[shiGan][shiZhi]}}</p></el-col>
  </el-row> -->
  <!--  大运  -->
  <br />
  <el-row justify="space-around" v-show="showDaYunTitle">
    <el-col :span="4" v-for="(i,n) in ['一','二','三','四','五','六','七','八','九','十'].slice(0,daYunList.length)">
      <p class="sml" @dblclick="changeQiYunAge(n)">
        {{qiYunAge>-1?qiYunAge+n*10:i}}<br />{{qiYunAge>-1?'岁':'运'}}
      </p>
    </el-col>
  </el-row>
  <el-row justify="space-around">
    <el-col :span="4" v-for="(i,n) in daYunList" :style="getColor(i[0])">
      <p class="nml dayun" @dblclick="n===0&&(showDaYunTitle=!showDaYunTitle)">
        {{i[0]}}<sub v-if="riGan" style="font-size:18px">{{SHI_SHEN[riGan][i[0]]}}</sub>
      </p>
    </el-col>
  </el-row>
  <el-row justify="space-around">
    <el-col :span="4" v-for="i in daYunList" :style="getColor(i[1])">
      <p class="nml dayun">
        {{i[1]}}<sub v-if="riGan" style="font-size:18px">{{SHI_SHEN[riGan][CANG_GAN[i[1]][0]]}}</sub>
      </p>
    </el-col>
  </el-row>
  <!--  备注  -->
  <br />
  <el-row>
    <el-col>
      <p class="sml" :style="!note&&'color:#cccccc'" style="white-space:pre" @click="showNoteDialog=true">
        {{note||'点击备注'}}
      </p>
    </el-col>
  </el-row>
  <!--  备注输入面板  -->
  <el-dialog v-model="showNoteDialog" width="80%" align-center>
    <el-input v-model="note" :autosize="{minRows:3}" type="textarea" placeholder="输入备注"></el-input>
    <el-button type="primary" style="margin-top:20px" @click="showNoteDialog=false">确认</el-button>
  </el-dialog>
</el-col>
</el-row>
</template>

<style scoped>
p, p.sml {
    margin: 5px 0;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
}
p.nml {
    margin: 10px 0;
    font-size: 30px;
    font-weight: bold;
    text-align: center;
}
p.big {
    margin: 15px 0;
    font-size: 50px;
    font-weight: bold;
    text-align: center;
}
p.dayun {
    margin: 0;
}
</style>
