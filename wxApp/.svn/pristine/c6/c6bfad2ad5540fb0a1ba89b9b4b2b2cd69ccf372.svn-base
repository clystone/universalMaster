// page/index/pages/ocomplete/ocomplete.js
let app = getApp();
var time = require('../../../../util/util.js');
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
    showPic2: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
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
      url: app.globalData.url + '/api/order/find/' + that.data.orderId,
      method: 'GET',
      header: { TOKEN: app.globalData.token },
      data: {},
      success: function (res) {
        console.log(res.data);
        let booktime = res.data.parms.order.bookTime;
        let createTime = res.data.parms.order.createTime;
        let finishTime = res.data.parms.order.finishTime;
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
        var finishTime1 = time.formatTime(finishTime, 'Y/M/D h:m');
        console.log(booktime1)
        that.setData({
          order: res.data.parms.order,
          // bookTime1: booktime1,
          createTime1: createTime1,
          finishTime1: finishTime1
        })
      },
      fail: err => {
        console.log(err)
      }
    })
    wx.request({
      url: app.globalData.url + '/api/comment/find/' + that.data.orderId,
      method: 'GET',
      header: { TOKEN: app.globalData.token },
      data: {},
      success: function (res) {
        console.log(res.data);
        let commentState;
        if(res.data.info==4){
          commentState =0
        }
        if (res.data.info == 1) {
          commentState = 1
        }
        that.setData({
          commentState: commentState
        })
        console.log(that.data.commentState)
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
  makePhoneCall1: function () {
    let that = this;
    wx.makePhoneCall({
      phoneNumber: '4006003388',
      success: function () {
        console.log("成功拨打电话")
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
  showBig:function(){
    let that = this; 
    wx.previewImage({
      urls: [that.data.imgSrc],
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