<script setup>
import { ref } from 'vue'
import {
    CANG_GAN,
    CHANG_SHENG_MAP,
    KONG_WANG_MAP,
    NA_YIN_MAP,
    SHI_SHEN_MAP,
    SHI_SHEN_SHORT_NAME,
    TIAN_GAN,
    WU_XING_COLOR,
    WU_XING_MAP,
    YANG_GAN,
    YANG_ZHI,
    YIN_GAN,
    YIN_ZHI
} from '../assets/constant.js'

const nianGan = ref(), nianZhi = ref(), yueGan = ref(), yueZhi = ref(), riGan = ref(), riZhi = ref(), shiGan = ref(), shiZhi = ref()
const buttonDialogVisible = ref(false)
const dialogMark = ref(-1)
const dialogMarkMap = ref({ 1: nianGan, 2: nianZhi, 3: yueGan, 4: yueZhi, 5: riGan, 6: riZhi, 7: shiGan, 8: shiZhi })
const dialogOptions = ref()
const dialogVisible = ref(false)
const note = ref('')
const noteDialogVisible = ref(false)

function getColor(key) {
    return 'color:' + WU_XING_COLOR[WU_XING_MAP[key]]
}

function randomOne() {
    const sample = (arr) => arr[Math.floor(Math.random() * arr.length)]
    if (sample([0, 1])) { nianGan.value = sample(YANG_GAN); nianZhi.value = sample(YANG_ZHI) }
    else { nianGan.value = sample(YIN_GAN); nianZhi.value = sample(YIN_ZHI) }
    if (sample([0, 1])) { yueGan.value = sample(YANG_GAN); yueZhi.value = sample(YANG_ZHI) }
    else { yueGan.value = sample(YIN_GAN); yueZhi.value = sample(YIN_ZHI) }
    if (sample([0, 1])) { riGan.value = sample(YANG_GAN); riZhi.value = sample(YANG_ZHI) }
    else { riGan.value = sample(YIN_GAN); riZhi.value = sample(YIN_ZHI) }
    if (sample([0, 1])) { shiGan.value = sample(YANG_GAN); shiZhi.value = sample(YANG_ZHI) }
    else { shiGan.value = sample(YIN_GAN); shiZhi.value = sample(YIN_ZHI) }
}
</script>

