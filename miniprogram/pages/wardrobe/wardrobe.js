// pages/wardrobe/wardrobe.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgImgUrl: '../../images/cloud.jpg',
    images: [],
    marqueePace: 1,//滚动速度
    marqueeDistance: 0,//初始滚动距离
    text: 'awsl',
    size: 14,
    orientation: 'left',//滚动方向
    interval: 20, // 时间间隔
    adUrl: '../../images/bg.jpg',
  },

  chooseImage: function() {
    var that = this
    wx.chooseImage({
      count: 0,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        that.setData({
          images: that.data.images.concat(res.tempFilePaths)
        });
        // console.log(that.data.images)
      }
    })
  },

  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.images // 需要预览的图片http链接列表
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