// pages/wardrobe/wardrobe.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: []
  },

  uploadImage: function() {
    // wx.getStorage({
    //   key: 'openid',
    //   success: function(res) {
    //     var uid = res.data
    //     wx.navigateTo({
    //       url: '../wardrobe/upload?id=' + uid
    //     })
    //   },
    // })
    var uid = wx.getStorageSync('openid')
    wx.navigateTo({
      url: '../wardrobe/upload?id=' + uid
    })
  },

  removeImage: function () {
    // wx.getStorage({
    //   key: 'openid',
    //   success: function (res) {
    //     var uid = res.data
    //     wx.navigateTo({
    //       url: '../wardrobe/remov?id=' + uid
    //     })
    //   },
    // })
    var uid = wx.getStorageSync('openid')
    wx.navigateTo({
      url: '../wardrobe/remov?id=' + uid
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
    var that = this
    var u_closet = []
    var uid = wx.getStorageSync('openid')
    var idPak = { openid: uid }
    idPak = JSON.stringify(idPak)
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    })
    wx.request({
      url: 'https://www.fukutenki.xyz/img',
      // url: 'http://139.199.186.154:5678/img',
      method: 'POST',
      data: idPak,
      success(res) {
        app.globalData.wardrobe = res.data
        var closet = app.globalData.wardrobe
        var images = []
        for (var i = 0; i < closet.length; i++) {
          images.push(closet[i].url)
        }
        that.setData({
          images: images
        })
        app.globalData.closet = closet
      }
    })
    wx.hideToast()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.onLoad()
  },
})