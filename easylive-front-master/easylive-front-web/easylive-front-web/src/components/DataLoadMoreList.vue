<template>
  <div
    :class="[layoutType == 'grid' ? 'data-list-grid' : '']"
    :style="{ 'grid-template-columns': `repeat(${gridCount}, 1fr)` }"
  >
    <template v-for="item in dataSource.list">
      <slot :data="item"></slot>
    </template>
  </div>
  <div class="bottom-loading" v-if="loading">
    <img :src="'/playing.gif'" /> 数据加载中...
  </div>
  <div
    class="reach-bottom"
    v-if="
      dataSource.pageNo >= dataSource.pageTotal &&
      !loading &&
      dataSource.list.length > 0
    "
  >
    {{ loadEndMsg }}
  </div>
  <NoData v-if="dataSource.list && dataSource.list.length == 0"></NoData>
</template>
  
<script setup>
import { mitter } from "@/eventbus/eventBus.js";
import {
  ref,
  reactive,
  getCurrentInstance,
  nextTick,
  onUnmounted,
  onMounted,
} from "vue";
const { proxy } = getCurrentInstance();
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

const props = defineProps({
  dataSource: {
    type: Object,
    default: {},
  },
  loading: {
    type: Boolean,
  },
  loadEndMsg: {
    type: String,
    default: "已经到底啦~~",
  },
  layoutType: {
    type: String,
    default: "grid",
  },
  gridCount: {
    type: Number,
    default: 5,
  },
});

const emit = defineEmits(["loadData"]);
const scrollHandler = (curScrollTop) => {
  if (window.innerHeight + curScrollTop < document.body.offsetHeight) {
    return;
  }
  if (props.loading || props.dataSource.pageNo >= props.dataSource.pageTotal) {
    return;
  }
  props.dataSource.pageNo++;
  emit("loadData");
};

onMounted(() => {
  mitter.on("windowScroll", (curScrollTop) => {
    scrollHandler(curScrollTop);
  });
});

onUnmounted(() => {
  mitter.off("windowScroll");
});
</script>

<style lang="scss" scoped>
.data-list-grid {
  margin-top: 20px;
  display: grid;
  grid-gap: 20px;
  padding-bottom: 10px;
}

.reach-bottom {
  text-align: center;
  line-height: 40px;
  color: var(--text3);
}

.bottom-loading {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text3);
  img {
    width: 20px;
    margin-right: 10px;
  }
}
</style>

