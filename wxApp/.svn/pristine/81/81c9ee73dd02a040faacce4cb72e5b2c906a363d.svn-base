var time = require('../../../../util/util.js');
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showAudio:true,
    showPic: true,
    showPic1: true,
    showPic2: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      orderId: options.orderId,
      audioSrc: app.globalData.url + '/images/orders/' + options.orderId +'/recode.mp3',
      imgSrc: app.globalData.url + '/images/orders/' + options.orderId +'/0.jpg',
      imgSrc1: app.globalData.url + '/images/orders/' + options.orderId + '/1.jpg',
      imgSrc2: app.globalData.url + '/images/orders/' + options.orderId + '/2.jpg'
    })
    let that = this;
    wx.request({
      url: app.globalData.url + '/api/order/find/' + that.data.orderId,
      method: 'GET',
      header: { TOKEN: app.globalData.token },
      data: {},
      success: function (res) {
        console.log(res.data);
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
          createTime1: createTime1
        })
      },
      fail: err => {
        console.log(err)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  showWarningModal: function () {
    let that = this;
    wx.showModal({
      title: '确定取消订单吗',
      confirmColor: '#0087fe',
      content: '多次取消可能被系统列入黑名单，是否确定取消？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定');
          // var page = getCurrentPages();
          // console.log(page);
          // page[page.length - 1].onShow();
          wx.request({
            url: app.globalData.url + '/api/order/cancle/' + that.data.orderId,
            method: 'POST',
            header: { TOKEN: app.globalData.token },
            data: {},
            success: function (res) {
              console.log(res.data);
              // var page = getCurrentPages();
              // console.log(page);
              // page[page.length - 1].onShow();
              if(res.data.info == 1){
                wx.navigateBack({});
              }
              else{
                wx.showToast({
                  title: '师傅已接单!',
                  icon: 'loading',
                  duration: 1000
                })
              }
            },
            fail: err => {
              console.log(err)
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  audioError: function (resp) {
    console.log(resp);
    this.setData({
      showAudio:false
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
  showBig: function () {
    let that = this;
    wx.previewImage({
      urls: [that.data.imgSrc],
    })
  },
  showBig1: function () {
    let that = this;
    wx.previewImage({
      urls: [that.data.imgSrc1],
    })
  },
  showBig2: function () {
    let that = this;
    wx.previewImage({
      urls: [that.data.imgSrc2],
    })
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