<script setup>
import { computed, ref, watch } from 'vue'
import {
    CANG_GAN,
    CHANG_SHENG,
    DI_ZHI,
    KONG_WANG,
    NA_YIN,
    SHI_SHEN,
    TIAN_GAN,
    WU_XING_COLOR,
    WU_XING,
    YANG_GAN,
    YANG_ZHI,
    YIN_GAN,
    YIN_ZHI
} from '../assets/constant.js'

const nianGan = ref(''), nianZhi = ref('')
const yueGan = ref(''), yueZhi = ref('')
const riGan = ref(''), riZhi = ref('')
const shiGan = ref(''), shiZhi = ref('')

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
const selector = ref([''])
const selectorDialogVisible = ref(false)
const note = ref('')
const noteDialogVisible = ref(false)

watch(nianGan, i => i && !isSameYinYang(i, nianZhi.value) && (nianZhi.value = ''))
watch(yueGan, i => i && !isSameYinYang(i, yueZhi.value) && (yueZhi.value = ''))
watch(riGan, i => i && !isSameYinYang(i, riZhi.value) && (riZhi.value = ''))
watch(shiGan, i => i && !isSameYinYang(i, shiZhi.value) && (shiZhi.value = ''))

function clickGanZhi(name) {
    if (name === 'nianGan') selector.value = TIAN_GAN
    else if (name === 'yueGan') selector.value = TIAN_GAN
    else if (name === 'riGan') selector.value = TIAN_GAN
    else if (name === 'shiGan') selector.value = TIAN_GAN
    else if (name === 'nianZhi') selector.value = nianGan.value ? (YANG_GAN.includes(nianGan.value) ? YANG_ZHI : YIN_ZHI) : DI_ZHI
    else if (name === 'yueZhi') selector.value = yueGan.value ? (YANG_GAN.includes(yueGan.value) ? YANG_ZHI : YIN_ZHI) : DI_ZHI
    else if (name === 'riZhi') selector.value = riGan.value ? (YANG_GAN.includes(riGan.value) ? YANG_ZHI : YIN_ZHI) : DI_ZHI
    else if (name === 'shiZhi') selector.value = shiGan.value ? (YANG_GAN.includes(shiGan.value) ? YANG_ZHI : YIN_ZHI) : DI_ZHI
    changing.value = name
    selectorDialogVisible.value = true
}
function getColor(key) {
    return 'color:' + WU_XING_COLOR[WU_XING[key]]
}
function isSameYinYang(gan, zhi) {
    return (YANG_GAN.includes(gan) && YANG_ZHI.includes(zhi)) || (YIN_GAN.includes(gan) && YIN_ZHI.includes(zhi))
}
</script>

