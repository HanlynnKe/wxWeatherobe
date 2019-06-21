// miniprogram/pages/wardrobe/upload.js
const app = getApp()
var util = require('../../util/getime.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    more: true,
    del: false,
    uid: '',
    image2send: [],
    classes: ["", "背心", "T恤", "薄卫衣", "厚卫衣", "针织毛衣",
     "保暖内衣", "衬衫", "毛衣", "风衣", "棉服", "大衣", "薄款羽绒服",
      "厚款羽绒服", "短裤", "薄长裤", "厚长裤"],
    classIndex: 0
  },

  chooseImage: function () {
    var that = this
    wx.chooseImage({
      count: 0,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        that.setData({
          image2send: res.tempFilePaths,
        })
        if (that.data.image2send.length == 1){
          that.setData({
            more: false,
            del: true
          })
        }
      }
    })
  },

  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.image2send, // 需要预览的图片http链接列表
    })
  },

  deleteImage: function(e) {
    var current = e.currentTarget.id
    var urls = this.data.image2send
    urls.splice(current, 1)
    this.setData({
      image2send: urls
    })
    if (this.data.image2send.length == 0) {
      this.setData({
        more: true,
        del: false
      })
    }
  },

  bindClassChange: function (e) {
    this.setData({
      classIndex: e.detail.value
    })
  },

  bindConfirm: function () {
    var that = this
    var reqTime = util.formatTime(new Date())
    app.globalData.closet = app.globalData.closet.concat(this.data.image2send)
    var addPak = {
      'openid': this.data.uid,
      'cosclass': this.data.classIndex,
      'cosurl': this.data.image2send,
      'datetime': reqTime
    }
    addPak = JSON.stringify(addPak)
    // console.log(addPak)
    wx.request({
      url: 'https://www.fukutenki.xyz/upload',
      // url: 'http://139.199.186.154:5678/upload',
      method: 'POST',
      data: addPak,
      success(res) {
        if(res.data == 'class error!') {
          wx.showToast({
            title: '请输入类别！',
            icon: 'loading',
            duration: 3000
          })
        } else {
          var cosid = res.data
          var cosurl = that.data.image2send.toString()
          var newimg = {
            id: cosid,
            url: cosurl
          }
          app.globalData.wardrobe.push(newimg)
          wx.navigateBack({
            delta: 1
          })
        }
      }
    })
  },

  bindCancel: function() {
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      uid: options.id
    })
  }
})