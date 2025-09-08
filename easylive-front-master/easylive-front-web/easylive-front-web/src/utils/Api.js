import Request from "./Request";

//微服务
const server_web = "/web"
const server_file = "/file"
const server_interact = "/interact"

const Api = {
    //web
    checkCode: server_web + "/account/checkCode",
    login: server_web + "/account/login",
    logout: server_web + "/account/loginOut",
    register: server_web + "/account/register",
    autoLogin: server_web + "/account/autoLogin",
    loadAllCategory: server_web + "/categoryInfo/loadAllCategoryInfo",
    getSysSetting: server_web + "/sysSetting/getSysSetting",
    getHotWordTop: server_web + "/video/getHotWordTop",
    loadRecommendVideo: server_web + "/video/loadCommendVideo",
    loadVideo: server_web + "/video/loadVideo",
    postVideo: server_web + "/ucenter/post/postVideo",
    saveVideoInteraction: server_web + "/ucenter/post/saveVideoInteraction",
    getVideoInfoByVideoId: server_web + "/ucenter/post/getVideoInfoByVideoId",
    UcenterloadVideoList: server_web + "/ucenter/post/loadVideoList",
    getVideoCountInfo: server_web + "/ucenter/post/getVideoCountInfo",

    //个人中心
    czLoadAllVideo: server_web + "/ucenter/interaction/loadAllVideo",
    getActualTimeStatisticsInfo: server_web + "/statistics/getActualTimeStatisticsInfo",
    getWeekStatisticsInfo: server_web + "/statistics/getWeekStatisticsInfo",
    UcenterdelVideo: server_web + "/ucenter/post/delVideo",
    loadVideoPList: server_web + "/video/loadVideoPList",
    getVideoInfo: server_web + "/video/getVideoInfo",
    getCountInfo: server_web + "/account/getCountInfo",

    //个人主页
    updateUserInfo: server_web + "/ucenter/home/updateUserInfo",
    uhloadVideoList: server_web + "/ucenter/home/loadVideoList",
    getUserInfo: server_web + "/ucenter/home/getUserInfo",
    //关注
    focus: server_web + "/ucenter/home/focus",
    //取消关注
    cancelFocus: server_web + "/ucenter/home/cancelFocus",
    //关注列表
    loadFocusList: server_web + "/ucenter/home/loadFocusList",
    //粉丝列表
    loadFansList: server_web + "/ucenter/home/loadFansList",
    //视频系列
    loadVideoSeries: server_web + "/ucenter/series/loadVideoSeries",
    //获取系列视频
    loadVideoSeriesWithVideo: server_web + "/ucenter/series/loadVideoSeriesWithVideo",
    //保存系列
    saveVideoSeries: server_web + "/ucenter/series/saveVideoSeries",
    //修改系列排序
    changeVideoSeriesSort: server_web + "/ucenter/series/changeVideoSeriesSort",
    //获取系列详情
    getVideoSeriesDetail: server_web + "/ucenter/series/getVideoSeriesDetail",
    //删除系列
    delSeries: server_web + "/ucenter/series/delSeries",
    //保存系列视频
    saveSeriesVideo: server_web + "/ucenter/series/saveSeriesVideo",
    //删除系列视频
    delSeriesVideo: server_web + "/ucenter/series/delSeriesVideo",
    //获取所有列表
    SeriesloadAllVideo: server_web + "/ucenter/series/loadAllVideo",
    //设置主题
    saveTheme: server_web + "/ucenter/home/saveTheme",
    //搜索
    search: server_web + "/video/search",
    //推荐视频
    getVideoRecommend: server_web + "/video/getVideoRecommend",
    //热门视频
    loadHotVideoList: server_web + "/video/loadHotVideoList",
    //播放历史
    loadHistory: server_web + "/history/loadHistory",
    cleanAllHistory: server_web + "/history/cleanAllHistory",
    delHistory: server_web + "/history/delHistory",

    //文件
    sourcePath: "/api" + server_file + "/getImage?sourceName=",
    getVideoResource: "/api" + server_file + "/videoResource",
    uploadImage: server_web + server_file + "/uploadImage",
    preUploadVideo: server_web + server_file + "/preUploadVideo",
    uploadVideo: server_web + server_file +  "/uploadVideo",
    delUploadVideo: server_web + server_file + "/delUploadVideo",

    //互动
    loadComment: server_interact + "/comment/loadComment",
    top: server_interact + "/comment/top",
    cancelTop: server_interact + "/comment/cancelTop",
    deleteComment: server_interact + "/comment/deleteComment",
    postComment: server_interact + "/comment/postComment",

    //弹幕
    loadDanmu: server_interact + "/danmu/loadDanmu",
    postDanmu: server_interact + "/danmu/postDanmu",

    //消息
    getNoReadCount: server_interact + "/message/getNoReadCount",
    getNoReadCountGroup: server_interact + "/message/getNoReadCountGroup",
    readAll: server_interact + "/message/readAll",
    loadMessage: server_interact + "/message/loadMessage",
    delMessage: server_interact + "/message/delMessage",

    //在线人数
    reportVideoPlayOnline: server_interact + "/online/reportVideoPlayOnline",

    //点赞，评论，投币，评论，收藏
    userAction: server_interact + "/userAction/doAction",

    //用户中心，主页
    loadUserCollection: server_interact + "/ucenter/home/loadUserCollection",
    czLoadComment: server_interact + "/ucenter/loadComment",
    czDelComment: server_interact + "/ucenter/delComment",
    czLoadDanmu: server_interact + "/ucenter/loadDanmu",
    czDelDanmu: server_interact + "/ucenter/delDanmu",
}

//上传封面
const uploadImage = async (file, createThumbnail = false) => {
    let result = await Request({
        url: Api.uploadImage,
        params: {
            file,
            createThumbnail
        },
    })
    if (!result) {
        return;
    }
    return result.data;
}

const doUserAction = async (config, callback) => {
    let result = await Request({
        url: Api.userAction,
        params: config,
        showLoading: true,
    })
    if (!result) {
        return;
    }
    callback()
}

export {
    Api,
    uploadImage,
    doUserAction
}