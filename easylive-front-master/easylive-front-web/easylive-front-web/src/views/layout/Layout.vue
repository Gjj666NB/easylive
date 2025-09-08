<template>
  <div
    class="main-container"
    :style="{
      'max-width': proxy.bodyMaxWidth + 'px',
      'min-width': proxy.bodyMinWidth + 'px',
    }"
  >
    <div
      class="header"
      v-show="navActionStore.showHeader"
      :style="{
        'background-image': `url(${
          backgroundImage
            ? backgroundImage
            : '/banner_bg.png'
        })`,
      }"
    >
      <LayoutHeader :hotSearchList="hotSearchList"></LayoutHeader>
    </div>
    <div
      class="header-fixed"
      v-if="
        (navActionStore.fixedHeader && showFixedHeader) ||
        navActionStore.forceFixedHeader
      "
    >
      <LayoutHeader theme="dark" :hotSearchList="hotSearchList"></LayoutHeader>
    </div>
    <!-- 固定在顶部 -->
    <div
      class="category-fixed"
      v-show="navActionStore.fixedCategory && showFixedCategory"
      :style="{
        'max-width': proxy.bodyMaxWidth + 'px',
        'min-width': proxy.bodyMinWidth + 'px',
      }"
      @mousemove="lineCategoryMouseHandler(1)"
      @mouseout="lineCategoryMouseHandler(0)"
    >
      <div class="category-fixed-inner">
        <Category :showType="1" :mouseOver="mouseOver"></Category>
      </div>
    </div>
    <div
      class="body-container"
      :style="{
        'max-width': proxy.bodyMaxWidth + 'px',
        'min-width': proxy.bodyMinWidth + 'px',
      }"
    >
      <div class="category" v-show="navActionStore.showCategory">
        <Category :showType="0"></Category>
      </div>
      <div class="body-main">
        <router-view></router-view>
      </div>
    </div>
    <Account></Account>
  </div>
</template>

<script setup>
import { mitter } from "@/eventbus/eventBus.js";
import Category from "./Category.vue";
import Account from "../account/Account.vue";
import LayoutHeader from "./LayoutHeader.vue";
import {
  ref,
  reactive,
  getCurrentInstance,
  onMounted,
  onUnmounted,
  computed,
  watch,
} from "vue";
import { useRouter, useRoute } from "vue-router";

import { useCategoryStore } from "@/stores/categoryStore.js";
const categoryStore = useCategoryStore();

const navActionStore = useNavAction();
import { useNavAction } from "@/stores/navActionStore.js";

import { useLoginStore } from "@/stores/loginStore.js";
const loginStore = useLoginStore();

const { proxy } = getCurrentInstance();
const router = useRouter();
const route = useRoute();

const mouseOver = ref(false);
const lineCategoryMouseHandler = (type) => {
  mouseOver.value = type == 1;
};

onMounted(() => {
  window.addEventListener("scroll", windowScrollHandler);
  window.addEventListener("resize", windowReSizeHandler);
});

onUnmounted(() => {
  window.removeEventListener("scroll", windowScrollHandler);
  window.removeEventListener("resize", windowReSizeHandler);
});

const showFixedHeader = ref(false);
const showFixedCategory = ref(false);

const showFixedTopHandler = (curScrollTop) => {
  if (curScrollTop <= 40) {
    showFixedHeader.value = false;
  } else {
    showFixedHeader.value = true;
  }
  if (curScrollTop > 250) {
    showFixedCategory.value = true;
  } else {
    showFixedCategory.value = false;
  }
};

const windowScrollHandler = () => {
  var curScrollTop = window.scrollY;
  showFixedTopHandler(curScrollTop);
  mitter.emit("windowScroll", curScrollTop);
};

const windowReSizeHandler = () => {
  mitter.emit("windowResize");
};

const backgroundImage = computed(() => {
  const background = categoryStore.currentPCategory
    ? categoryStore.currentPCategory.background
    : null;

  if (background) {
    return proxy.Api.sourcePath + background;
  } else {
    return null;
  }
});

const hotSearchList = ref([]);
const getSearchKeywordTop = async () => {
  let result = await proxy.Request({
    url: proxy.Api.getHotWordTop,
  });
  if (!result) {
    return;
  }
  hotSearchList.value = result.data;
};
getSearchKeywordTop();

const getNoReadCount = async () => {
  if (Object.keys(loginStore.userInfo).length == 0) {
    return;
  }
  let result = await proxy.Request({
    url: proxy.Api.getNoReadCount,
  });
  if (!result) {
    return;
  }
  loginStore.saveMessageNoReadCount(result.data);
};

watch(
  () => loginStore.userInfo,
  (newVal, oldVal) => {
    if (newVal) {
      getNoReadCount();
    }
  },
  { immediate: true, deep: true }
);
</script>

<style>
body {
  background-color: #ededed !important;
}
</style>
<style lang="scss" scoped>
.main-container {
  position: relative;
  margin: 0px auto;
  background: #fff;
  min-height: calc(100vh);
  .header {
    margin: 0px auto;
    height: 180px;
    background-color: #7c9ce1;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    position: relative;
  }
  .header-fixed {
    position: fixed;
    width: 100%;
    z-index: 1001;
    top: 0px;
    background: #fff;
    height: 64px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  }
  .category-fixed {
    position: fixed;
    z-index: 1000;
    top: 64px;
    width: 100%;
    background: #fff;
    padding: 10px 150px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
    .category-fixed-inner {
      margin: 0px auto;
    }
  }
  .body-container {
    padding: 0px var(--bodyPadding);
    .category {
      margin-top: 20px;
    }
  }
}

@media screen and (max-width: 1500px) {
  .main-container {
    .body-container {
      padding: 0px 60px;
    }
  }
}
</style>