<template>
  <!--  干支  -->
  <el-row justify="center" style="color:#cccccc">
    <el-col :xs="6" :sm="6" :lg="4" :xl="2">
      <p class="p-nml" :style="getColor(nianGan)">{{nianGanShen||'年'}}</p>
      <p class="p-big" :style="getColor(nianGan)" @click="clickGanZhi('nianGan')">{{nianGan||'干'}}</p>
      <p class="p-big" :style="getColor(nianZhi)" @click="clickGanZhi('nianZhi')">{{nianZhi||'支'}}</p>
      <p class="p-sml" :style="getColor(i[0])" v-for="i in nianZhiShenList">{{i}}</p>
    </el-col>
    <el-col :xs="6" :sm="6" :lg="4" :xl="2">
      <p class="p-nml" :style="getColor(yueGan)">{{yueGanShen||'月'}}</p>
      <p class="p-big" :style="getColor(yueGan)" @click="clickGanZhi('yueGan')">{{yueGan||'干'}}</p>
      <p class="p-big" :style="getColor(yueZhi)" @click="clickGanZhi('yueZhi')">{{yueZhi||'支'}}</p>
      <p class="p-sml" :style="getColor(i[0])" v-for="i in yueZhiShenList">{{i}}</p>
    </el-col>
    <el-col :xs="6" :sm="6" :lg="4" :xl="2">
      <p class="p-nml" :style="riGan&&'color:black'">日主</p>
      <p class="p-big" :style="getColor(riGan)" @click="clickGanZhi('riGan')">{{riGan||'干'}}</p>
      <p class="p-big" :style="getColor(riZhi)" @click="clickGanZhi('riZhi')">{{riZhi||'支'}}</p>
      <p class="p-sml" :style="getColor(i[0])" v-for="i in riZhiShenList">{{i}}</p>
    </el-col>
    <el-col :xs="6" :sm="6" :lg="4" :xl="2">
      <p class="p-nml" :style="getColor(shiGan)">{{shiGanShen||'时'}}</p>
      <p class="p-big" :style="getColor(shiGan)" @click="clickGanZhi('shiGan')">{{shiGan||'干'}}</p>
      <p class="p-big" :style="getColor(shiZhi)" @click="clickGanZhi('shiZhi')">{{shiZhi||'支'}}</p>
      <p class="p-sml" :style="getColor(i[0])" v-for="i in shiZhiShenList">{{i}}</p>
    </el-col>
  </el-row>
  <!--  长生 & 空亡 & 纳音  -->
  <el-row justify="center" style="margin-top:20px">
    <el-col :xs="6" :sm="6" :lg="4" :xl="2">
      <p class="p-sml" v-if="riGan&&nianZhi">{{CHANG_SHENG[riGan][nianZhi]}}</p>
      <p class="p-sml" v-if="nianGan&&nianZhi">{{KONG_WANG[nianGan][nianZhi]+'空'}}</p>
      <p class="p-sml" v-if="nianGan&&nianZhi" :style="getColor(NA_YIN[nianGan][nianZhi])">{{NA_YIN[nianGan][nianZhi]}}</p>
    </el-col>
    <el-col :xs="6" :sm="6" :lg="4" :xl="2">
      <p class="p-sml" v-if="riGan&&yueZhi">{{CHANG_SHENG[riGan][yueZhi]}}</p>
      <p class="p-sml" v-if="yueGan&&yueZhi">{{KONG_WANG[yueGan][yueZhi]+'空'}}</p>
      <p class="p-sml" v-if="yueGan&&yueZhi" :style="getColor(NA_YIN[yueGan][yueZhi])">{{NA_YIN[yueGan][yueZhi]}}</p>
    </el-col>
    <el-col :xs="6" :sm="6" :lg="4" :xl="2">
      <p class="p-sml" v-if="riGan&&riZhi">{{CHANG_SHENG[riGan][riZhi]}}</p>
      <p class="p-sml" v-if="riGan&&riZhi">{{KONG_WANG[riGan][riZhi]+'空'}}</p>
      <p class="p-sml" v-if="riGan&&riZhi" :style="getColor(NA_YIN[riGan][riZhi])">{{NA_YIN[riGan][riZhi]}}</p>
    </el-col>
    <el-col :xs="6" :sm="6" :lg="4" :xl="2">
      <p class="p-sml" v-if="riGan&&shiZhi">{{CHANG_SHENG[riGan][shiZhi]}}</p>
      <p class="p-sml" v-if="shiGan&&shiZhi">{{KONG_WANG[shiGan][shiZhi]+'空'}}</p>
      <p class="p-sml" v-if="shiGan&&shiZhi" :style="getColor(NA_YIN[shiGan][shiZhi])">{{NA_YIN[shiGan][shiZhi]}}</p>
    </el-col>
  </el-row>
  <!--  干支选择面板  -->
  <el-dialog v-model="selectorDialogVisible" width="80%" align-center>
    <el-row justify="center">
      <el-col :span="12" v-for="i in [...selector, '']">
        <p class="p-nml" :style="getColor(i)" style="margin:20px 0" @click="changingMap[changing]=i;selectorDialogVisible=false">
          {{i||'空'}}
        </p>
      </el-col>
    </el-row>
  </el-dialog>
  <!--  备注  -->
  <el-row justify="center" style="margin-top:20px">
    <el-col :xs="24" :sm="24" :lg="16" :xl="8">
      <p class="p-sml" :style="!note&&'color:#cccccc'" style="white-space:pre" @click="noteDialogVisible=true">
        {{note||'点击备注'}}
      </p>
    </el-col>
  </el-row>
  <!--  备注输入面板  -->
  <el-dialog v-model="noteDialogVisible" width="80%" align-center>
    <el-input v-model="note" :autosize="{minRows:3}" type="textarea" placeholder="输入备注"></el-input>
    <el-button type="primary" style="margin-top:20px" @click="noteDialogVisible=false">确认</el-button>
  </el-dialog>
</template>

<style scoped>
p.p-sml {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
}
p.p-nml {
    font-size: 30px;
    font-weight: bold;
    text-align: center;
}
p.p-big {
    font-size: 50px;
    font-weight: bold;
    text-align: center;
}
</style>
