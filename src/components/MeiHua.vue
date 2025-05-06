<template>
  <div class="header">
    <select v-model="shangGua">
      <option disabled value="">上卦</option>
      <option v-for="i in BA_GUA" :value="i">{{i}}卦</option>
    </select>
    <select v-model="xiaGua">
      <option disabled value="">下卦</option>
      <option v-for="i in BA_GUA" :value="i">{{i}}卦</option>
    </select>
    <select v-model="shiChen">
      <option disabled value="">时辰</option>
      <option v-for="i in DI_ZHI" :value="i">{{i}}时</option>
    </select>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { BA_GUA, BA_GUA_2_YAO, BA_GUA_2_ALIAS, GUA_64, DI_ZHI } from '../assets/constant.js'

const shangGua = ref('')
const xiaGua = ref('')
const shiChen = ref('')
</script>

<style scoped>
.header {
    select, button, span {
        margin: 10px;
        font-size: 18px;
    }
}
</style>
