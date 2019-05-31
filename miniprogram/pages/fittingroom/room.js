// pages/fittingroom/room.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgImgUrl: '../../images/cloud.jpg',
    
    userTemp: 26,
    tempAdvice: '感觉不错哦～',
    userSelect: {"tops":[], "bottoms":0},

    tops1: ["", "薄卫衣", "厚卫衣", "针织毛衣", "毛衣", 
            "风衣", "棉服", "大衣", "薄款羽绒服", "厚款羽绒服"],
    tops1Index: 0,
    tops2Name: ["", "背心", "T恤", "保暖内衣", "衬衫"],
    tops2Index: 0,
    tops2: [
      { name: "", value: 0 },
      { name: "背心", value: 1 },
      { name: "T恤", value: 2 },
      { name: "保暖内衣", value: 5 },
      { name: "衬衫", value: 6 },
    ],
    bottoms: ["", "短裤", "薄长裤", "厚长裤", "秋裤"],
    bottomsIndex: 0,
  },

  bindTops1Change: function (e) {
    this.setData({
      tops1Index: e.detail.value
    })
  },
  bindTops2Change: function (e) {
    this.setData({
      tops2Index: e.detail.value,
    })
    this.userSelect["tops"].push(e.detail.value)
  },
  bindBottomsChange: function (e) {
    this.setData({
      bottomsIndex: e.detail.value
    })
  },

  bindConfirm: function(e) {
    console.log(e)
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