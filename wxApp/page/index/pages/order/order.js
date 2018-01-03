let app = getApp()
Page({
  data: {
    navbar: ['待接单', '已接单', '已上门', '待支付', '已完成', '已取消'],
    currentNavbar: 0,
    orders: null,
    hasMore: false
  },
  /**
   * 切换 navbar
   */
  onLoad: function () {
    console.log('order onload')
    //待接单

  },
  
  onShow: function () {
    let that = this;
    // let state;
    // if (this.data.currentNavbar < 5) {
    //   state = that.data.currentNavbar + 1
    // }
    // else if (this.data.currentNavbar = 5) {
    //   state = 0;
    // }
    wx.request({
      url: app.globalData.url + '/api/order/findsome/' + 0,
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
  },
  
  showChangeModal: function (e) {
    wx.showModal({
      title: '确定更换师傅吗',
      confirmColor: '#0087fe',
      content: '若在师傅接单10分钟后更换师傅将收取一定的服务费，是否确定？',
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
      content: '师傅接单10分钟后取消订单将收取一定的服务费，是否确定取消？',
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
      url: '../index/pages/servicecomplete/servicecomplete?orderId=' + e.currentTarget.dataset.orderid + '&masterId=' + e.currentTarget.dataset.masterid,
    })
  },
  onReachBottom: function () {
    let that = this;
    // if (that.data.orders.length == 5) {
    //   console.log('到底部了')
    //   that.setData({
    //     hasMore: true
    //   })
    // }
  },
  onShareAppMessage: function () {
    return {
      title: '全能师傅',
      // desc: '上门检修 家庭维修 随时响应',
      path: '/page/index/index'
    }
  },
  redirectTo0: function () {
    wx.redirectTo({
      url: '../order/order',
    })
  },
  redirectTo1: function () {
    wx.redirectTo({
      url: '../order1/order1',
    })
  },
  redirectTo2: function () {
    wx.redirectTo({
      url: '../order2/order2',
    })
  },
  redirectTo3: function () {
    wx.redirectTo({
      url: '../order3/order3',
    })
  },
  redirectTo4: function () {
    wx.redirectTo({
      url: '../order4/order4',
    })
  },
  redirectTo5: function () {
    wx.redirectTo({
      url: '../order5/order5',
    })
  },

})