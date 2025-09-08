package com.easylive.entity.po;

import java.io.Serializable;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;
import com.easylive.enums.DateTimePatternEnum;
import com.easylive.utils.DateUtils;
import com.fasterxml.jackson.annotation.JsonIgnore;


/**
 * @description: 用户信息
 * @date: 2025-03-07
 */
public class UserInfo implements Serializable {
    /**
     * 用户id
     */
    private String userId;
    /**
     * 头像
     */
    private String avatar;
    /**
     * 昵称
     */
    private String nickName;
    /**
     * 邮箱
     */
    private String email;
    /**
     * 密码
     */
    private String password;
    /**
     * 0：女 1：男 2：未知
     */
    private Integer sex;
    /**
     * 出生日期
     */
    private String birthday;
    /**
     * 学校
     */
    private String school;
    /**
     * 个人简介
     */
    private String personalIntroduction;
    /**
     * 加入时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date joinTime;
    /**
     * 最后登录时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date lastLoginTime;
    /**
     * 最后登录IP
     */
    private String lastLoginIp;
    /**
     * 0：禁用 1：正常
     */
    private Integer status;
    /**
     * 空间公告
     */
    private String noticeInfo;
    /**
     * 硬币总数量
     */
    private Integer totalCoinCount;
    /**
     * 当前硬币数量
     */
    private Integer currentCoinCount;
    /**
     * 主题
     */
    private Integer theme;

    private Integer fansCount;

    private Integer focusCount;

    private Integer likeCount;

    private Integer playCount;

    private Boolean haveFocus;

    public Integer getFansCount() {
        return fansCount;
    }

    public void setFansCount(Integer fansCount) {
        this.fansCount = fansCount;
    }

    public Integer getFocusCount() {
        return focusCount;
    }

    public void setFocusCount(Integer focusCount) {
        this.focusCount = focusCount;
    }

    public Integer getLikeCount() {
        return likeCount;
    }

    public void setLikeCount(Integer likeCount) {
        this.likeCount = likeCount;
    }

    public Integer getPlayCount() {
        return playCount;
    }

    public void setPlayCount(Integer playCount) {
        this.playCount = playCount;
    }

    public Boolean getHaveFocus() {
        return haveFocus;
    }

    public void setHaveFocus(Boolean haveFocus) {
        this.haveFocus = haveFocus;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserId() {
        return userId;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public String getNickName() {
        return nickName;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPassword() {
        return password;
    }

    public void setSex(Integer sex) {
        this.sex = sex;
    }

    public Integer getSex() {
        return sex;
    }

    public void setBirthday(String birthday) {
        this.birthday = birthday;
    }

    public String getBirthday() {
        return birthday;
    }

    public void setSchool(String school) {
        this.school = school;
    }

    public String getSchool() {
        return school;
    }

    public void setPersonalIntroduction(String personalIntroduction) {
        this.personalIntroduction = personalIntroduction;
    }

    public String getPersonalIntroduction() {
        return personalIntroduction;
    }

    public void setJoinTime(Date joinTime) {
        this.joinTime = joinTime;
    }

    public Date getJoinTime() {
        return joinTime;
    }

    public void setLastLoginTime(Date lastLoginTime) {
        this.lastLoginTime = lastLoginTime;
    }

    public Date getLastLoginTime() {
        return lastLoginTime;
    }

    public void setLastLoginIp(String lastLoginIp) {
        this.lastLoginIp = lastLoginIp;
    }

    public String getLastLoginIp() {
        return lastLoginIp;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getStatus() {
        return status;
    }

    public void setNoticeInfo(String noticeInfo) {
        this.noticeInfo = noticeInfo;
    }

    public String getNoticeInfo() {
        return noticeInfo;
    }

    public void setTotalCoinCount(Integer totalCoinCount) {
        this.totalCoinCount = totalCoinCount;
    }

    public Integer getTotalCoinCount() {
        return totalCoinCount;
    }

    public void setCurrentCoinCount(Integer currentCoinCount) {
        this.currentCoinCount = currentCoinCount;
    }

    public Integer getCurrentCoinCount() {
        return currentCoinCount;
    }

    public void setTheme(Integer theme) {
        this.theme = theme;
    }

    public Integer getTheme() {
        return theme;
    }

    @Override
    public String toString() {
        return "用户id:" + (userId == null ? "空" : userId) + " ,头像:" + (avatar == null ? "空" : avatar) + " ,昵称:" + (nickName == null ? "空" : nickName) + " ,邮箱:" + (email == null ? "空" : email) + " ,密码:" + (password == null ? "空" : password) + " ,0：女 1：男 2：未知:" + (sex == null ? "空" : sex) + " ,出生日期:" + (birthday == null ? "空" : birthday) + " ,学校:" + (school == null ? "空" : school) + " ,个人简介:" + (personalIntroduction == null ? "空" : personalIntroduction) + " ,加入时间:" + (joinTime == null ? "空" : DateUtils.format(joinTime, DateTimePatternEnum.YYYY_MM_DD_HH_MM_SS.getPattern())) + " ,最后登录时间:" + (lastLoginTime == null ? "空" : DateUtils.format(lastLoginTime, DateTimePatternEnum.YYYY_MM_DD_HH_MM_SS.getPattern())) + " ,最后登录IP:" + (lastLoginIp == null ? "空" : lastLoginIp) + " ,0：禁用 1：正常:" + (status == null ? "空" : status) + " ,空间公告:" + (noticeInfo == null ? "空" : noticeInfo) + " ,硬币总数量:" + (totalCoinCount == null ? "空" : totalCoinCount) + " ,当前硬币数量:" + (currentCoinCount == null ? "空" : currentCoinCount) + " ,主题:" + (theme == null ? "空" : theme);
    }
}