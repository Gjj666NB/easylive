<template>
  <div>
    <router-link v-if="userId" :to="`/user/${userId}`" target="_blank">
      <Cover
        :lazy="lazy"
        :width="width"
        :source="avatar"
        :defaultImage="defaultAvatar"
        borderRadius="50%"
        :scale="1"
      ></Cover>
    </router-link>
    <Cover
      v-else
      :lazy="lazy"
      :width="width"
      :source="avatar"
      :defaultImage="defaultAvatar"
      borderRadius="50%"
      :scale="1"
    ></Cover>
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, nextTick } from "vue";
const { proxy } = getCurrentInstance();
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

const defaultAvatar = ref("user.png");
const props = defineProps({
  width: {
    type: Number,
    default: 50,
  },
  avatar: {
    type: String,
  },
  userId: {
    type: String,
  },
  lazy: {
    type: Boolean,
    default: true,
  },
});
</script>

<style lang="scss" scoped>
</style>
