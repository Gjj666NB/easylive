<template>
  <div class="comment-panel">
    <VideoSearchSelect @loadData="loadData4VideoSelect"></VideoSearchSelect>
    <Table
      ref="tableInfoRef"
      :columns="columns"
      :fetch="loadDataList"
      :dataSource="tableData"
      :options="tableOptions"
      :extHeight="tableOptions.extHeight"
    >
      <template #slotComment="{ index, row }">
        <div class="comment-info">
          <Avatar :avatar="row.avatar" :userId="row.userId"></Avatar>
          <div class="comment">
            <div>
              <router-link
                target="_blank"
                class="a-link nick-name"
                :to="`/user/${row.userId}`"
              >
                {{ row.nickName }}
              </router-link>
              <template v-if="row.replyUserId">
                回复@
                <router-link
                  target="_blank"
                  class="a-link nick-name"
                  :to="`/user/${row.replyUserId}`"
                >
                  {{ row.replyNickName }}
                </router-link>
                的评论
              </template>
            </div>
            <div class="content">{{ row.content }}</div>
            <div v-if="row.imgPath" class="image-show">
              <Cover
                :source="row.imgPath + proxy.imageThumbnailSuffix"
                preview="true"
                fit="cover"
              ></Cover>
            </div>
            <div class="time-info">
              <div class="time">{{ row.postTime }}</div>
              <div>
                <div
                  class="iconfont icon-delete"
                  @click="delComment(row.commentId)"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #slotVideo="{ index, row }">
        <router-link
          :to="`/video/${row.videoId}`"
          target="_blank"
          class="a-link"
          ><div class="video-name">【{{ row.videoName }}】</div>
          <Cover :source="row.videoCover"></Cover>
        </router-link> </template
    ></Table>
  </div>
</template>

<script setup>
import VideoSearchSelect from "./VideoSearchSelect.vue";
import { ref, reactive, getCurrentInstance, nextTick } from "vue";
const { proxy } = getCurrentInstance();
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

const currentVideoId = ref();
const loadData4VideoSelect = () => {
  currentVideoId.value = videoId;
  loadDataList();
};

const columns = [
  {
    label: "评论信息",
    scopedSlots: "slotComment",
  },
  {
    label: "视频信息",
    scopedSlots: "slotVideo",
    width: 150,
  },
];

const tableInfoRef = ref();
const tableOptions = ref({
  extHeight: 10,
});

const tableData = ref({});
const loadDataList = async (videoId) => {
  let params = {
    pageNo: tableData.value.pageNo,
    pageSize: tableData.value.pageSize,
    videoId: currentVideoId.value,
  };
  let result = await proxy.Request({
    url: proxy.Api.czLoadComment,
    params: params,
  });
  if (!result) {
    return;
  }
  Object.assign(tableData.value, result.data);
};

const delComment = (commentId) => {
  proxy.Confirm({
    message: "确定要删除吗？",
    okfun: async () => {
      let result = await proxy.Request({
        url: proxy.Api.czDelComment,
        params: {
          commentId,
        },
      });
      if (!result) {
        return;
      }
      proxy.Message.success("删除成功");
      loadDataList();
    },
  });
};
</script>

<style lang="scss" scoped>
.comment-panel {
  .comment-info {
    display: flex;
    .comment {
      margin-left: 10px;
    }
    .time-info {
      display: flex;
      font-size: 12px;
      .iconfont {
        margin-left: 5px;
        font-size: 13px;
        cursor: pointer;
      }
    }
  }
  .video-name {
    text-decoration: none;
    color: var(--link);
    font-size: 13px;
    margin-top: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.image-show {
  width: 100px;
  height: 100px;
  overflow: hidden;
  margin: 5px 0px;
}
</style>
