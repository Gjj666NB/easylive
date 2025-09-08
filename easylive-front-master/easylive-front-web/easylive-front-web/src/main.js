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
import Verify from '@/utils/Verify.js'
import Message from '@/utils/Message.js'
import Request from '@/utils/Request.js'
import Confirm from '@/utils/Confirm.js'
import Utils from '@/utils/Utils'
import { Api } from '@/utils/Api.js'

//全局组件
import Dialog from '@/components/Dialog.vue'
import Cover from '@/components/Cover.vue'
import Avatar from '@/components/Avatar.vue'
import VideoItem from '@/components/VideoItem.vue'
import DataLoadMoreList from "@/components/DataLoadMoreList.vue";
import NoData from "@/components/NoData.vue";
import Collapse from "@/components/Collapse.vue";
import Tags from "@/components/Tags.vue";
import DataList from "@/components/DataList.vue";
import Table from "@/components/Table.vue";
import ImageCoverSelect from "@/components/ImageCoverSelect.vue";
import MyTab from "@/components/MyTab.vue";
import DataGridList from "@/components/DataGridList.vue";

const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.use(createPinia())

app.component("Dialog", Dialog)
app.component("Cover", Cover)
app.component("Avatar", Avatar)
app.component("VideoItem", VideoItem)
app.component("DataLoadMoreList", DataLoadMoreList)
app.component("NoData", NoData)
app.component("Collapse", Collapse)
app.component("Tags", Tags)
app.component("DataList", DataList)
app.component("Table", Table)
app.component("ImageCoverSelect", ImageCoverSelect)
app.component("MyTab", MyTab)
app.component("DataGridList", DataGridList)

app.config.globalProperties.VueCookies = VueCookies;

app.config.globalProperties.Verify = Verify;
app.config.globalProperties.Message = Message;
app.config.globalProperties.Request = Request;
app.config.globalProperties.Confirm = Confirm;
app.config.globalProperties.Utils = Utils;
app.config.globalProperties.Api = Api;

app.config.globalProperties.bodyMaxWidth = 2000;
app.config.globalProperties.bodyMinWidth = 1250;
app.config.globalProperties.bodyPadding = 150;

app.config.globalProperties.imageThumbnailSuffix = "_thumbnail.jpg";
//顶部分类 一行显示的个数
app.config.globalProperties.rowCategoryCount = 10
//侧边栏分类 一列显示的个数
app.config.globalProperties.colCategoryCount = 7
//轮播图个数
app.config.globalProperties.carouselMaxCount = 3
//可接受的图片格式
app.config.globalProperties.imageAccept = ".jpg,.png,.gif,.bmp,.webp"
//可接受的视频格式
app.config.globalProperties.videoAccept = ".mp4,.avi,.rmvb,.mov,.mkv"
// 分片大小
app.config.globalProperties.chunkSize = 1024 * 512;
// 最多同时上传数量
app.config.globalProperties.maxUploading = 3;

app.mount('#app')