<template>
  <!--  干支  -->
  <el-row justify="center" style="color: #cccccc">
    <el-col :xs="6" :sm="6" :lg="4" :xl="2">
      <p class="nmlFont" :style="getColor(nianGan)" @click="buttonDialogVisible=true">{{riGan && nianGan ? SHI_SHEN_SHORT_NAME[SHI_SHEN_MAP[riGan][nianGan]] : '年'}}</p>
      <p class="bigFont" :style="getColor(nianGan)" @click="dialogMark=1; dialogOptions=TIAN_GAN; dialogVisible=true">{{nianGan || '干'}}</p>
      <p class="bigFont" :style="getColor(nianZhi)" @click="dialogMark=2; dialogOptions=YANG_GAN.indexOf(nianGan)>=0?YANG_ZHI:YIN_ZHI; nianGan&&(dialogVisible=true)">{{nianZhi || '支'}}</p>
      <p class="smlFont" :style="getColor(i)" v-for="i in CANG_GAN[nianZhi] || []">{{i + (riGan ? ' · '+SHI_SHEN_SHORT_NAME[SHI_SHEN_MAP[riGan][i]] : '')}}</p>
    </el-col>
    <el-col :xs="6" :sm="6" :lg="4" :xl="2">
      <p class="nmlFont" :style="getColor(yueGan)" @click="buttonDialogVisible=true">{{riGan && yueGan ? SHI_SHEN_SHORT_NAME[SHI_SHEN_MAP[riGan][yueGan]] : '月'}}</p>
      <p class="bigFont" :style="getColor(yueGan)" @click="dialogMark=3; dialogOptions=TIAN_GAN; dialogVisible=true">{{yueGan || '干'}}</p>
      <p class="bigFont" :style="getColor(yueZhi)" @click="dialogMark=4; dialogOptions=YANG_GAN.indexOf(yueGan)>=0?YANG_ZHI:YIN_ZHI; yueGan&&(dialogVisible=true)">{{yueZhi || '支'}}</p>
      <p class="smlFont" :style="getColor(i)" v-for="i in CANG_GAN[yueZhi] || []">{{i + (riGan ? ' · '+SHI_SHEN_SHORT_NAME[SHI_SHEN_MAP[riGan][i]] : '')}}</p>
    </el-col>
    <el-col :xs="6" :sm="6" :lg="4" :xl="2">
      <p class="nmlFont" :style="'color:'+(riGan&&'#555555')" @click="buttonDialogVisible=true">日主</p>
      <p class="bigFont" :style="getColor(riGan)" @click="dialogMark=5; dialogOptions=TIAN_GAN; dialogVisible=true">{{riGan || '干'}}</p>
      <p class="bigFont" :style="getColor(riZhi)" @click="dialogMark=6; dialogOptions=YANG_GAN.indexOf(riGan)>=0?YANG_ZHI:YIN_ZHI; riGan&&(dialogVisible=true)">{{riZhi || '支'}}</p>
      <p class="smlFont" :style="getColor(i)" v-for="i in CANG_GAN[riZhi] || []">{{i + (riGan ? ' · '+SHI_SHEN_SHORT_NAME[SHI_SHEN_MAP[riGan][i]] : '')}}</p>
    </el-col>
    <el-col :xs="6" :sm="6" :lg="4" :xl="2">
      <p class="nmlFont" :style="getColor(shiGan)" @click="buttonDialogVisible=true">{{riGan && shiGan ? SHI_SHEN_SHORT_NAME[SHI_SHEN_MAP[riGan][shiGan]] : '时'}}</p>
      <p class="bigFont" :style="getColor(shiGan)" @click="dialogMark=7; dialogOptions=TIAN_GAN; dialogVisible=true">{{shiGan || '干'}}</p>
      <p class="bigFont" :style="getColor(shiZhi)" @click="dialogMark=8; dialogOptions=YANG_GAN.indexOf(shiGan)>=0?YANG_ZHI:YIN_ZHI; shiGan&&(dialogVisible=true)">{{shiZhi || '支'}}</p>
      <p class="smlFont" :style="getColor(i)" v-for="i in CANG_GAN[shiZhi] || []">{{i + (riGan ? ' · '+SHI_SHEN_SHORT_NAME[SHI_SHEN_MAP[riGan][i]] : '')}}</p>
    </el-col>
  </el-row>
  <!--  长生 & 空亡 & 纳音  -->
  <el-row justify="center" style="margin-top:20px">
    <el-col :xs="6" :sm="6" :lg="4" :xl="2">
      <p class="smlFont" v-if="riGan&&nianZhi" style="color:#555555">{{CHANG_SHENG_MAP[riGan][nianZhi]}}</p>
      <p class="smlFont" v-if="nianGan&&nianZhi" style="color:#555555">{{KONG_WANG_MAP[nianGan][nianZhi] + '空'}}</p>
      <p class="smlFont" v-if="nianGan&&nianZhi" :style="getColor(NA_YIN_MAP[nianGan][nianZhi])">{{NA_YIN_MAP[nianGan][nianZhi]}}</p>
    </el-col>
    <el-col :xs="6" :sm="6" :lg="4" :xl="2">
      <p class="smlFont" v-if="riGan&&yueZhi" style="color:#555555">{{CHANG_SHENG_MAP[riGan][yueZhi]}}</p>
      <p class="smlFont" v-if="yueGan&&yueZhi" style="color:#555555">{{KONG_WANG_MAP[yueGan][yueZhi] + '空'}}</p>
      <p class="smlFont" v-if="yueGan&&yueZhi" :style="getColor(NA_YIN_MAP[yueGan][yueZhi])">{{NA_YIN_MAP[yueGan][yueZhi]}}</p>
    </el-col>
    <el-col :xs="6" :sm="6" :lg="4" :xl="2">
      <p class="smlFont" v-if="riGan&&riZhi" style="color:#555555">{{CHANG_SHENG_MAP[riGan][riZhi]}}</p>
      <p class="smlFont" v-if="riGan&&riZhi" style="color:#555555">{{KONG_WANG_MAP[riGan][riZhi] + '空'}}</p>
      <p class="smlFont" v-if="riGan&&riZhi" :style="getColor(NA_YIN_MAP[riGan][riZhi])">{{NA_YIN_MAP[riGan][riZhi]}}</p>
    </el-col>
    <el-col :xs="6" :sm="6" :lg="4" :xl="2">
      <p class="smlFont" v-if="riGan&&shiZhi" style="color:#555555">{{CHANG_SHENG_MAP[riGan][shiZhi]}}</p>
      <p class="smlFont" v-if="shiGan&&shiZhi" style="color:#555555">{{KONG_WANG_MAP[shiGan][shiZhi] + '空'}}</p>
      <p class="smlFont" v-if="shiGan&&shiZhi" :style="getColor(NA_YIN_MAP[shiGan][shiZhi])">{{NA_YIN_MAP[shiGan][shiZhi]}}</p>
    </el-col>
  </el-row>
  <!--  干支选择面板  -->
  <el-dialog v-model="dialogVisible" width="80%" align-center>
    <el-row justify="center">
      <el-col :span="6" v-for="i in dialogOptions">
        <p class="nmlFont" :style="'color:'+WU_XING_COLOR[WU_XING_MAP[i]]" @click="dialogMarkMap[dialogMark]=i; dialogMark%2&&(dialogMarkMap[dialogMark+1]=undefined); dialogVisible=false">{{i}}</p>
      </el-col>
    </el-row>
  </el-dialog>
  <!--  按钮面板  -->
  <el-dialog v-model="buttonDialogVisible" width="80%" align-center>
    <el-button style="margin:12px" @click="buttonDialogVisible=false; nianGan=nianZhi=yueGan=yueZhi=riGan=riZhi=shiGan=shiZhi=undefined" type="primary" plain>重置所有干支</el-button>
    <el-button style="margin:12px" @click="buttonDialogVisible=false; randomOne()" type="primary" plain>随机生成命造</el-button>
    <el-button style="margin:12px" @click="buttonDialogVisible=false">取消</el-button>
  </el-dialog>
  <!--  备注  -->
  <el-row justify="center" style="margin-top:20px">
    <el-col :xs="24" :sm="24" :lg="16" :xl="8">
      <p class="smlFont" :style="'color:'+(note?'black':'#cccccc')" style="white-space:pre" @click="noteDialogVisible=true">{{note || '点击备注'}}</p>
    </el-col>
  </el-row>
  <!--  备注输入面板  -->
  <el-dialog v-model="noteDialogVisible" width="80%" align-center>
    <el-input v-model="note" :autosize="{minRows:3}" type="textarea" placeholder="输入备注"></el-input>
    <el-button type="primary" style="margin-top:20px" @click="noteDialogVisible=false">确认</el-button>
  </el-dialog>
</template>

<style scoped>
p.smlFont {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
}
p.nmlFont {
    font-size: 30px;
    font-weight: bold;
    text-align: center;
}
p.bigFont {
    font-size: 50px;
    font-weight: bold;
    text-align: center;
}
</style>
