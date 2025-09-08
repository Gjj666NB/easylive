package com.easylive.entity.po;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;


/**
 * @description:
 * @date: 2025-03-08
 */
public class UserVideoSeriesVideo implements Serializable {
    /**
     * 列表ID
     */
    private Integer seriesId;
    /**
     * 视频ID
     */
    private String videoId;
    /**
     * 用户ID
     */
    private String userId;
    /**
     * 排序
     */
    private Integer sort;

    private String videoName;

    private String videoCover;

    private Integer playCount;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date createTime;

    public String getVideoName() {
        return videoName;
    }

    public void setVideoName(String videoName) {
        this.videoName = videoName;
    }

    public String getVideoCover() {
        return videoCover;
    }

    public void setVideoCover(String videoCover) {
        this.videoCover = videoCover;
    }

    public Integer getPlayCount() {
        return playCount;
    }

    public void setPlayCount(Integer playCount) {
        this.playCount = playCount;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public void setSeriesId(Integer seriesId) {
        this.seriesId = seriesId;
    }

    public Integer getSeriesId() {
        return seriesId;
    }

    public void setVideoId(String videoId) {
        this.videoId = videoId;
    }

    public String getVideoId() {
        return videoId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserId() {
        return userId;
    }

    public void setSort(Integer sort) {
        this.sort = sort;
    }

    public Integer getSort() {
        return sort;
    }

    @Override
    public String toString() {
        return "列表ID:" + (seriesId == null ? "空" : seriesId) + " ,视频ID:" + (videoId == null ? "空" : videoId) + " ,用户ID:" + (userId == null ? "空" : userId) + " ,排序:" + (sort == null ? "空" : sort);
    }
}