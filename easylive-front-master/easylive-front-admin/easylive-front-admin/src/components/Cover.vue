<template>
  <div
    class="image-panel"
    ref="coverRef"
    :style="{
      'border-radius': borderRadius,
      width: width ? width + 'px' : '100%',
      height: width ? width * scale + 'px' : '100%',
    }"
  >
    <el-image
      :lazy="lazy"
      :src="fileSource || fileImage"
      :fit="fit"
      v-if="fileImage || fileSource"
      @click="showViewerHandler"
    >
      <template #placeholder>
        <div class="loading" :style="{ height: loadingHeight + 'px' }">
          <img :src="proxy.Utils.getLocalImage('playing.gif')" alt="" />
        </div>
      </template>
      <template #error>
        <img
          :src="proxy.Utils.getLocalImage(img404)"
          class="el-image__inner"
          :style="{ 'object-fit': fit }"
        />
      </template>
    </el-image>
    <div v-else class="no-image">请选择图片</div>
    <el-image-viewer
      :hide-on-click-model="true"
      @close="
        () => {
          showViewer = false;
        }
      "
      v-if="showViewer"
      :url-list="imageList"
      :teleported="true"
    ></el-image-viewer>
  </div>
</template>

<script setup>
import {
  ref,
  reactive,
  getCurrentInstance,
  nextTick,
  computed,
  onMounted,
} from "vue";
const { proxy } = getCurrentInstance();
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

const props = defineProps({
  source: {
    type: [String, File],
  },
  width: {
    type: Number,
  },
  fit: {
    type: String,
    default: "scale-down",
  },
  preview: {
    type: Boolean,
    default: false,
  },
  img404: {
    type: String,
    default: "404_cover.png",
  },
  defaultImage: {
    type: String,
  },
  borderRadius: {
    type: String,
    default: "5px",
  },
  lazy: {
    type: Boolean,
    default: true,
  },
  scale: {
    type: Number,
    default: 0.6,
  },
});

const fileImage = ref();
const fileSource = computed(() => {
  if (!props.source && !props.defaultImage) {
    fileImage.value = null;
    return null;
  }
  if (!props.source && props.defaultImage) {
    return proxy.Utils.getLocalImage(props.defaultImage);
  }
  if (props.source instanceof File) {
    let img = new FileReader();
    img.readAsDataURL(props.source);
    img.onload = ({ target }) => {
      fileImage.value = target.result;
    };
    return;
  } else if (typeof props.source === "string") {
    return `${proxy.Api.sourcePath}${props.source}`;
  } else {
    return;
  }
});

const imageList = computed(() => {
  if (!props.preview) {
    return [];
  }
  const sourceImg =
    proxy.Api.sourcePath + props.source.replace(proxy.imageThumbnailSuffix, "");
  return [sourceImg];
});

const showViewer = ref(false);
const showViewerHandler = () => {
  if (!props.preview) {
    return;
  }
  showViewer.value = true;
};

const coverRef = ref();
const loadingHeight = ref();
onMounted(() => {
  loadingHeight.value = coverRef.value.clientWidth * props.scale;
});
</script>

<style lang="scss" scoped>
.image-panel {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  background-color: #f8f8f8;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  :deep(.el-image) {
    width: 100%;
    height: 100%;
  }
  :deep(.is-loading) {
    display: none;
  }
  :deep(.el-image__wrapper) {
    position: relative;
    vertical-align: top;
    width: 100%;
    height: 100%;
    display: flex;
  }
  .icon-image-error {
    margin: 0px auto;
    font-size: 20px;
    color: #838383;
    height: 100%;
  }
  .loading {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 20px;
    }
  }
  .no-image {
    text-align: center;
    color: #9f9f9f;
  }
}
</style>
