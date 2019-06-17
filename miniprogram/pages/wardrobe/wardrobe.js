// pages/wardrobe/wardrobe.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgImgUrl: 'https://github.com/HanlynnKe/wxWeatherobe/blob/master/miniprogram/images/cloud.jpg?raw=true',
    images: []
  },

  uploadImage: function() {
    wx.navigateTo({
      url: '../wardrobe/upload?id=' + app.globalData.openid
    })
  },

  removeImage: function () {
    wx.navigateTo({
      url: '../wardrobe/remov?id=' + app.globalData.openid
    })
  },

  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.images, // 需要预览的图片http链接列表
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      images: app.globalData.closet
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onLoad()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})