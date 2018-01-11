var app = getApp();
Page({
  data: {
    stars: [0, 1, 2, 3, 4],
    normalSrc: '../../../../images/star-normal-l.png',
    selectedSrc: '../../../../images/star-active-l.png',
    key: 0,//评分
    keys: 0,
    content:''
  },
  onLoad: function (options) {
    console.log(options)
    let that = this;
    this.setData({
      orderId:options.orderId,
      phone:options.masterPhone,
      masterId: options.masterId,
      name: options.masterName
    })
    wx.request({
      url: app.globalData.url + '/api/comment/findSome/' + that.data.masterId + '?page=1&size=5',
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
  //点击右边,半颗星
  selectStar: function (e) {
    var key = e.currentTarget.dataset.key
    if (this.data.key == 1 && e.currentTarget.dataset.key == 1) {
      //只有一颗星的时候,再次点击,变为0颗
      key = 0;
    }
    console.log("得" + key + "分")
    this.setData({
      key: key
    })
  },
  makePhoneCall: function () {
    let that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.phone,
      success: function () {
        console.log("成功拨打电话")
      }
    })
  },
  commentInput:function(e){
    this.setData({
      content: e.detail.value
    })
  },
  evaluate:function(){
    let that = this;
    wx.request({
      url: app.globalData.url + '/api/comment/add',
      method: 'POST',
      header: { TOKEN: app.globalData.token },
      data: {
        masterId: that.data.masterId,
        orderId: that.data.orderId,
        score: that.data.key,
        content: that.data.content
      },
      success: function (res) {
        console.log(res.data);
        wx.navigateBack({
          delta:2
        });
      },
      fail: err => {
        console.log(err)
      }
    })
  }
})