import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: () => import('@/views/layout/Layout.vue'),
      children: [{
        path: '/',
        name: 'index',
        component: () => import('@/views/index/Index.vue'),
      }, {
        path: '/v/:pCategoryCode',
        name: 'categoryVideo',
        component: () => import('@/views/videoList/CategoryVideo.vue'),
      }, {
        path: '/v/:pCategoryCode/:categoryCode',
        name: 'subCategoryVideo',
        component: () => import('@/views/videoList/CategoryVideo.vue'),
      }, {
        path: '/video/:videoId',
        name: 'videoDetail',
        component: () => import('@/views/videoDetail/VideoDetail.vue'),
      }, {
        path: '/history',
        name: 'history',
        component: () => import('@/views/history/History.vue'),
      }, {
        path: '/message',
        name: 'messagehome',
        component: () => import('@/views/message/UserMessage.vue'),
      }, {
        path: '/message/:messageType',
        name: 'message',
        component: () => import('@/views/message/UserMessage.vue'),
      }, {
        path: '/hot',
        name: 'hot',
        component: () => import('@/views/hot/Hot.vue'),
      }, {
        path: '/search',
        name: 'search',
        component: () => import('@/views/search/Search.vue'),
      }]
    },
    {
      path: '/ucenter',
      name: 'ucenter',
      redirect: '/ucenter/home',
      component: () => import('@/views/ucenter/UcLayout.vue'),
      children: [{
        path: '/ucenter/home',
        name: '用户中心首页',
        component: () => import('@/views/ucenter/Home.vue'),
      }, {
        path: '/ucenter/postVideo',
        name: '发布视频',
        component: () => import('@/views/ucenter/postVideo/Post.vue'),
      }, {
        path: '/ucenter/editVideo',
        name: '编辑视频',
        component: () => import('@/views/ucenter/postVideo/Post.vue'),
      }, {
        path: '/ucenter/video',
        name: '合集列表',
        component: () => import('@/views/ucenter/VideoList.vue'),
      }, {
        path: '/ucenter/comment',
        name: '评论列表',
        component: () => import('@/views/ucenter/CommentList.vue'),
      }, {
        path: '/ucenter/danmu',
        name: '弹幕列表',
        component: () => import('@/views/ucenter/DanmuList.vue'),
      }]
    },
    {
      path: '/user/:userId',
      name: 'userhome',
      component: () => import('@/views/userhome/UserHomeLayout.vue'),
      redirect: '/user/:userId',
      children: [{
        path: '/user/:userId',
        name: 'uhome',
        component: () => import('@/views/userhome/Home.vue'),
      }, {
        path: '/user/:userId/video',
        name: 'uhomeMyVideo',
        component: () => import('@/views/userhome/VideoList.vue'),
      }, {
        path: '/user/:userId/series',
        name: 'uhomeSeries',
        component: () => import('@/views/userhome/VideoSeries.vue'),
      }, {
        path: '/user/:userId/series/:seriesId',
        name: 'uhomeSeriesDetail',
        component: () => import('@/views/userhome/VideoSeriesDetail.vue'),
      }, {
        path: '/user/:userId/collection',
        name: 'collection',
        component: () => import('@/views/userhome/Collection.vue'),
      }, {
        path: '/user/:userId/focus',
        name: 'uhomeFocus',
        component: () => import('@/views/userhome/FocusFansList.vue'),
      }, {
        path: '/user/:userId/fans',
        name: 'uhomeFans',
        component: () => import('@/views/userhome/FocusFansList.vue'),
      }]
    }
  ],
})

export default router
