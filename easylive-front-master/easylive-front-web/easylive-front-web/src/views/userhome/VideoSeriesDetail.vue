<template>
  <div class="video-list-panel">
    <div class="video-title">
      <router-link :to="`/user/${route.params.userId}/series`" class="a-link">
        合集列表
      </router-link>
      &gt;
      {{ seriesInfo.seriesName }}
    </div>
    <div class="detail-panel">
      <div class="video-detail">
        <div class="count-info">
          <div v-if="myself">{{ videoList.length - 1 }}个视频</div>
          <div v-else>{{ videoList.length }}个视频</div>
          <el-divider direction="vertical" />
          <div>{{ proxy.Utils.formatDate(seriesInfo.updateTime) }}更新</div>
        </div>
        <div class="description">
          {{ seriesInfo.seriesDescription }}
        </div>
      </div>
      <template v-if="myself">
        <el-button type="primary" @click="editSeries">编辑</el-button>
        <el-button type="danger" @click="delSeries">删除</el-button>
      </template>
    </div>
    <VueDraggable
      v-model="videoList"
      @Update="changeSort"
      handle=".move-handler"
      class="video-list"
      draggable=".list-item"
    >
      <template v-for="(item, index) in videoList" :key="item.seriesId">
        <div
          class="video-item-add"
          @click="addVideo"
          v-if="item.seriesId == 'add'"
        >
          <div class="iconfont icon-add"></div>
          <div class="add-info">添加视频</div>
        </div>
        <div class="list-item" v-else>
          <div class="cover">
            <div class="move-handler iconfont icon-move" v-if="myself"></div>
            <Cover :source="item.videoCover" @click="jump(item)"></Cover>
          </div>
          <div class="list-name" @click="jump(item)">{{ item.videoName }}</div>
          <div class="play-count-info">
            <div class="play-count iconfont icon-play2">
              {{ item.playCount }}
            </div>
            <div class="create-time">
              {{ proxy.Utils.formatDate(item.createTime) }}
            </div>
            <el-dropdown>
              <div class="iconfont icon-more" @click.stop v-show="myself"></div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click.stop="delVideo(item)">
                    移除
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </template>
    </VueDraggable>
    <NoData v-if="videoList.length == 0" msg="暂无视频"></NoData>
    <VideoSeriesEdit
      ref="videoSeriesEditRef"
      @reload="getSeriesDetail"
    ></VideoSeriesEdit>
  </div>
</template>

<script setup>
import VideoSeriesEdit from "./VideoSeriesEdit.vue";
import { VueDraggable } from "vue-draggable-plus";
import { ref, reactive, getCurrentInstance, nextTick, computed } from "vue";
const { proxy } = getCurrentInstance();
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

import { useLoginStore } from "@/stores/loginStore.js";
const loginStore = useLoginStore();

const currentUserId = route.params.userId;

const myself = computed(() => {
  return loginStore.userInfo.userId === currentUserId;
});

const seriesInfo = ref({});
const videoList = ref([]);
const getSeriesDetail = async () => {
  let result = await proxy.Request({
    url: proxy.Api.getVideoSeriesDetail,
    params: {
      seriesId: route.params.seriesId,
    },
  });
  if (!result) {
    return;
  }
  seriesInfo.value = result.data.userVideoSeries;
  videoList.value = result.data.userVideoSeriesVideos;
  if (myself.value) {
    videoList.value.unshift({
      seriesId: "add",
    });
  }
};
getSeriesDetail();

const videoSeriesEditRef = ref();
const editSeries = () => {
  videoSeriesEditRef.value.show(seriesInfo.value, 1);
};

const addVideo = () => {
  videoSeriesEditRef.value.show(seriesInfo.value, 2);
};

const changeSort = async () => {
  let videoIds = videoList.value.map((item) => {
    return item.videoId;
  });
  videoIds.splice(0, 1);
  let result = await proxy.Request({
    url: proxy.Api.saveSeriesVideo,
    params: {
      seriesId: route.params.seriesId,
      videoIds: videoIds.join(","),
    },
  });
  if (!result) {
    return;
  }
  proxy.Message.success("排序成功");
};

const delVideo = (item) => {
  proxy.Confirm({
    message: `确定要移除【${item.videoName}】吗？`,
    okfun: async () => {
      let result = await proxy.Request({
        url: proxy.Api.delSeriesVideo,
        params: {
          seriesId: route.params.seriesId,
          videoId: item.videoId,
        },
      });
      if (!result) {
        return;
      }
      proxy.Message.success("移除成功");
      getSeriesDetail();
    },
  });
};

const delSeries = () => {
  proxy.Confirm({
    message: `确定要删除【${seriesInfo.value.seriesName}】吗？`,
    okfun: async () => {
      let result = await proxy.Request({
        url: proxy.Api.delSeries,
        params: {
          seriesId: route.params.seriesId,
        },
      });
      if (!result) {
        return;
      }
      proxy.Message.success("删除成功");
      router.push(`/user/${route.params.userId}/series`);
    },
  });
};
</script>

<style lang="scss" scoped>
.video-list-panel {
  padding: 20px;
  border-radius: 5px;
  background: #fff;
  .video-title {
    font-size: 16px;
  }
  .video-list {
    margin-top: 20px;
    display: grid;
    grid-gap: 20px;
    grid-template-columns: repeat(6, 1fr);
    .video-item-add {
      border-radius: 5px;
      width: 100%;
      height: 150px;
      border: 2px dashed #ddd;
      text-align: center;
      color: var(--text3);
      cursor: pointer;
      .icon-add {
        font-size: 40px;
        padding-top: 40px;
      }
    }
    .list-item {
      .cover {
        position: relative;
        .move-handler {
          width: 100%;
          height: 30px;
          cursor: move;
          position: absolute;
          left: 0px;
          top: 0px;
          background: #fff;
          z-index: 100;
          border-radius: 5px 5px 0px 0px;
          border: 1px solid #ddd;
          display: flex;
          align-items: center;
          justify-content: center;
          display: none;
        }
        &:hover {
          .move-handler {
            display: flex;
          }
        }
      }
      .list-name {
        cursor: pointer;
        font-size: 13px;
        margin-top: 5px;
        height: 35px;
        color: var(--text2);
        margin-top: 10px;
        display: -webkit-box;
        overflow: hidden;
        -webkit-box-orient: vertical;
        text-overflow: -o-ellipsis-lastline;
        text-overflow: ellipsis;
        word-break: break-word !important;
        word-break: break-all;
        line-break: anywhere;
        -webkit-line-clamp: 2;
      }
      .play-count-info {
        margin-top: 5px;
        display: flex;
        color: var(--text3);
        align-items: center;
        font-size: 12px;
        .play-count {
          flex: 1;
          &::before {
            margin-right: 5px;
          }
        }
        .icon-more {
          margin-left: 5px;
          cursor: pointer;
        }
      }
    }
  }
}
.detail-panel {
  padding: 20px 0px;
  font-size: 13px;
  color: var(--text3);
  border-bottom: 1px solid #ddd;
  display: flex;
  .video-detail {
    flex: 1;
    .count-info {
      display: flex;
      align-items: center;
    }
    .description {
      margin-top: 10px;
    }
  }
}
</style>
