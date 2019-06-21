//index.js
import config from '../../util/config'

const app = getApp()

import {
  getPosition,
  getWeaterInfo,
  getEveryHoursWeather,
  getWeekWeather,
  getAirQuality,
  getWeatherLive,
  getLifeStyle
} from '../../util/api'
import {
  weekEnum as weekday,
  airQuailtyLevel,
  arrForAirColor,
  lifeIndexEnum,
  iconType,
  rainType,
  snowType
} from '../../util/utils'
import Rain from '../../class/Rain.js'
import Snow from '../../class/Snow.js'

Page({
  data: {
    bgImgUrl: 'https://upload.cc/i1/2019/06/15/fpBqLP.jpg',
    welcome: '',
    location: {
      x: '116.40',
      y: '39.9',
    },
    position: '正在获取位置...',
    todayData: {},
    tomorrowData: {},
    everyHourData: [],
    everyWeekData: [],
    airQuality: {},
    liveWeather: {},
    lifeStyle: [],
    lifeEnum: lifeIndexEnum,
    iconTypeObj: iconType,
    warmPrompt: '',
    width: 0,
    canvasHeight: 320,
    scole: 0,
    canvas_instance: null,
    apl: 0,
    rain_ins: null,
    snow_ins: null,
    openid: '',
    uname: '',
    ugender: 0,
    ucountry: '',
    uprovince: '',
    ucity: '',
    udistrict: '',
    loginState: false,
    chgState: false,
    fit_list: []
  },

  //获取用户信息
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      loginState: true
    })
    this.getStrategy()
  },

  getStrategy: function() {
    let that = this
    const data = app.globalData
    let date = data.date
    let realtimetp = data.realtimetp
    let humidity = data.humidity
    let windspeed = data.wind_spd
    let precipit = data.precipit
    let next6hrs = data.next6hrs
    let strategyPak = {
      'date': date,
      'realtimetp': realtimetp,
      'humidity': humidity,
      'windspeed': windspeed,
      'precipit': precipit,
      'next6hrs': next6hrs
    }
    strategyPak = JSON.stringify(strategyPak)
    wx.request({
      url: 'https://www.fukutenki.xyz/strategy',
      // url: 'http://139.199.186.154:5678/strategy',
      method: 'POST',
      data: strategyPak,
      success(res) {
        let data = res.data
        let todayFit = ''
        let max = data.str1.length
        let rand = Math.floor(Math.random() * max);
        let rand_fit = data.str1[rand]
        for (let item in rand_fit) {
          todayFit = todayFit + rand_fit[item] + '+'
        }
        todayFit = todayFit.substring(0, todayFit.length - 1)
        that.setData({
          warmPrompt: that.data.warmPrompt + data.str2,
        })
        app.globalData.tempTip = data.str3
        app.globalData.todayFit = todayFit
      }
    })
    if(this.data.chgState == true) {
      this.setData({
        chgState: false
      })
    }
  },

  onLoad: function() {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          width: res.windowWidth,
          scole: res.windowWidth / 375,
          canvas_instance: wx.createCanvasContext('animation')
        })
      },
    })
    this.getPosition()
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        let that = this
        let code = res.code
        let cod_pak = { 'code': code}
        let cod2snd = JSON.stringify(cod_pak)
        wx.request({
          url: 'https://www.fukutenki.xyz/id',
          // url: 'http://139.199.186.154:5678/id',
          data: cod2snd,
          method: 'POST',
          success(res) {
            let str = res.data.openid
            wx.setStorage({
              key: 'openid',
              data: str,
            })
            that.setData({
              openid: str
            })
            // 获取用户信息
            wx.getSetting({
              success: res => {
                // console.log(res)
                if (res.authSetting['scope.userInfo']) {
                  // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                  wx.getUserInfo({
                    success: res => {
                      // 可以将 res 发送给后台解码出 unionId
                      that.setData({
                        uname: res.userInfo.nickName,
                        ugender: res.userInfo.gender,
                      })
                      let data2send = {
                        'openID': that.data.openid,
                        'userName': that.data.uname,
                        'userGender': that.data.ugender,
                        'userPos': res.userInfo.country + res.userInfo.province + res.userInfo.city
                      }
                      data2send = JSON.stringify(data2send)
                      wx.request({
                        url: 'https://www.fukutenki.xyz/usr',
                        // url: 'http://139.199.186.154:5678/usr',
                        method: 'POST',
                        data: data2send,
                        header: {
                          'content-type': 'application/json' // 默认值
                        },
                        success(res) {
                          that.setData({
                            welcome: res.data
                          })
                        }
                      })
                    }
                  })
                }
              }
            })
          }
        })
      }
    })
  },

  getPosition: function() {
    wx.getLocation({
      type: 'gcj02',
      success: this.updateLocation,
      fail: err => {
        console.log(err)
      }
    })
  },

  getData: function(lat, lon) {
    wx.showLoading({
      title: '加载中',
    })
    Promise.all([this.getWeather(lat, lon), this.getAir(lat, lon), this.getHourWeather(lat, lon), this.getWeatherForWeek(lat, lon), this.getLifeIndex(lat, lon)]).then(res => {
      wx.hideLoading();
      wx.stopPullDownRefresh()
    })
  },

  updateLocation: function(res) {
    if(this.data.rain_ins) {
      this.data.rain_ins.stop()
    }
    if (this.data.snow_ins) {
      this.data.snow_ins.stop()
    }
    let {
      latitude: x,
      longitude: y,
      name
    } = res;
    let data = {
      location: {
        x,
        y,
      },
      rain_ins: null,
      snow_ins: null
    };
    // console.log(data)
    this.setData(data);
    this.getLocation(x, y);
  },

  chooseLocation: function() {
    wx.chooseLocation({
      success: res => {
        let {
          latitude,
          longitude
        } = res
        let {
          x,
          y
        } = this.data.location
        if (latitude == x && longitude == y) {

        } else {
          this.setData({
            chgState: true
          })
          this.updateLocation(res)
        }
      }
    })
  },

  getLocation: function(lat, lon) {
    wx.showLoading({
      title: "定位中",
      mask: true
    })
    getPosition(lat, lon, (res) => {
      if (res.statusCode == 200) {
        let response = res.data.result
        let uaddr = response.ad_info
        this.setData({
          ucountry: uaddr.nation,
          uprovince: uaddr.province,
          ucity: uaddr.city,
          udistrict: uaddr.district
        })
        let addr = response.formatted_addresses.recommend || response.rough
        this.setData({
          position: addr
        })
        wx.hideLoading()
        this.getData(lat, lon);
      }
    }, (err => {
      console.log(err)
      wx.hideLoading()
    }))
  },

  getWeather: function(lat, lon) {
    if (!lat || !lon) {
      return
    }
    getWeatherLive(lat, lon, res => {
      let data = res.data.HeWeather6[0].now;
      let realtimetp = data.fl
      let humidity = data.hum
      let windspeed = data.wind_spd
      app.globalData.realtimetp = realtimetp
      app.globalData.humidity = humidity
      app.globalData.wind_spd = windspeed
      // let realtimePak = {
      //   'realtimetp': realtimetp,
      //   'humidity': humidity,
      //   'windspeed': windspeed
      // }
      // realtimePak = JSON.stringify(realtimePak)
      // // console.log(realtimePak)
      // wx.request({
      //   url: 'https://www.fukutenki.xyz/live',
      //   method: 'POST',
      //   data: realtimePak,
      //   success(res) {
      //     // console.log(res)
      //   }
      // })
      data.iconType = this.data.iconTypeObj[data.cond_code]
      let hour = new Date().getHours()
      let apl = 0
      if (hour < 18 && hour >= 6) {
        apl = 0
      } else {
        apl = 0.6
      }
      this.setData({
        liveWeather: data,
        apl: apl
      })
      let canvas_count = 0
      let {
        width,
        canvasHeight,
        scole
      } = this.data
      if (data.cond_code >= 300 && data.cond_code < 400) {
        canvas_count = rainType[data.cond_code]
        this.setData({
          rain_ins: new Rain(this.data.canvas_instance, width, canvasHeight * scole, {
            counts: canvas_count,
            speedCoefficient: 0.03
          })
        })
        this.data.rain_ins.start()
      } else if (data.cond_code >= 400 && data.cond_code < 500) {
        canvas_count = rainType[data.cond_code]
        this.setData({
          snow_ins: new Snow(this.data.canvas_instance, width, canvasHeight * scole, {
            counts: canvas_count,
            speedCoefficient: 0.03
          })
        })
        this.data.snow_ins.start()
      }
    }, err => {
      console.log(err);
    })
  },

  getHourWeather: function(lat, lon) {
    if (!lat || !lon) {
      return
    }
    getEveryHoursWeather(lat, lon, res => {
      let data = res.data.HeWeather6[0].hourly;
      let time1 = {
        'time1_tmp': data[0].tmp,
        'time1_hum': data[0].hum,
        'time1_wsd': data[0].wind_spd
      }
      let time3 = {
        'time3_tmp': data[1].tmp,
        'time3_hum': data[1].hum,
        'time3_wsd': data[1].wind_spd
      }
      let time6 = {
        'time6_tmp': data[2].tmp,
        'time6_hum': data[2].hum,
        'time6_wsd': data[2].wind_spd
      }
      let nxtPak = {
        'time1': time1,
        'time3': time3,
        'time6': time6
      }
      app.globalData.next6hrs = nxtPak
      // nxtPak = JSON.stringify(nxtPak)
      // // console.log(nxtPak)
      // wx.request({
      //   url: 'https://www.fukutenki.xyz/next6hrs',
      //   method: 'POST',
      //   data: nxtPak,
      //   success(res) {
      //     // console.log(res)
      //   }
      // })
      let arrData = [];
      data.forEach(item => {
        let d = {};
        d.time = item.time.split(" ")[1].split(":")[0];
        if (typeof d.time == 'string') {
          if (d.time.charAt(0) == '0') {
            let str = d.time;
            d.time = str.substring(1)
          }
        }
        d.iconType = this.data.iconTypeObj[item.cond_code];
        d.tmp = item.tmp;
        arrData.push(d);
      });
      this.setData({
        everyHourData: arrData
      });
    }, err => {
      console.log(err)
    })
  },

  getWeatherForWeek: function(lat, lon) {
    if (!lat || !lon) {
      return
    }
    getWeekWeather(lat, lon, res => {
      let data = res.data.HeWeather6[0].daily_forecast;
      for (let i = 0; i < data.length; i++) {
        data[i].weekday = weekday[(new Date(data[i].date)).getDay()]
        let date = data[i].date;
        let arr = date.split('-')
        arr.shift()
        data[i].date = arr.join('/')
        data[i].dateTxt = `${arr[0]}月${arr[1]}日`
        data[i].iconTypeBai = this.data.iconTypeObj[data[i].cond_code_d]
        data[i].iconTypeYe = this.data.iconTypeObj[data[i].cond_code_n]
      }
      data[0].weekday = '今 天'
      data[1].weekday = '明 天'
      data[2].weekday = '后 天'
      this.setData({
        everyWeekData: data,
        todayData: data[0],
        tomorrowData: data[1]
      })
      app.globalData.date = data[0].date
      app.globalData.precipit = data[0].pop
    }, fail => {

    })
  },

  getAir: function(lat, lon) {
    if (!lat || !lon) {
      return
    }
    // getAirQuality(lat, lon, res => {
    //   console.log(res)
    //   let data = res.data.HeWeather6[0].air_now_city
    //   let value = data.aqi
    //   let keys = Object.keys(airQuailtyLevel)
    //   for (let i = 0; i < keys.length; i++) {
    //     if (Number(value) <= Number(keys[i])) {
    //       data.color = arrForAirColor[i];
    //       data.airText = airQuailtyLevel[keys[i]];
    //       break;
    //     }
    //   }
    //   this.setData({
    //     airQuality: data
    //   })
    // }, err => {
    //   console.log(err)
    // })
  },

  getLifeIndex: function(lat, lon) {
    if (!lat || !lon) {
      return
    }
    getLifeStyle(lat, lon, res => {
      let data = [];
      let result = res.data.HeWeather6[0].lifestyle
      let keys = Object.keys(lifeIndexEnum)
      keys.forEach(item => {
        data.push(result.filter(v => {
          return v.type == item;
        })[0])
      })
      this.setData({
        lifeStyle: data,
        warmPrompt: data[0].txt
      })
    }, err => {

    })
  },

  onPullDownRefresh: function() {
    this.setData({
      chgState: true
    })
    this.getPosition()
  },

  onShareAppMessage() {
    return {
      title: '分享给你！',
      path: '/pages/index/index'
    }
  },
})