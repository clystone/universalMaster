// const paymentUrl = require('../../../../config').paymentUrl
var app = getApp();
let time = require('../../../../util/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stars: [0, 1, 2, 3, 4],
    normalSrc: '../../../../images/star-normal.png',
    selectedSrc: '../../../../images/star-active.png',
    key: 0,//评分
    keys: 3,
    showAudio: true,
    showPic: true,
    showPic1: true,
    showPic2: true,
    payDisabled: false
  },
  onLoad: function (options) {
    console.log(options)
    console.log(app.globalData.token);
    this.setData({
      orderId: options.orderId,
      masterId: options.masterId,
      audioSrc: app.globalData.url + '/images/orders/' + options.orderId + '/recode.mp3',
      imgSrc: app.globalData.url + '/images/orders/' + options.orderId + '/0.jpg',
      imgSrc1: app.globalData.url + '/images/orders/' + options.orderId + '/1.jpg',
      imgSrc2: app.globalData.url + '/images/orders/' + options.orderId + '/2.jpg',
    })
    let that = this;
    wx.request({
      url: app.globalData.url + '/api/order/find/' + options.orderId,
      method: 'GET',
      header: { TOKEN: app.globalData.token },
      success: function (res) {
        console.log(res.data)
        let booktime = res.data.parms.order.bookTime;
        let createTime = res.data.parms.order.createTime;
        // var booktime1 = time.formatTime(booktime, 'Y/M/D h:m');
        if (time.formatTime(booktime, 'h') < 10) {
          let time1 = time.formatTime(booktime, 'h') - 0
          var booktime1 = time.formatTime(booktime, 'Y/M/D') + ' ' + time.formatTime(booktime, 'h:m') + '-' + time.formatTime(booktime + 3600000, 'h:m')
          that.setData({
            bookTime1: booktime1,
          })
        }
        else {
          var booktime1 = time.formatTime(booktime, 'Y/M/D') + ' ' + time.formatTime(booktime, 'h:m') + '-' + time.formatTime(booktime + 3600000, 'h:m')
          that.setData({
            bookTime1: booktime1,
          })
        }
        var createTime1 = time.formatTime(createTime, 'Y/M/D h:m');
        console.log(booktime1)
        that.setData({
          order: res.data.parms.order,
          // bookTime1: booktime1,
          createTime1: createTime1
        })
      },
      fail: err => {
        console.log(err)
      }
    })
    wx.request({
      url: app.globalData.url + '/api/comment/findSome/' + that.data.masterId + '?page=1&size=30',
      method: 'GET',
      header: { TOKEN: app.globalData.token },
      data: {},
      success: function (res) {
        console.log(res.data);
        if (!res.data.parms.avg) {
          that.setData({
            keys: 5
          })
        }
        else {
          that.setData({
            keys: res.data.parms.avg
          })
        }
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  makePhoneCall: function () {
    let that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.order.master.phone,
      success: function () {
        console.log("成功拨打电话")
      }
    })
  },
  makePhoneCall1: function () {
    let that = this;
    wx.makePhoneCall({
      phoneNumber: '4006003388',
      success: function () {
        console.log("成功拨打电话")
      }
    })
  },
  requestPayment: function () {
    let that = this;
    this.setData({
      payDisabled: true
    })
    wx.request({
      url: app.globalData.url + '/api/pay/wxPayP/' + that.data.orderId,
      method: 'POST',
      header: { TOKEN: app.globalData.token },
      success: function (res) {
        setTimeout(function () {
          that.setData({
            payDisabled: false
          })
        }, 1000)
        console.log(res.data)
        let config = res.data.parms;
        console.log(config)
        wx.requestPayment({
          'timeStamp': config.timeStamp,
          'nonceStr': config.nonceStr,
          'package': config.package,
          'signType': 'MD5',
          'paySign': config.paySign,
          'success': function (res) {
            console.log(res)
            that.setData({
              payDisabled: false
            })
            wx.switchTab({
              url: '../../../order/index',
            })
          },
          'fail': function (err) {
            // wx.switchTab({
            //   url: '../../../order/index',
            // })
            console.log(err);
            that.setData({
              payDisabled: false
            })
          }
        })
      },
      fail: err => {
        console.log(err)
        that.setData({
          payDisabled: false
        })
      }
    })
  },
  audioError: function (resp) {
    console.log(resp);
    this.setData({
      showAudio: false
    })
  },
  imgError: function (resp) {
    this.setData({
      showPic: false
    })
    console.log(resp);
  },
  imgError1: function (resp) {
    this.setData({
      showPic1: false
    })
    console.log(resp);
  },
  imgError2: function (resp) {
    this.setData({
      showPic2: false
    })
    console.log(resp);
  },
})