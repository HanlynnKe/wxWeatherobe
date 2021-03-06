//app.js
import config from '/util/config'
import Wux from './wux.js'

App({
  Wux: Wux,
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        // console.log(res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              // console.log(res)
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    if (!wx.getStorageSync('histCnt')) {
      wx.setStorageSync('histCnt', 0)
    }
    // 使用云能力
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
    // 设置全局变量
    this.globalData = {
      openid: "",
      userInfo: {},
      histCnt: 0,
      wardrobe: [],
      date: '',
      realtimetp: 0,
      humidity: 0,
      wind_spd: 0,
      precipit: 0,
      next6hrs: {},
      tempTip: '',
      todayFit: '',
      strategy: {}
    }
  }
})
