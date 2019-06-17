// miniprogram/pages/wardrobe/remov.js
const app = getApp()

Page({
  data: {
    urls: [],
    removItems: []
  },

  bindConfirm: function () {
    var pages = getCurrentPages()   //页面栈
    var prevPage = pages[pages.length - 2];  //上一个页面
    console.log(this.data.removItems)
    
  },

  bindCancel: function () {
    wx.navigateBack({
      delta: 1
    })
  },

  showGallery(e) {
    const that = this
    const dataset = e.currentTarget.dataset
    const current = dataset.current
    const urls = this.data.urls
    const urlInfo = this.data.urlInfo
    const remov = this.data.removItems

    this.$wuxGallery.show({
      current: current,
      urls: urls,
      delete: (current, urls) => {
        urls.splice(current, 1)
        app.globalData.closet = urls
        remov.push(current)
        remov.sort()
        that.setData({
          removItems: remov,
          urls: app.globalData.closet
        })
        return !0
      },
    })
  },
  
  previewImage(e) {
    const dataset = e.currentTarget.dataset
    const current = dataset.current
    const urls = this.data.urls
    wx.previewImage({
      current: current,
      urls: urls,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      uid: options.id,
      urls: app.globalData.closet
    })
    this.$wuxGallery = app.Wux().$wuxGallery
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },
})