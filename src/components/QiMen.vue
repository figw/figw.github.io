<template>
  <div>
    <select v-model="shiGan">
      <option disabled value="">时干</option>
      <option v-for="i in TIAN_GAN" :value="i">{{i}}</option>
    </select>
    <select v-model="shiZhi">
      <option disabled value="">时支</option>
      <option v-for="i in (shiGan?(YANG_GAN.includes(shiGan)?YANG_ZHI:YIN_ZHI):DI_ZHI)" :value="i">{{i}}</option>
    </select>
    <select v-model="juShu">
      <option disabled value="0">局数</option>
      <option v-for="i in [1,2,3,4,5,6,7,8,9]" :value="i">阳 {{i}} 局</option>
      <option v-for="i in [1,2,3,4,5,6,7,8,9]" :value="-i">阴 {{i}} 局</option>
    </select>
    <button @click="paiPan('z')">排转盘</button>
    <button @click="paiPan('f')">排飞盘</button>
  </div>
  <span>旬首：{{xunShou}}&emsp;&emsp;值符：{{zhiFu}}&emsp;&emsp;值使：{{zhiShi}}</span>
  <div class="pan">
    <div class="gong gong-4">
      <div class="gong inner inner-1">{{cfg[4][1]}}</div>
      <div class="gong inner inner-2">{{cfg[4][2]}}</div>
      <div class="gong inner inner-3">{{cfg[4][3]}}</div>
      <div class="gong inner inner-4">{{cfg[4][4]}}</div>
      <div class="gong inner inner-5">{{cfg[4][5]}}</div>
      <div class="gong inner inner-6">{{cfg[4][6]}}</div>
      <div class="gong inner inner-7">{{cfg[4][7]}}</div>
      <div class="gong inner inner-8">{{cfg[4][8]}}</div>
      <div class="gong inner inner-9">{{cfg[4][9]}}</div>
    </div>
    <div class="gong gong-9">
      <div class="gong inner inner-1">{{cfg[9][1]}}</div>
      <div class="gong inner inner-2">{{cfg[9][2]}}</div>
      <div class="gong inner inner-3">{{cfg[9][3]}}</div>
      <div class="gong inner inner-4">{{cfg[9][4]}}</div>
      <div class="gong inner inner-5">{{cfg[9][5]}}</div>
      <div class="gong inner inner-6">{{cfg[9][6]}}</div>
      <div class="gong inner inner-7">{{cfg[9][7]}}</div>
      <div class="gong inner inner-8">{{cfg[9][8]}}</div>
      <div class="gong inner inner-9">{{cfg[9][9]}}</div>
    </div>
    <div class="gong gong-2">
      <div class="gong inner inner-1">{{cfg[2][1]}}</div>
      <div class="gong inner inner-2">{{cfg[2][2]}}</div>
      <div class="gong inner inner-3">{{cfg[2][3]}}</div>
      <div class="gong inner inner-4">{{cfg[2][4]}}</div>
      <div class="gong inner inner-5">{{cfg[2][5]}}</div>
      <div class="gong inner inner-6">{{cfg[2][6]}}</div>
      <div class="gong inner inner-7">{{cfg[2][7]}}</div>
      <div class="gong inner inner-8">{{cfg[2][8]}}</div>
      <div class="gong inner inner-9">{{cfg[2][9]}}</div>
    </div>
    <div class="gong gong-3">
      <div class="gong inner inner-1">{{cfg[3][1]}}</div>
      <div class="gong inner inner-2">{{cfg[3][2]}}</div>
      <div class="gong inner inner-3">{{cfg[3][3]}}</div>
      <div class="gong inner inner-4">{{cfg[3][4]}}</div>
      <div class="gong inner inner-5">{{cfg[3][5]}}</div>
      <div class="gong inner inner-6">{{cfg[3][6]}}</div>
      <div class="gong inner inner-7">{{cfg[3][7]}}</div>
      <div class="gong inner inner-8">{{cfg[3][8]}}</div>
      <div class="gong inner inner-9">{{cfg[3][9]}}</div>
    </div>
    <div class="gong gong-5">
      <div class="gong inner inner-1">{{cfg[5][1]}}</div>
      <div class="gong inner inner-2">{{cfg[5][2]}}</div>
      <div class="gong inner inner-3">{{cfg[5][3]}}</div>
      <div class="gong inner inner-4">{{cfg[5][4]}}</div>
      <div class="gong inner inner-5">{{cfg[5][5]}}</div>
      <div class="gong inner inner-6">{{cfg[5][6]}}</div>
      <div class="gong inner inner-7">{{cfg[5][7]}}</div>
      <div class="gong inner inner-8">{{cfg[5][8]}}</div>
      <div class="gong inner inner-9">{{cfg[5][9]}}</div>
    </div>
    <div class="gong gong-7">
      <div class="gong inner inner-1">{{cfg[7][1]}}</div>
      <div class="gong inner inner-2">{{cfg[7][2]}}</div>
      <div class="gong inner inner-3">{{cfg[7][3]}}</div>
      <div class="gong inner inner-4">{{cfg[7][4]}}</div>
      <div class="gong inner inner-5">{{cfg[7][5]}}</div>
      <div class="gong inner inner-6">{{cfg[7][6]}}</div>
      <div class="gong inner inner-7">{{cfg[7][7]}}</div>
      <div class="gong inner inner-8">{{cfg[7][8]}}</div>
      <div class="gong inner inner-9">{{cfg[7][9]}}</div>
    </div>
    <div class="gong gong-8">
      <div class="gong inner inner-1">{{cfg[8][1]}}</div>
      <div class="gong inner inner-2">{{cfg[8][2]}}</div>
      <div class="gong inner inner-3">{{cfg[8][3]}}</div>
      <div class="gong inner inner-4">{{cfg[8][4]}}</div>
      <div class="gong inner inner-5">{{cfg[8][5]}}</div>
      <div class="gong inner inner-6">{{cfg[8][6]}}</div>
      <div class="gong inner inner-7">{{cfg[8][7]}}</div>
      <div class="gong inner inner-8">{{cfg[8][8]}}</div>
      <div class="gong inner inner-9">{{cfg[8][9]}}</div>
    </div>
    <div class="gong gong-1">
      <div class="gong inner inner-1">{{cfg[1][1]}}</div>
      <div class="gong inner inner-2">{{cfg[1][2]}}</div>
      <div class="gong inner inner-3">{{cfg[1][3]}}</div>
      <div class="gong inner inner-4">{{cfg[1][4]}}</div>
      <div class="gong inner inner-5">{{cfg[1][5]}}</div>
      <div class="gong inner inner-6">{{cfg[1][6]}}</div>
      <div class="gong inner inner-7">{{cfg[1][7]}}</div>
      <div class="gong inner inner-8">{{cfg[1][8]}}</div>
      <div class="gong inner inner-9">{{cfg[1][9]}}</div>
    </div>
    <div class="gong gong-6">
      <div class="gong inner inner-1">{{cfg[6][1]}}</div>
      <div class="gong inner inner-2">{{cfg[6][2]}}</div>
      <div class="gong inner inner-3">{{cfg[6][3]}}</div>
      <div class="gong inner inner-4">{{cfg[6][4]}}</div>
      <div class="gong inner inner-5">{{cfg[6][5]}}</div>
      <div class="gong inner inner-6">{{cfg[6][6]}}</div>
      <div class="gong inner inner-7">{{cfg[6][7]}}</div>
      <div class="gong inner inner-8">{{cfg[6][8]}}</div>
      <div class="gong inner inner-9">{{cfg[6][9]}}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
    DI_ZHI,
    JIA_ZI, MEN_F,
    MEN_Z,
    QI_YI,
    SHEN_Z,
    TIAN_GAN, XING_F, XING_Z,
    XUN_SHOU,
    YANG_GAN,
    YANG_ZHI,
    YIN_ZHI
} from '../assets/constant.js'

