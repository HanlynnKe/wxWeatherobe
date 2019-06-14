// pages/me/me.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    bgImgUrl: '../../images/cloud.jpg',
    responce: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    var that = this
    console.log(app.globalData.userInfo)
    if (app.globalData.userInfo) {
      that.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
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
  },
  //获取用户信息
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})