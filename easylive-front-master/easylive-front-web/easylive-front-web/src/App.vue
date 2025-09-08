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
const { proxy } = getCurrentInstance();
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import VueCookies from "vue-cookies";
import { Api } from "@/utils/Api.js";
import Request from "@/utils/Request.js";

import { useLoginStore } from "@/stores/loginStore.js";
const loginStore = useLoginStore();

import { useCategoryStore } from "@/stores/categoryStore.js";
const categoryStore = useCategoryStore();

import { useSysSettingStore } from "@/stores/sysSettingStore.js";
const sysSettingStore = useSysSettingStore();

const locale = zhCn;
const config = reactive({
  max: 1,
});

//获取系统设置信息
const getSysSetting = async () => {
  let result = await proxy.Request({
    url: Api.getSysSetting,
  });
  if (!result) {
    return;
  }
  sysSettingStore.saveSetting(result.data);
};

const autoLogin = async () => {
  const token = VueCookies.get("webToken");
  if (!token) {
    return;
  }
  let result = await Request({
    url: Api.autoLogin,
  });
  if (!result) {
    return;
  }
  saveUserInfo(result.data);
};

const saveUserInfo = (userInfo) => {
  if (!userInfo) {
    loginStore.saveUserInfo({});
  } else {
    loginStore.saveUserInfo(userInfo);
  }
};

let categoryList = [];
let categoryMap = {};

const loadCategory = async () => {
  let result = await Request({
    url: Api.loadAllCategory,
  });
  if (!result) {
    return;
  }
  categoryList = result.data;
  result.data.forEach((item) => {
    categoryMap[item.categoryCode] = item;
    item.children.forEach((child) => {
      categoryMap[child.categoryCode] = child;
    });
  });
  categoryStore.saveCategoryList(categoryList);
  categoryStore.saveCategoryMap(categoryMap);
};

const getDeviceId = async () => {
  let deviceId = VueCookies.get("deviceId");
  if (!deviceId) {
    const fpPromise = await FingerprintJS.load();
    const result = await fpPromise.get();
    deviceId = result.visitorId;
    VueCookies.set("deviceId", deviceId, -1);
  }
  loginStore.saveDeviceId(deviceId);
};

onBeforeMount(() => {
  autoLogin();
  loadCategory();
  getDeviceId();
  getSysSetting();
});
</script>

<style scoped>
</style>