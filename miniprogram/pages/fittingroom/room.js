// pages/fittingroom/room.js
const app = getApp()
var util = require('../../util/getime.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userTemp: 0,
    tempAdvice: '',
    tempTip: '',
    todayFit: '',

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
    var globalData = app.globalData
    var data2send = {}
    var tops1 = that.data.tops1Index
    var tops2 = that.data.tops2Index
    var bottoms = that.data.bottomsIndex
    var reqTime = util.formatTime(new Date())
    data2send['openid'] = wx.getStorageSync('openid')
    data2send['datetime'] = reqTime
    data2send['tops1'] = String(tops1)
    data2send['tops2'] = String(tops2)
    data2send['bottoms'] = String(bottoms)
    data2send['realtimetp'] = globalData.realtimetp
    data2send['humidity'] = globalData.humidity
    data2send['windspeed'] = globalData.wind_spd
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
        var outerTop = that.data.tops1[tops1].name
        var innerTop = that.data.tops2[tops2].name
        var bottom = that.data.bottoms[bottoms]
        var index = wx.getStorageSync('histCnt') + 1
        var log = {
          'id': index,
          'datetime': reqTime
        }
        if(bottoms != 0) {
          if(tops1 == 0 && tops2 != 0) {
            log['choice'] = innerTop + '+' + bottom
            wx.setStorageSync(String(index), log)
            app.globalData.histCnt = index
            wx.setStorageSync('histCnt', index)
          } else if(tops1 != 0 && tops2 == 0) {
            log['choice'] = outerTop + '+' + bottom
            wx.setStorageSync(String(index), log)
            app.globalData.histCnt = index
            wx.setStorageSync('histCnt', index)
          } else if(tops1 != 0 && tops2 != 0) {
            log['choice'] = outerTop + '+' + innerTop + '+' + bottom
            wx.setStorageSync(String(index), log)
            app.globalData.histCnt = index
            wx.setStorageSync('histCnt', index)
          } 
        }
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
  onLoad: function () {
    var that = this
    var globalData = app.globalData
    var data2send = {}
    var reqTime = util.formatTime(new Date())
    data2send['openid'] = wx.getStorageSync('openid')
    data2send['datetime'] = reqTime
    data2send['tops1'] = '0'
    data2send['tops2'] = '0'
    data2send['bottoms'] = '0'
    data2send['realtimetp'] = globalData.realtimetp
    data2send['humidity'] = globalData.humidity
    data2send['windspeed'] = globalData.wind_spd
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
        // console.log(res)
        that.setData({
          userTemp: res.data["temp"],
          tempAdvice: res.data["advice"],
          tempTip: '气温小贴士：' + app.globalData.tempTip,
          todayFit: '今日搭配：' +  app.globalData.todayFit
        })
      }
    })
  },

  onShow: function() {
    this.onLoad()
  }
})