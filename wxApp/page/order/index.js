let app = getApp();
let time = require('../../util/util.js');
Page({
  data: {
    navbar: ['全部','待接单', '已接单', '已上门', '待支付', '已完成', '已取消'],
    currentNavbar: 0,
    showLeft: false,
    showRight: true,
    orders: null,
    hasMore:false
  },
  /**
   * 切换 navbar
   */
  onLoad: function () {
    console.log('order onload')
    //待接单
  },
  onShow:function(){
    let that = this;
    let state;
    // if (this.data.currentNavbar == 0){
      // console.log('查全部')
      wx.request({
        url: app.globalData.url + '/api/order/findall/0',
        method: 'GET',
        header: { TOKEN: app.globalData.token },
        data: {
          page: 1,
          size: 5
        },
        success: function (res) {
          console.log(res.data.parms.orders)
          let orders = res.data.parms.orders
          let times = orders.map(function(i){
            if (time.formatTime(i.bookTime, 'h') < 10) {
              // let time1 = time.formatTime(i.bookTime, 'h') - 0
              let time1 = time.formatTime(i.bookTime, 'h')
              return time.formatTime(i.bookTime, 'Y/M/D') + ' ' + time.formatTime(i.bookTime, 'h:m') + '-' + time.formatTime(i.bookTime + 3600000, 'h:m')
            }
            else {
              return time.formatTime(i.bookTime, 'Y/M/D') + ' ' + time.formatTime(i.bookTime, 'h:m') + '-' + time.formatTime(i.bookTime + 3600000, 'h:m')
            }
          })
          that.setData({
            orders: res.data.parms.orders,
            times: times,
            nextPage: 2
          })
          console.log(times)
        },
        fail: err => {
          console.log(err)
        }
      })

      // wx.request({
      //   url: app.globalData.url + '/api/order/findall/2',
      //   method: 'GET',
      //   header: { TOKEN: app.globalData.token },
      //   data: {
      //     page: 1,
      //     size: 5
      //   },
      //   success: function (res) {
      //     console.log(res.data)
      //     that.setData({
      //       orders1: res.data.parms.orders,
      //       nextPage1:2
      //     })
      //   },
      //   fail: err => {
      //     console.log(err)
      //   }
      // })
    // }
    // else if (this.data.currentNavbar < 6) {
    //   state = that.data.currentNavbar
    //   wx.request({
    //     url: app.globalData.url + '/api/order/findsome/' + state,
    //     method: 'GET',
    //     header: { TOKEN: app.globalData.token },
    //     data: {
    //       page: 1,
    //       size: 10
    //     },
    //     success: function (res) {
    //       console.log(res.data)
    //       that.setData({
    //         orders: res.data.parms.orders
    //       })
    //     },
    //     fail: err => {
    //       console.log(err)
    //     }
    //   })
    // }
    // else if (this.data.currentNavbar = 6) {
    //   state = 0;
    //   wx.request({
    //     url: app.globalData.url + '/api/order/findsome/' + state,
    //     method: 'GET',
    //     header: { TOKEN: app.globalData.token },
    //     data: {
    //       page: 1,
    //       size: 10
    //     },
    //     success: function (res) {
    //       console.log(res.data)
    //       that.setData({
    //         orders: res.data.parms.orders
    //       })
    //     },
    //     fail: err => {
    //       console.log(err)
    //     }
    //   })
    // }
  },
  leftArrow: function () {
    console.log('隐藏左箭头')
    this.setData({
      showLeft: false,
    })
  },
  rightArrow: function () {
    console.log('隐藏右箭头')
    this.setData({
      showRight: false,
    })
  },
  showAll: function () {
    this.setData({
      showLeft: true,
      showRight: true,
    })
  },
  swichNav(e) {
    this.setData({
      currentNavbar: e.currentTarget.dataset.idx
    })
    let that = this;
    var state;
    if (this.data.currentNavbar == 0) {
      console.log('查全部')
      wx.request({
        url: app.globalData.url + '/api/order/findall/1',
        method: 'GET',
        header: { TOKEN: app.globalData.token },
        data: {
          page: 1,
          size: 5
        },
        success: function (res) {
          console.log(res.data)
          that.setData({
            orders: res.data.parms.orders
          })
        },
        fail: err => {
          console.log(err)
        }
      })

      wx.request({
        url: app.globalData.url + '/api/order/findall/2',
        method: 'GET',
        header: { TOKEN: app.globalData.token },
        data: {
          page: 1,
          size: 5
        },
        success: function (res) {
          console.log(res.data)
          that.setData({
            orders1: res.data.parms.orders
          })
        },
        fail: err => {
          console.log(err)
        }
      })
    }
    else if (this.data.currentNavbar < 6) {
      state = that.data.currentNavbar
      wx.request({
        url: app.globalData.url + '/api/order/findsome/' + state,
        method: 'GET',
        header: { TOKEN: app.globalData.token },
        data: {
          page: 1,
          size: 10
        },
        success: function (res) {
          console.log(res.data)
          that.setData({
            orders: res.data.parms.orders
          })
        },
        fail: err => {
          console.log(err)
        }
      })
    }
    else if (this.data.currentNavbar = 6) {
      state = 0;
      wx.request({
        url: app.globalData.url + '/api/order/findsome/' + state,
        method: 'GET',
        header: { TOKEN: app.globalData.token },
        data: {
          page: 1,
          size: 10
        },
        success: function (res) {
          console.log(res.data)
          that.setData({
            orders: res.data.parms.orders
          })
        },
        fail: err => {
          console.log(err)
        }
      })
    }
    console.log(state)
  },
  test:function(){
    // var page = getCurrentPages();
    // console.log(page);
    // page[0].onShow();
    // prePage.changeData()
    this.setData({
      currentNavbar:1
    })
  },
  showChangeModal: function (e) {
    wx.showModal({
      title: '确定更换师傅吗',
      confirmColor: '#0087fe',
      content: '多次更换师傅可能被系统列入黑名单，是否确定？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定');
          // var page = getCurrentPages();
          // console.log(page);
          // page[page.length - 1].onShow();
          wx.request({
            url: app.globalData.url + '/api/order/change/' + e.currentTarget.dataset.orderid,
            method: 'POST',
            header: { TOKEN: app.globalData.token },
            data: {},
            success: function (res) {
              console.log(res.data);
              var page = getCurrentPages();
              console.log(page);
              page[page.length - 1].onShow();
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
  showWarningModal: function (e) {
    // console.log(e)
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
            url: app.globalData.url + '/api/order/cancle/' + e.currentTarget.dataset.orderid,
            method: 'POST',
            header: { TOKEN: app.globalData.token },
            data: {},
            success: function (res) {
              console.log(res.data);
              var page = getCurrentPages();
              console.log(page);
              page[page.length - 1].onShow();
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
  showConfirmModal: function (e) {
    let that = this;
    wx.showModal({
      title: '确认上门',
      confirmColor: '#0087fe',
      confirmText: '已上门',
      content: '师傅已上门？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.url + '/api/order/arrive/' + + e.currentTarget.dataset.orderid,
            method: 'POST',
            header: { TOKEN: app.globalData.token },
            data: {},
            success: function (res) {
              console.log(res.data)
              var page = getCurrentPages();
              console.log(page);
              page[page.length - 1].onShow();
            },
            fail: err => {
              console.log(err)
            }
          })
          // wx.navigateTo({
          //   url: '../index/pages/servicecomplete/servicecomplete',
          // })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  showMoneyModal: function () {
    let that = this;
    wx.showModal({
      title: '',
      confirmColor: '#0087fe',
      confirmText: '确定',
      content: '价格是否与师傅所说的一致？',
      success: function (res) {
        if (res.confirm) {
          that.setData({
            currentNavbar: 3
          })
          // wx.navigateTo({
          //   url: '../index/pages/servicecomplete/servicecomplete',
          // })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  showPayModal: function (e) {
    // console.log(e.currentTarget.dataset.orderid)
    // let orderId = e.currentTarget.dataset.orderid;
    let that = this;
    wx.navigateTo({
      url: '../index/pages/servicecomplete/servicecomplete?orderId=' + e.currentTarget.dataset.orderid + '&masterId='+e.currentTarget.dataset.masterid,
    })
  },
  onReachBottom:function(){
    let that = this;
    // if (that.data.orders.length == 10){
    //   console.log('到底部了')
    //   that.setData({
    //     hasMore: true
    //   })
    // }
    // this.data.test  = true;
    wx.request({
      url: app.globalData.url + '/api/order/findall/0',
      method: 'GET',
      header: { TOKEN: app.globalData.token },
      data: {
        page: that.data.nextPage,
        size: 5
      },
      success: function (res) {
        console.log(res.data)
        let newOrders = res.data.parms.orders;
        let list = that.data.orders.concat(newOrders);
        let times = list.map(function (i) {
          if (time.formatTime(i.bookTime, 'h') < 10){
            // let time1 = time.formatTime(i.bookTime, 'h') - 0
            let time1 = time.formatTime(i.bookTime, 'h')
            return time.formatTime(i.bookTime, 'Y/M/D') + ' ' + time.formatTime(i.bookTime, 'h:m') +'-'+ time.formatTime(i.bookTime + 3600000, 'h:m')
          }
          else{
            return time.formatTime(i.bookTime, 'Y/M/D') + ' ' + time.formatTime(i.bookTime, 'h:m') + '-' + time.formatTime(i.bookTime + 3600000, 'h:m')
          }
        })
        console.log(list)
        that.setData({
          nextPage: that.data.nextPage + 1,
          times: times,
          orders: list
        })
      },
      fail: err => {
        console.log(err)
      }
    })

    // wx.request({
    //   url: app.globalData.url + '/api/order/findall/2',
    //   method: 'GET',
    //   header: { TOKEN: app.globalData.token },
    //   data: {
    //     page: that.data.nextPage1,
    //     size: 5
    //   },
    //   success: function (res) {
    //     console.log(res.data)
    //     let newOrders = res.data.parms.orders;
    //     let list = that.data.orders1.concat(newOrders);
    //     that.setData({
    //       nextPage1: that.data.nextPage1+1,
    //       orders1: list
    //     })
    //   },
    //   fail: err => {
    //     console.log(err)
    //   }
    // })
  },
  onShareAppMessage: function () {
    return {
      title: '全能师傅',
      // desc: '上门检修 家庭维修 随时响应',
      path: '/page/index/index'
    }
  },
  
})