// pages/fittingroom/room.js
const app = getApp()
var util = require('../../util/getime.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userTemp: 26,
    tempAdvice: '感觉不错哦～',

    tops1Name: ["", "薄卫衣", "针织毛衣", "厚卫衣", "毛衣", 
            "风衣", "棉服", "大衣", "薄款羽绒服", "厚款羽绒服"],
    tops1Index: 0,
    tops1: [
      { name: "", value: 0 },
      { name: "薄卫衣", value: 3 },
      { name: "针织毛衣", value: 4 },
      { name: "厚卫衣", value: 7 },
      { name: "毛衣", value: 8 },
      { name: "风衣", value: 9 },
      { name: "棉服", value: 10 },
      { name: "大衣", value: 11 },
      { name: "薄款羽绒服", value: 12 },
      { name: "厚款羽绒服", value: 13 },
    ],
    tops2Name: ["", "背心", "T恤", "保暖内衣", "衬衫"],
    tops2Index: 0,
    tops2: [
      { name: "", value: 0 },
      { name: "背心", value: 1 },
      { name: "T恤", value: 2 },
      { name: "保暖内衣", value: 5 },
      { name: "衬衫", value: 6 },
    ],
    bottoms: ["", "短裤", "薄长裤", "厚长裤"],
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
  },
  bindBottomsChange: function (e) {
    this.setData({
      bottomsIndex: e.detail.value
    })
  },

  bindConfirm: function() {
    var that = this
    var data2send = {}
    var tops1 = that.data.tops1Index
    var tops2 = that.data.tops2Index
    var bottoms = that.data.bottomsIndex
    data2send['tops1'] = tops1
    data2send['tops2'] = tops2
    data2send['bottoms'] = bottoms
    var dataStr = JSON.stringify(data2send)
    wx.request({
      // url: 'http://139.199.186.154:5678/fit',
      url: 'https://www.fukutenki.xyz/fit',
      method: 'POST',
      data: dataStr,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        var resTime = util.formatTime(new Date())
        var outerTop = that.data.tops1[tops1].name
        var innerTop = that.data.tops2[tops2].name
        var bottom = that.data.bottoms[bottoms]
        var index = wx.getStorageSync('histCnt') + 1
        var log = {
          'id': index,
          'choice': outerTop + '+' +  innerTop + '+' +bottom,
          'datetime': resTime
        }
        wx.setStorageSync(String(index), log)
        app.globalData.histCnt = index
        wx.setStorageSync('histCnt', index)
        that.setData({
          userTemp: res.data["temp"],
          tempAdvice: res.data["advice"]
        })
      }
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