//app.js
import config from '/util/config'
App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if( res.errMsg == "login:ok")
          var that = this
          var code = res.code
          var appid = config.APP_ID
          var appkey = config.APP_SECRET
          var reqURL = 'https://api.weixin.qq.com/sns/jscode2session?appid='+appid+'&secret='+appkey+'&js_code='+ code +'&grant_type=authorization_code'
          wx.request({
            url: reqURL,
            success(res) {
              // console.log(res)
              that.globalData.openid = res.data.openid
            }
          })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              // console.log(res)
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    // 使用云能力
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
    // 设置全局变量
    this.globalData = {
      openid: "",
      userInfo: {}
    }
  }
})
