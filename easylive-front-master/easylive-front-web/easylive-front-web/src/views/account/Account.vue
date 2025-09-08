<template>
  <Dialog
    :show="loginStore.showLogin"
    :buttons="dialogConfig.buttons"
    width="850px"
    height="500px"
    :top="130"
    :padding="0"
    :showCancel="false"
    @close="closeDialog"
  >
    <div class="dialog-panel">
      <div class="bg">
        <img src="../../assets/login_bg.avif" alt="" />
      </div>
      <el-form
        class="login-register"
        :model="formData"
        :rules="rules"
        ref="formDataRef"
        @submit.prevent
      >
        <div class="tab-panel">
          <div :class="[opType == 1 ? 'active' : '']" @click="showPanel(1)">
            登录
          </div>
          <el-divider direction="vertical"></el-divider>
          <div :class="[opType == 0 ? 'active' : '']" @click="showPanel(0)">
            注册
          </div>
        </div>
        <el-form-item prop="email">
          <el-input
            clearable
            placeholder="请输入邮箱"
            v-model.trim="formData.email"
            :maxlength="150"
            size="large"
          >
            <template #prefix>
              <span class="iconfont icon-account"></span> </template
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" v-if="opType == 1">
          <el-input
            show-password
            clearable
            placeholder="请输入密码"
            v-model.trim="formData.password"
            size="large"
          >
            <template #prefix>
              <span class="iconfont icon-password"></span> </template
          ></el-input>
        </el-form-item>
        <div v-if="opType == 0">
          <el-form-item prop="nickName">
            <el-input
              clearable
              placeholder="请输入昵称"
              v-model.trim="formData.nickName"
              :maxlength="150"
              size="large"
            >
              <template #prefix>
                <span class="iconfont icon-account"></span> </template
            ></el-input>
          </el-form-item>
          <el-form-item prop="registerPassword">
            <el-input
              show-password
              clearable
              placeholder="请输入密码"
              v-model.trim="formData.registerPassword"
              size="large"
            >
              <template #prefix>
                <span class="iconfont icon-password"></span> </template
            ></el-input>
          </el-form-item>
          <el-form-item prop="reRegisterPassword">
            <el-input
              show-password
              clearable
              placeholder="请再次输入密码"
              v-model.trim="formData.reRegisterPassword"
              size="large"
            >
              <template #prefix>
                <span class="iconfont icon-password"></span> </template
            ></el-input>
          </el-form-item>
        </div>
        <el-form-item prop="checkCode">
          <div class="check-code-panel">
            <div class="input">
              <el-input
                clearable
                placeholder="请输入验证码"
                v-model.trim="formData.checkCode"
                size="large"
              >
                <template #prefix>
                  <span class="iconfont icon-checkcode"></span> </template
              ></el-input>
            </div>
            <div class="right-panel">
              <img :src="checkCodeInfo.checkCode" @click="changeCheckCode" />
            </div>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="doSubmit"
            class="login-btn"
            size="large"
          >
            <span v-if="opType == 1">登录</span>
            <span v-if="opType == 0">注册</span>
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </Dialog>
</template>

<script setup>
import { useLoginStore } from "@/stores/loginStore";
import {
  ref,
  reactive,
  getCurrentInstance,
  onMounted,
  nextTick,
  onUpdated,
} from "vue";
import { useRouter, useRoute } from "vue-router";
import md5 from "js-md5";
const { proxy } = getCurrentInstance();
const router = useRouter();
const route = useRoute();
const loginStore = useLoginStore();

const checkCodeInfo = ref({});
const changeCheckCode = async () => {
  let result = await proxy.Request({
    url: proxy.Api.checkCode,
  });
  if (!result) {
    return;
  }
  checkCodeInfo.value = result.data;
};

const dialogConfig = ref({
  buttons: [],
});

const formData = ref({});
const formDataRef = ref();

// 验证两次输入的密码是否一致
const checkRePassword = (rule, value, callback) => {
  if (value !== formData.value.registerPassword) {
    callback(new Error(rule.message));
  } else {
    callback();
  }
};
// 表单验证规则
const rules = {
  email: [
    { required: true, message: "请输入邮箱" },
    { validator: proxy.Verify.email, message: "请输入正确的邮箱" },
  ],
  password: [{ required: true, message: "请输入密码" }],
  emailCode: [{ required: true, message: "请输入邮箱验证码" }],
  nickName: [{ required: true, message: "请输入昵称" }],
  registerPassword: [
    { required: true, message: "请输入密码" },
    {
      validator: proxy.Verify.password,
      message: "密码只能是数字，字母，特殊字符 8-18位",
    },
  ],
  reRegisterPassword: [
    { required: true, message: "请再次输入密码" },
    {
      validator: checkRePassword,
      message: "两次输入的密码不一致",
    },
  ],
  checkCode: [{ required: true, message: "请输入图片验证码" }],
};

const opType = ref(1);
const showPanel = (type) => {
  opType.value = type;
  if (loginStore.showLogin) {
    resetForm();
  }
};

const doSubmit = () => {
  formDataRef.value.validate(async (valid) => {
    if (!valid) {
      return;
    }
    let params = {};
    Object.assign(params, formData.value);
    params.checkCodeKey = checkCodeInfo.value.checkCodeKey;
    if (opType.value == 1) {
      params.password = md5(params.password);
    }
    let result = await proxy.Request({
      url: opType.value == 1 ? proxy.Api.login : proxy.Api.register,
      params,
      errorCallback: () => {
        changeCheckCode();
      },
    });
    if (!result) {
      return;
    }
    if (opType.value == 1) {
      proxy.Message.success("登录成功");
      loginStore.setLogin(false);
      loginStore.saveUserInfo(result.data);
    } else if (opType.value == 0) {
      proxy.Message.success("注册成功,请登录");
      showPanel(1);
    }
  });
};

//重置表单
const resetForm = () => {
  changeCheckCode();
  nextTick(() => {
    formDataRef.value.resetFields();
    formData.value = {};
  });
};

const closeDialog = () => {
  loginStore.setLogin(false);
};

onUpdated(() => {
  showPanel(1);
});

onMounted(() => {
  showPanel(1);
});
</script>

<style lang="scss" scoped>
.dialog-panel {
  display: flex;
  align-items: center;
  justify-content: center;
  .bg {
    width: 300px;
    height: 430px;
    overflow: hidden;
    img {
      width: 100%;
    }
    margin-right: 70px;
  }
  .login-register {
    width: 350px;
    .tab-panel {
      margin: 10px auto;
      display: flex;
      width: 130px;
      font-size: 18px;
      align-items: center;
      justify-content: space-around;
      cursor: pointer;
      .active {
        color: var(--blue2);
      }
    }
    .no-account {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
    .login-btn {
      width: 100%;
    }
    .bottom-btn {
      margin-bottom: 0;
    }
  }
}
.check-code-panel {
  display: flex;
  align-items: center;
  width: 100%;
  .input {
    flex: 1;
  }
  .right-panel {
    margin-left: 5px;
    cursor: pointer;
  }
}
</style>
