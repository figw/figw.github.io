<template>
  <div class="header">
    <select v-model="shiGan" @change="shiZhi=''">
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
    <div>
      <span>旬首：{{xunShou}}&emsp;&emsp;值符：{{zhiFu}}&emsp;&emsp;值使：{{zhiShi}}</span>
    </div>
  </div>
  <div class="pan">
    <div v-for="i in [4,9,2,3,5,7,8,1,6]" class="gong" :class="'gong-'+i">
      <div v-for="j in 9" class="gong inner" :class="'inner-'+j">{{cfg[i][j]}}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
    TIAN_GAN, YANG_GAN, YIN_GAN,
    DI_ZHI, YANG_ZHI, YIN_ZHI,
    JIA_ZI,
} from '../assets/constant.js'

let shiGanGong = 0
let shiZhiGong = 0
let xunShouGong = 0

const shiGan = ref('')
const shiZhi = ref('')
const juShu = ref(0)
const xunShou = ref('')
const zhiFu = ref('')
const zhiShi = ref('')
const cfg = ref({1:{},2:{},3:{},4:{},5:{},6:{},7:{},8:{},9:{}})

const $ji = () => juShu.value > 0 ? 8 : 2
const $jiXing = () => juShu.value > 0 ? '任' : '芮'
const $jiMen = () => juShu.value > 0 ? '生' : '死'

function paiQiYi() { // 地盘奇仪
    const qiYiList = juShu.value > 0 ? QI_YI : [QI_YI[0], ...QI_YI.slice().reverse()]
    for (let i = 0; i < 9; i++) {
        cfg.value[(i + Math.abs(juShu.value) - 1) % 9 + 1][9] = qiYiList[i]
    }
}

function paiFeiPan() { // 飞盘
    zhiFu.value = XING_F[xunShouGong - 1]
    zhiShi.value = xunShouGong === 5 ? $jiMen() : [...MEN_F.slice(0, 4), '', ...MEN_F.slice(-4)][xunShouGong - 1]
    for (let i = 0; i < 9; i++) { // 星
        cfg.value[(shiGanGong + i - 1) % 9 + 1][5] = [...XING_F, ...XING_F][XING_F.indexOf(zhiFu.value) + i]
    }
    for (let i = 0; i < 9; i++) { // 天盘奇仪
        cfg.value[+Object.keys(cfg.value).find(k => cfg.value[k][5] === XING_F[i])][6] = cfg.value[i + 1][9]
    }
    let mark = 0
    for (let i = 0; i < 8; i++) { // 门
        if (shiZhiGong === 5) shiZhiGong = $ji()
        if ((shiZhiGong + i) % 9 === 5) mark = 1
        cfg.value[(shiZhiGong + i + mark - 1) % 9 + 1][8] = [...MEN_F, ...MEN_F][MEN_F.indexOf(zhiShi.value) + i]
    }
    for (let i = 0; i < 9; i++) { // 神
        const shenList = juShu.value > 0 ? SHEN_F : [SHEN_F[0], ...SHEN_F.slice().reverse()]
        cfg.value[(shiGanGong + i - 1) % 9 + 1][2] = shenList[i]
    }
}

function paiZhuanPan() { // 转盘
    const transer = [1,8,3,4,9,2,7,6, 1,8,3,4,9,2,7,6]
    zhiFu.value = xunShouGong === 5 ? '禽' : XING_Z[transer.indexOf(xunShouGong)]
    zhiShi.value = xunShouGong === 5 ? $jiMen() : MEN_Z[transer.indexOf(xunShouGong)]
    for (let i = 0; i < 8; i++) { // 星
        const j = transer[transer.indexOf(shiGanGong === 5 ? $ji() : shiGanGong) + i]
        cfg.value[j][5] = [...XING_Z, ...XING_Z][XING_Z.indexOf(zhiFu.value === '禽' ? $jiXing() : zhiFu.value) + i]
    }
    for (let i = 0; i < 8; i++) { // 天盘奇仪
        cfg.value[+Object.keys(cfg.value).find(k => cfg.value[k][5] === XING_Z[i])][6] = cfg.value[transer[i]][9]
    }
    for (let i = 0; i < 8; i++) { // 门
        const j = transer[transer.indexOf(shiZhiGong === 5 ? $ji() : shiZhiGong) + i]
        cfg.value[j][8] = [...MEN_Z, ...MEN_Z][MEN_Z.indexOf(zhiShi.value) + i]
    }
    for (let i = 0; i < 8; i++) { // 神
        const j = transer[transer.indexOf(shiGanGong === 5 ? $ji() : shiGanGong) + i]
        const shenList = juShu.value > 0 ? SHEN_Z : [SHEN_Z[0], ...SHEN_Z.slice().reverse()]
        cfg.value[j][2] = shenList[i]
    }
    // 天禽寄宫
    const jiGongNum = +Object.keys(cfg.value).find(k => cfg.value[k][5] === $jiXing())
    cfg.value[jiGongNum][4] = '禽' + cfg.value[5][9]
}

function paiPan(type) {
    if (!shiGan.value || !shiZhi.value || !juShu.value) return
    cfg.value = {1:{},2:{},3:{},4:{},5:{},6:{},7:{},8:{},9:{}}
    paiQiYi()
    const jiaZiIndex = JIA_ZI.indexOf(shiGan.value + shiZhi.value)
    xunShou.value = XUN_SHOU[(jiaZiIndex - jiaZiIndex % 10) / 10]
    xunShouGong = +Object.keys(cfg.value).find(k => cfg.value[k][9] === xunShou.value[2])
    shiGanGong = +Object.keys(cfg.value).find(k => cfg.value[k][9] === shiGan.value) || xunShouGong
    shiZhiGong = (xunShouGong + jiaZiIndex % 10 * (juShu.value > 0 ? 1 : -1) + 9 - 1) % 9 + 1
    if (type === 'f') paiFeiPan()
    else if (type === 'z') paiZhuanPan()
}

const QI_YI = ['戊', '己', '庚', '辛', '壬', '癸', '丁', '丙', '乙']
const XUN_SHOU = ['甲子戊', '甲戌己', '甲申庚', '甲午辛', '甲辰壬', '甲寅癸']
const XING_F = ['蓬', '芮', '冲', '辅', '禽', '心', '柱', '任', '英']
const XING_Z = ['蓬', '任', '冲', '辅', '英', '芮', '柱', '心'] // 天禽另寄
const MEN_F = ['休', '死', '伤', '杜', '开', '惊', '生', '景']
const MEN_Z = ['休', '生', '伤', '杜', '景', '死', '惊', '开']
const SHEN_F = ['符', '蛇', '阴', '合', '陈', '常', '雀', '地', '天']
const SHEN_Z = ['符', '蛇', '阴', '合', '虎', '武', '地', '天']
</script>

<style scoped>
.header {
    select, button, span {
        margin: 10px;
        font-size: 18px;
    }
}

.pan {
    display: flex;
    flex-wrap: wrap;
    height: 95vw;
    width: 95vw;
    max-height: 500px;
    max-width: 500px;
    margin: 10px 2.5vw;
    font-size: 18px;
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
