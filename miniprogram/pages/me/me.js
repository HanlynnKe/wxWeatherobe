// pages/me/me.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    responce: '',
    logs: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    var that = this
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          that.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    // 向后端发送请求
    wx.request({
      url: 'https://www.fukutenki.xyz',
      // url: 'http://139.199.186.154:5678',
      success(res) {
        that.setData({
          responce: res.data
        })
      }
    })
    // 读取搭配历史
    debugger
    var histCnt = wx.getStorageInfoSync('histCnt').keys.length -1
    var uhist = []
    for(var i=1; i<=histCnt; i++) {
      var key = String(i)
      uhist.push(wx.getStorageSync(key))
    }
    this.setData({
      logs: uhist
    })
  },
  //获取用户信息
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})