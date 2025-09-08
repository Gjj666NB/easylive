<template>
  <div>
    <el-dialog
      :model-value="show"
      :show-close="showClose"
      :draggable="draggable"
      :close-on-click-modal="false"
      :title="title"
      :width="width"
      :top="top + 'px'"
      class="custom-dialog"
      @close="close"
    >
      <template #header="{ close, titleId, titleClass }">
        <div v-if="title" class="title">{{ title }}</div>
        <slot v-else name="header"></slot>
      </template>
      <div
        class="dialog-body"
        :style="{
          height: height ? height : maxHeight + 'px',
          padding: padding + 'px',
        }"
      >
        <slot></slot>
      </div>
      <template v-if="(buttons && buttons.length > 0) || showCancel">
        <div class="dialog-footer">
          <el-button link @click="close" v-if="showCancel">取消</el-button>
          <el-button
            v-for="btn in buttons"
            :type="btn.type || 'primary'"
            @click="btn.click"
            >{{ btn.text }}</el-button
          >
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
const props = defineProps({
  draggable: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
  },
  show: {
    type: Boolean,
    default: false,
  },
  showClose: {
    type: Boolean,
    default: true,
  },
  showCancel: {
    type: Boolean,
    default: true,
  },
  top: {
    type: Number,
    default: 50,
  },
  width: {
    type: String,
    default: "30%",
  },
  buttons: {
    type: Array,
    default: [],
  },
  padding: {
    type: Number,
    default: 15,
  },
  height: {
    type: String,
    default: "30%",
  },
});

const maxHeight = window.innerHeight - props.top - 120 - 100;
const emit = defineEmits();
const close = () => {
  emit("close");
};
</script>


<style lang="scss">
.custom-dialog {
  padding: 0px !important;
  margin-bottom: 5px !important;
  .el-dialog__header {
    padding: 16px;
  }
  .title {
    font-size: 20px;
  }
  .dialog-body {
    min-height: 80px;
    overflow: auto;
    overflow-x: hidden;
    padding: 20px;
  }
  .dialog-footer {
    border-top: 1px solid #ddd;
    text-align: right;
    padding: 5px 20px;
  }
}
</style>
