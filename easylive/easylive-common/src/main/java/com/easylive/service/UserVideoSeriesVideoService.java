package com.easylive.service;

import java.util.List;

import com.easylive.entity.po.UserVideoSeriesVideo;
import com.easylive.entity.query.UserVideoSeriesVideoQuery;
import com.easylive.entity.vo.PaginationResultVo;

/**
 * @description: user_video_series_video Service
 * @date: 2025-03-08
 */
public interface UserVideoSeriesVideoService {
	/**
	 * 根据条件查询列表
	 */
	List<UserVideoSeriesVideo> findListByParam(UserVideoSeriesVideoQuery query);

	/**
	 * 根据条件查询数量
	 */
	Integer findCountByParam(UserVideoSeriesVideoQuery query);

	/**
	 * 分页查询
	 */
	PaginationResultVo<UserVideoSeriesVideo> findListByPage(UserVideoSeriesVideoQuery query);

	/**
	 * 新增
	 */
	Integer add(UserVideoSeriesVideo bean);

	/**
	 * 批量新增
	 */
	Integer addBatch(List<UserVideoSeriesVideo> listBean);

	/**
	 * 批量新增/更新
	 */
	Integer addOrUpdateBatch(List<UserVideoSeriesVideo> listBean);

	/**
	 * 根据SeriesIdAndVideoId查询
	 */
	UserVideoSeriesVideo getUserVideoSeriesVideoBySeriesIdAndVideoId(Integer seriesId, String videoId); 

	/**
	 * 根据SeriesIdAndVideoId更新
	 */
	Integer updateUserVideoSeriesVideoBySeriesIdAndVideoId(UserVideoSeriesVideo bean, Integer seriesId, String videoId); 

	/**
	 * 根据SeriesIdAndVideoId删除
	 */
	Integer deleteUserVideoSeriesVideoBySeriesIdAndVideoId(Integer seriesId, String videoId); 

}