let shiGanGong = 0
let shiZhiGong = 0
let xunShouGong = 0

const shiGan = ref('辛')
const shiZhi = ref('未')
const juShu = ref(-6)
const xunShou = ref('')
const zhiFu = ref('')
const zhiShi = ref('')
const cfg = ref({1:{},2:{},3:{},4:{},5:{},6:{},7:{},8:{},9:{}})

function paiQiYi() {
    const qiYiList = juShu.value > 0 ? QI_YI : [QI_YI[0], ...QI_YI.slice().reverse()]
    for (let i = 0; i < 9; i++) {
        cfg.value[(i + Math.abs(juShu.value) - 1) % 9 + 1][9] = qiYiList[i]
    }
}
function paiFeiPan() {
    zhiFu.value = XING_F[xunShouGong - 1]
    zhiShi.value = MEN_F[xunShouGong - 1]
    cfg.value[shiGanGong][5] = zhiFu.value
    cfg.value[shiZhiGong][8] = zhiShi.value
    // for (let i = 0; i < 9; i++) {
    //     const index = XING_F.indexOf(zhiFu.value)
    //     cfg.value[][5]
    // }
}
function paiZhuanPan() {
    const transer = [1, 8, 3, 4, 9, 2, 7, 6]
    zhiFu.value = xunShouGong === 5 ? '禽' : XING_Z[transer.indexOf(xunShouGong)]
    zhiShi.value = xunShouGong === 5 ? '中' : MEN_Z[transer.indexOf(xunShouGong)]
}
function paiPan(type) {
    if (!shiGan.value || !shiZhi.value || !juShu.value) return
    cfg.value = {1:{},2:{},3:{},4:{},5:{},6:{},7:{},8:{},9:{}}
    paiQiYi()
    const jiaZiIndex = JIA_ZI.indexOf(shiGan.value + shiZhi.value)
    xunShou.value = XUN_SHOU[(jiaZiIndex - jiaZiIndex % 10) / 10]
    xunShouGong = +Object.keys(cfg.value).find(k => cfg.value[k][9] === xunShou.value[2])
    shiGanGong = +Object.keys(cfg.value).find(k => cfg.value[k][9] === shiGan.value)
    shiZhiGong = (xunShouGong + jiaZiIndex % 10 * (juShu.value > 0 ? 1 : -1) + 9 - 1) % 9 + 1
    if (type === 'f') paiFeiPan()
    else if (type === 'z') paiZhuanPan()
}
</script>

<style scoped>
select, button {
    margin: 5px;
}
.pan {
    display: flex;
    flex-wrap: wrap;
    height: 30vh;
    width: 30vh;
}
.gong {
    display: flex;
    flex: 1 1 32%;
    flex-wrap: wrap;
    height: 33%;
    border: 1px solid;
}
.inner {
    border: 0;
    align-items: center;
    justify-content: center;
}
</style>
