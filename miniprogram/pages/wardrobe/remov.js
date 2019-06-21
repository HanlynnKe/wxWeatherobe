// miniprogram/pages/wardrobe/remov.js
const app = getApp()

Page({
  data: {
    urls: [],
    removItems: [],
    rmImgList:[]
  },

  bindConfirm: function () {
    var rmList = this.data.removItems
    var imgList = app.globalData.wardrobe
    for(var rm in rmList) {
      imgList.splice(rm-1, 1)
    }
    app.globalData.wardrobe = imgList
    var rmImgList = this.data.rmImgList
    rmImgList = JSON.stringify(rmImgList)
    wx.request({
      url: 'https://www.fukutenki.xyz/rm',
      // url: 'http://139.199.186.154:5678/rm',
      method: 'POST',
      data: rmImgList,
      success(res) {
        wx.showToast({
          title: res.data,
          icon: 'success'
        });
      }
    })
    wx.hideToast()
    wx.navigateBack({
      delta: 1
    })
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
    // console.log(urls[current])
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
        var imgList = app.globalData.wardrobe
        var rmImg = imgList[current].id
        that.setData({
          rmImgList: that.data.rmImgList.concat(rmImg)
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
    var closet = app.globalData.wardrobe
    var images = []
    for (var i = 0; i < closet.length; i++) {
      images.push(closet[i].url)
    }
    this.setData({
      uid: options.id,
      urls: images
    })
    this.$wuxGallery = app.Wux().$wuxGallery
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var closet = app.globalData.wardrobe
    var images = []
    for (var i = 0; i < closet.length; i++) {
      images.push(closet[i].url)
    }
    // console.log(images)
    this.setData({
      urls: images
    })
    this.$wuxGallery = app.Wux().$wuxGallery
  },
})