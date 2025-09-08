<template>
  <VideoItem
    v-for="item in dataList"
    :data="item"
    :layoutType="1"
    :marginTop="20"
  ></VideoItem>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, nextTick, inject } from "vue";
const { proxy } = getCurrentInstance();
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

const videoInfo = inject("videoInfo");
const dataList = ref([]);
const loadDataList = async () => {
  let result = await proxy.Request({
    url: proxy.Api.getVideoRecommend,
    params: {
      keyWord: videoInfo.value.videoName,
      videoId: videoInfo.value.videoId,
    },
  });
  if (!result) {
    return;
  }
  dataList.value = result.data;
};
loadDataList();
</script>

<style lang="scss" scoped>
</style>

