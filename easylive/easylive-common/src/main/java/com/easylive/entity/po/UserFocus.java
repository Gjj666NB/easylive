package com.easylive.entity.po;

import java.io.Serializable;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;
import com.easylive.enums.DateTimePatternEnum;
import com.easylive.utils.DateUtils;

/**
 * @description:
 * @date: 2025-03-08
 */
public class UserFocus implements Serializable {
    /**
     * 用户ID
     */
    private String userId;
    /**
     * 用户ID
     */
    private String focusUserId;
    /**
     * 时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date focusTime;

    private String otherNickName;

    private String otherAvatar;

    private String otherUserId;

    private String otherPersonalIntroduction;

    private Integer focusType;

    public String getOtherNickName() {
        return otherNickName;
    }

    public void setOtherNickName(String otherNickName) {
        this.otherNickName = otherNickName;
    }

    public String getOtherAvatar() {
        return otherAvatar;
    }

    public void setOtherAvatar(String otherAvatar) {
        this.otherAvatar = otherAvatar;
    }

    public String getOtherUserId() {
        return otherUserId;
    }

    public void setOtherUserId(String otherUserId) {
        this.otherUserId = otherUserId;
    }

    public String getOtherPersonalIntroduction() {
        return otherPersonalIntroduction;
    }

    public void setOtherPersonalIntroduction(String otherPersonalIntroduction) {
        this.otherPersonalIntroduction = otherPersonalIntroduction;
    }

    public Integer getFocusType() {
        return focusType;
    }

    public void setFocusType(Integer focusType) {
        this.focusType = focusType;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserId() {
        return userId;
    }

    public void setFocusUserId(String focusUserId) {
        this.focusUserId = focusUserId;
    }

    public String getFocusUserId() {
        return focusUserId;
    }

    public void setFocusTime(Date focusTime) {
        this.focusTime = focusTime;
    }

    public Date getFocusTime() {
        return focusTime;
    }

    @Override
    public String toString() {
        return "用户ID:" + (userId == null ? "空" : userId) + " ,用户ID:" + (focusUserId == null ? "空" : focusUserId) + " ,时间:" + (focusTime == null ? "空" : DateUtils.format(focusTime, DateTimePatternEnum.YYYY_MM_DD_HH_MM_SS.getPattern()));
    }
}