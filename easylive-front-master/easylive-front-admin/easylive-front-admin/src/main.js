import './assets/scss/base.scss'
//图标 图标在附件中
import '@/assets/icon/iconfont.css'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

//引入cookies
import VueCookies from 'vue-cookies'
//全局方法
import Message from '@/utils/Message.js'
import Request from '@/utils/Request.js'
import Confirm from '@/utils/Confirm.js'
import Utils from '@/utils/Utils'
import { Api } from '@/utils/Api.js'

//全局组件
import Dialog from '@/components/Dialog.vue'
import Cover from '@/components/Cover.vue'
import Avatar from '@/components/Avatar.vue'
import Table from "@/components/Table.vue";
import ImageUpload from "@/components/ImageUpload.vue";
import Player from "@/components/Player.vue";

const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.use(createPinia())

app.component("Dialog", Dialog)
app.component("Cover", Cover)
app.component("Avatar", Avatar)
app.component("Table", Table)
app.component("ImageUpload", ImageUpload)
app.component("Player", Player)

app.config.globalProperties.VueCookies = VueCookies;

app.config.globalProperties.Message = Message;
app.config.globalProperties.Request = Request;
app.config.globalProperties.Confirm = Confirm;
app.config.globalProperties.Utils = Utils;
app.config.globalProperties.Api = Api;

app.mount('#app')