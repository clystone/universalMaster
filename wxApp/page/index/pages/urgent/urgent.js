let app = getApp();
let time = require('../../../../util/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTxts: true,
    urgentMoney: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      orderId: options.orderId,
      audioSrc: app.globalData.url + '/images/orders/' + options.orderId + '/recode.mp3',
      imgSrc: app.globalData.url + '/images/orders/' + options.orderId + '/0.jpg'
    });
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

  urgentMoney: function (e) {
    this.data.urgentMoney = e.detail.value
  },

  ensureUrgent: function () {
    console.log(this.data.urgentMoney)
    var that = this;
    wx.request({
      url: app.globalData.url + '/api/order/harry/' + that.data.orderId + '/' + that.data.urgentMoney*100,
      method: 'POST',
      header: { TOKEN: app.globalData.token },
      data: {},
      success: function (res) {
        console.log(res)
      },
      fail: function (err) {
        console.log(err)
      }
    })
    wx.switchTab({
      url: '../../../../page/order/index',
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

  kindToggle: function (e) {
    var showTxt = this.data.showTxts;
    if (showTxt == true) {
      this.data.showTxts = false;
    } else {
      this.data.showTxts = true;

    }
    this.setData({
      showTxt: showTxt
    });
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