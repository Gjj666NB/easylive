<template>
  <el-config-provider :locale="locale" :message="config">
    <router-view />
  </el-config-provider>
</template>

<script setup>
import {
  ref,
  reactive,
  getCurrentInstance,
  nextTick,
  onBeforeMount,
} from "vue";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
const locale = zhCn;
const config = reactive({
  max: 1,
});
</script>

<style scoped>
</style>