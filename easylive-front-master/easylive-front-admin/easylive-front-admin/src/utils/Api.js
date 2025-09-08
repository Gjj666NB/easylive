import Request from "./Request";

const Api = {
    //图片上传
    sourcePath: "/api/file/getImage?sourceName=",
    uploadImage: "/file/uploadImage",
    //登录
    checkCode: "/account/checkCode",
    login: "/account/login",
    loginOut: "/account/loginOut",
    //分类
    loadCategoryInfo: "/categoryInfo/loadCategoryInfo",
    saveCategoryInfo: "/categoryInfo/saveCategoryInfo",
    delCategoryInfo: "/categoryInfo/delCategoryInfo",
    changeSort: "/categoryInfo/changeSort",
    //视频
    loadVideoList: "/videoInfo/loadVideoList",
    auditVideo: "/videoInfo/auditVideo",
    recommendVideo: "/videoInfo/recommendVideo",
    deleteVideo: "/videoInfo/deleteVideo",
    loadVideoPList: "/videoInfo/loadVideoPList",
    getVideoResource: "/api/file/videoResource",
    //统计
    getActualTimeStatisticsInfo: "/index/getActualTimeStatisticsInfo",
    getWeekStatisticsInfo: "/index/getWeekStatisticsInfo",
    //评论管理
    loadComment: "/action/loadComment",
    delComment: "/action/delComment",
    //弹幕管理
    loadDanmu: "/action/loadDanmu",
    delDanmu: "/action/delDanmu",
    //用户管理
    loadUser: "/user/loadUser",
    changeStatus: "/user/changeStatus",
    //系统设置
    getSetting: "/sys/getSetting",
    saveSetting: "/sys/saveSetting",
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

export {
    Api,
    uploadImage
}