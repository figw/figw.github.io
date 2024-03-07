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
const selectorList = ref([])
const selectorDialogShow = ref(false)
const sex = ref(0)
const note = ref('')
const noteDialogShow = ref(false)

watch(nianGan, () => nianZhi.value = '')
watch(yueGan, () => yueZhi.value = '')
watch(riGan, () => riZhi.value = '')
watch(shiGan, () => shiZhi.value = '')
watch(nianGan, () => generateDaYun())
watch(yueGan, () => generateDaYun())
watch(yueZhi, () => generateDaYun())
watch(sex, () => generateDaYun())

function clickGanZhi(name) {
    switch (name) {
        case 'nianGan':
        case 'yueGan':
        case 'riGan':
        case 'shiGan': selectorList.value = TIAN_GAN; break
        case 'nianZhi': selectorList.value = nianGan.value ? (YANG_GAN.includes(nianGan.value) ? YANG_ZHI : YIN_ZHI) : DI_ZHI; break
        case 'yueZhi': selectorList.value = yueGan.value ? (YANG_GAN.includes(yueGan.value) ? YANG_ZHI : YIN_ZHI) : DI_ZHI; break
        case 'riZhi': selectorList.value = riGan.value ? (YANG_GAN.includes(riGan.value) ? YANG_ZHI : YIN_ZHI) : DI_ZHI; break
        case 'shiZhi': selectorList.value = shiGan.value ? (YANG_GAN.includes(shiGan.value) ? YANG_ZHI : YIN_ZHI) : DI_ZHI; break
    }
    changing.value = name
    selectorDialogShow.value = true
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
</script>

<template>
<el-row justify="center">
<el-col :xs="24" :sm="24" :lg="16" :xl="8">
  <!--  干支  -->
  <el-row style="color:#cccccc">
    <el-col :span="6">
      <p class="nml" :style="getColor(nianGan)">{{nianGanShen||'年'}}</p>
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
  <el-dialog v-model="selectorDialogShow" width="80%" align-center>
    <el-row justify="center">
      <el-col :span="12" v-for="i in [...selectorList, '']">
        <p class="nml" :style="getColor(i)" style="margin:20px 0" @click="changingMap[changing]=i;selectorDialogShow=false">
          {{i||'空'}}
        </p>
      </el-col>
    </el-row>
  </el-dialog>
  <!--  长生 & 空亡 & 纳音  -->
  <el-divider></el-divider>
  <el-row>
    <el-col :span="6">
      <p class="sml" v-if="riGan&&nianZhi">{{CHANG_SHENG[riGan][nianZhi]}}</p>
      <p class="sml" v-if="nianGan&&nianZhi">{{KONG_WANG[nianGan][nianZhi]}}空</p>
      <p class="sml" v-if="nianGan&&nianZhi" :style="getColor(NA_YIN[nianGan][nianZhi])">{{NA_YIN[nianGan][nianZhi]}}</p>
    </el-col>
    <el-col :span="6">
      <p class="sml" v-if="riGan&&yueZhi">{{CHANG_SHENG[riGan][yueZhi]}}</p>
      <p class="sml" v-if="yueGan&&yueZhi">{{KONG_WANG[yueGan][yueZhi]}}空</p>
      <p class="sml" v-if="yueGan&&yueZhi" :style="getColor(NA_YIN[yueGan][yueZhi])">{{NA_YIN[yueGan][yueZhi]}}</p>
    </el-col>
    <el-col :span="6">
      <p class="sml" v-if="riGan&&riZhi">{{CHANG_SHENG[riGan][riZhi]}}</p>
      <p class="sml" v-if="riGan&&riZhi">{{KONG_WANG[riGan][riZhi]}}空</p>
      <p class="sml" v-if="riGan&&riZhi" :style="getColor(NA_YIN[riGan][riZhi])">{{NA_YIN[riGan][riZhi]}}</p>
    </el-col>
    <el-col :span="6">
      <p class="sml" v-if="riGan&&shiZhi">{{CHANG_SHENG[riGan][shiZhi]}}</p>
      <p class="sml" v-if="shiGan&&shiZhi">{{KONG_WANG[shiGan][shiZhi]}}空</p>
      <p class="sml" v-if="shiGan&&shiZhi" :style="getColor(NA_YIN[shiGan][shiZhi])">{{NA_YIN[shiGan][shiZhi]}}</p>
    </el-col>
  </el-row>
  <!--  大运  -->
  <el-divider v-if="daYunList.length>0"></el-divider>
  <el-row justify="space-around">
    <el-col :span="4" v-for="i in ['一','二','三','四','五','六','七','八','九','十'].slice(0,daYunList.length)">
      <p class="sml">{{i}}<br />运</p>
    </el-col>
  </el-row>
  <el-row justify="space-around">
    <el-col :span="4" v-for="i in daYunList" :style="getColor(i[0])">
      <p class="nml" style="margin:5px 0">
        {{i[0]}}<sub v-if="riGan" style="font-size:18px">{{SHI_SHEN[riGan][i[0]]}}</sub>
      </p>
    </el-col>
  </el-row>
  <el-row justify="space-around">
    <el-col :span="4" v-for="i in daYunList" :style="getColor(i[1])">
      <p class="nml" style="margin:5px 0">
        {{i[1]}}<sub v-if="riGan" style="font-size:18px">{{SHI_SHEN[riGan][CANG_GAN[i[1]][0]]}}</sub>
      </p>
    </el-col>
  </el-row>
  <!--  备注  -->
  <el-row style="margin-top:20px">
    <el-col>
      <p class="sml" :style="!note&&'color:#cccccc'" style="white-space:pre" @click="noteDialogShow=true">
        {{note||'点击备注'}}
      </p>
    </el-col>
  </el-row>
  <!--  备注输入面板  -->
  <el-dialog v-model="noteDialogShow" width="80%" align-center>
    <el-input v-model="note" :autosize="{minRows:3}" type="textarea" placeholder="输入备注"></el-input>
    <el-button type="primary" style="margin-top:20px" @click="noteDialogShow=false">确认</el-button>
  </el-dialog>
</el-col>
</el-row>
</template>

<style scoped>
p.sml {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
}
p.nml {
    font-size: 30px;
    font-weight: bold;
    text-align: center;
}
p.big {
    font-size: 50px;
    font-weight: bold;
    text-align: center;
}
</style>
