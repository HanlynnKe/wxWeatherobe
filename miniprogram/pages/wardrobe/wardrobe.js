// pages/wardrobe/wardrobe.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgImgUrl: 'https://github.com/HanlynnKe/wxWeatherobe/blob/master/miniprogram/images/cloud.jpg?raw=true',
    images: [
      'https://unsplash.it/200/200',
      'https://unsplash.it/300/300',
      'https://unsplash.it/400/400',
      'https://unsplash.it/600/600',
      'https://unsplash.it/800/800',
      'https://unsplash.it/900/900',
      'https://unsplash.it/1000/1000',
      'https://unsplash.it/1200/1200',
    ],
    marqueePace: 1,//滚动速度
    marqueeDistance: 0,//初始滚动距离
    text: 'awsl',
    size: 14,
    orientation: 'left',//滚动方向
    interval: 20, // 时间间隔
    adUrl: '../../images/bg.jpg',
  },

  uploadImage: function() {
    wx.navigateTo({
      url: '../../pages/wardrobe/upload.wxml'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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