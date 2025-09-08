import { defineStore } from 'pinia'

const useLoginStore = defineStore('loginState', {
  state: () => {
    return {
      showLogin: false,
      userInfo: {},
      deviceId: null,
      messageNoReadCount: 0
    }
  },
  actions: {
    setLogin(show) {
      this.showLogin = show
    },
    saveUserInfo(userInfo) {
      this.userInfo = userInfo
    },  
    saveDeviceId(deviceId) {
      this.deviceId = deviceId
    },
    saveMessageNoReadCount(count) {
      this.messageNoReadCount = count
    },
    readMessageCount(count) {
      this.messageNoReadCount -= count
    }
  }
})
export {
  useLoginStore
}