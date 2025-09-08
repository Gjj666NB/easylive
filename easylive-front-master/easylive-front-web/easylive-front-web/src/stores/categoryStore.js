import { defineStore } from 'pinia';

const useCategoryStore = defineStore("categoryStore", {
  state: () => {
    return {
      categoryMap: {},      // 分类映射数据
      categoryList: [],     // 分类列表
      currentPCategory: {}, // 当前选择的父分类
    };
  },
  actions: {
    // 保存分类映射数据
    saveCategoryMap(data) {
      this.categoryMap = data;
    },

    // 保存分类列表
    saveCategoryList(data) {
      this.categoryList = data;
    },

    // 设置当前选择的父分类
    setCurrentPCategory(data) {
      if (data) {
        this.currentPCategory = this.categoryMap[data] || {};
      } else {
        this.currentPCategory = {};
      }
    }
  }
});

export {
  useCategoryStore
} 
