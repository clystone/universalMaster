var app = getApp();
Page({
  data: {
    stars: [0, 1, 2, 3, 4],
    normalSrc: '../../../../images/star-normal-l.png',
    selectedSrc: '../../../../images/star-active-l.png',
    key: 0,//评分
    keys: 3,
  },
  onLoad: function (options) {
    let that = this;
    console.log(options)
    this.setData({
      orderId: options.orderId,
      phone: options.masterPhone,
      masterId: options.masterId,
      name: options.masterName
    })
    wx.request({
      url: app.globalData.url + '/api/comment/find/' + that.data.orderId,
      method: 'GET',
      header: { TOKEN: app.globalData.token },
      data: {},
      success: function (res) {
        console.log(res.data);
        that.setData({
          // commentState: commentState
          comment: res.data.parms.comment,
          keys: res.data.parms.comment.score,
          master: res.data.parms.master,
        })
        wx.request({
          url: app.globalData.url + '/api/comment/findSome/' + that.data.master.id + '?page=1&size=5',
          method: 'GET',
          header: { TOKEN: app.globalData.token },
          data: {},
          success: function (res) {
            console.log(res.data);
            that.setData({
              keys: res.data.parms.avg
            })
          },
          fail: err => {
            console.log(err)
          }
        })
      },
      fail: err => {
        console.log(err)
      }
    })
    
  },
  back:function(){
    wx.navigateBack({
      
    })
  },
  makePhoneCall: function () {
    let that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.master.phone,
      success: function () {
        console.log("成功拨打电话")
      }
    })
  },
})