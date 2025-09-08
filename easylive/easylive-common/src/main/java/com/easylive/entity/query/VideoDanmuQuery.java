package com.easylive.entity.query;

import java.util.Date;


/**
 * @description: 视频弹幕表查询对象
 * @date: 2025-03-07
 */
public class VideoDanmuQuery extends BaseQuery {
    /**
     * 自增ID
     */
    private Integer danmuId;

    /**
     * 视频ID
     */
    private String videoId;

    private String videoIdFuzzy;

    /**
     * 文件ID
     */
    private String fileId;

    private String fileIdFuzzy;

    /**
     * 用户ID
     */
    private String userId;

    private String userIdFuzzy;

    /**
     * 发布时间
     */
    private Date postTime;

    private String postTimeStart;

    private String postTimeEnd;

    /**
     * 内容
     */
    private String text;

    private String textFuzzy;

    /**
     * 展示位置
     */
    private Integer mode;

    /**
     * 文字颜色
     */
    private String color;

    private String colorFuzzy;

    /**
     * 展示时间
     */
    private Integer time;

    private String videoUserId;

    private Boolean queryVideoInfo;

    private String videoNameFuzzy;

    public String getVideoNameFuzzy() {
        return videoNameFuzzy;
    }

    public void setVideoNameFuzzy(String videoNameFuzzy) {
        this.videoNameFuzzy = videoNameFuzzy;
    }

    public Boolean getQueryVideoInfo() {
        return queryVideoInfo;
    }

    public void setQueryVideoInfo(Boolean queryVideoInfo) {
        this.queryVideoInfo = queryVideoInfo;
    }

    public String getVideoUserId() {
        return videoUserId;
    }

    public void setVideoUserId(String videoUserId) {
        this.videoUserId = videoUserId;
    }

    public void setDanmuId(Integer danmuId) {
        this.danmuId = danmuId;
    }

    public Integer getDanmuId() {
        return danmuId;
    }

    public void setVideoId(String videoId) {
        this.videoId = videoId;
    }

    public String getVideoId() {
        return videoId;
    }

    public void setFileId(String fileId) {
        this.fileId = fileId;
    }

    public String getFileId() {
        return fileId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserId() {
        return userId;
    }

    public void setPostTime(Date postTime) {
        this.postTime = postTime;
    }

    public Date getPostTime() {
        return postTime;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getText() {
        return text;
    }

    public void setMode(Integer mode) {
        this.mode = mode;
    }

    public Integer getMode() {
        return mode;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getColor() {
        return color;
    }

    public void setTime(Integer time) {
        this.time = time;
    }

    public Integer getTime() {
        return time;
    }

    public void setVideoIdFuzzy(String videoIdFuzzy) {
        this.videoIdFuzzy = videoIdFuzzy;
    }

    public String getVideoIdFuzzy() {
        return videoIdFuzzy;
    }

    public void setFileIdFuzzy(String fileIdFuzzy) {
        this.fileIdFuzzy = fileIdFuzzy;
    }

    public String getFileIdFuzzy() {
        return fileIdFuzzy;
    }

    public void setUserIdFuzzy(String userIdFuzzy) {
        this.userIdFuzzy = userIdFuzzy;
    }

    public String getUserIdFuzzy() {
        return userIdFuzzy;
    }

    public void setPostTimeStart(String postTimeStart) {
        this.postTimeStart = postTimeStart;
    }

    public String getPostTimeStart() {
        return postTimeStart;
    }

    public void setPostTimeEnd(String postTimeEnd) {
        this.postTimeEnd = postTimeEnd;
    }

    public String getPostTimeEnd() {
        return postTimeEnd;
    }

    public void setTextFuzzy(String textFuzzy) {
        this.textFuzzy = textFuzzy;
    }

    public String getTextFuzzy() {
        return textFuzzy;
    }

    public void setColorFuzzy(String colorFuzzy) {
        this.colorFuzzy = colorFuzzy;
    }

    public String getColorFuzzy() {
        return colorFuzzy;
    }

}