// miniprogram/pages/wardrobe/upload.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    more: true,
    del: false,
    uid: '',
    image2send: '',
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
    var pages = getCurrentPages()   //页面栈
    var prevPage = pages[pages.length - 2];  //上一个页面
    prevPage.setData({
      images: prevPage.data.images.concat(this.data.image2send)
    })
    var addPak = {
      'openid': this.data.uid,
      'cosclass': this.data.classIndex,
      'cosurl': this.data.image2send
    }
    addPak = JSON.stringify(addPak)
    wx.request({
      url: 'https://www.fukutenki.xyz/upload',
      // url: 'http://139.199.186.154:5678/upload',
      method: 'POST',
      data: addPak,
      success(res) {
        console.log(res)
        if(res.data == 'upload succeeded!') {
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