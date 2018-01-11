var that
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count: [1, 2, 3],
    currentItem: null,
    cutrrentId: null,
    // userAddresses:null
    chooseAddr: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      currentSkill: options.currentSkill
    })

  },
  onShow: function () {
    that = this;
    wx.request({
      url: app.globalData.url + '/api/user/findAddr',
      method: 'GET',
      header: { TOKEN: app.globalData.token },
      data: {},
      success: function (res) {
        console.log(res.data);
        that.setData({
          userAddresses: res.data.parms.userAddresses
        })
        console.log(that.data.userAddresses)
        // if (that.data.userAddresses.length){

        // }
        for (var i = 0; i < that.data.userAddresses.length; i++) {
          if (that.data.userAddresses[i].default == true) {
            that.setData({
              currentId1: that.data.userAddresses[i].id
            })
            // var currentId1 = that.data.userAddresses[i].id;
          }
        }
        console.log(that.data.currentId1)
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  changeSelected: function (e) {
    this.setData({
      currentItem: e.currentTarget.dataset.idx,
      currentId: e.currentTarget.dataset.currentid,
      chooseAddr: true
    })
    console.log(this.data.currentId);
    var that = this;
    // console.log(app.globalData.token)
    wx.request({
      url: app.globalData.url + '/api/user/uddfaddr/' + that.data.currentId,
      method: 'POST',
      header: { TOKEN: app.globalData.token },
      data: {},
      success: function (res) {
        console.log(res.data);
      },
      fail: err => {
        console.log(err)
      }
    })

  },
  useAddr: function (e) {
    let that = this;
    let addrId = e.currentTarget.dataset.currentid
    console.log(addrId)
    wx.request({
      url: app.globalData.url + '/api/user/uddfaddr/' + addrId,
      method: 'POST',
      header: { TOKEN: app.globalData.token },
      data: {},
      success: function (res) {
        console.log(res.data);
        if (that.data.currentSkill){
          wx.redirectTo({
            url: '../newDemand/newDemand?currentSkill=' + that.data.currentSkill,
          })
        }
        else{
          wx.redirectTo({
            url: '../chooseSkill/chooseSkill',
          })
        }
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  delItem: function (e) {
    let that = this;
    let addrId = e.currentTarget.dataset.currentid
    console.log(addrId)
    wx.showModal({
      title: '是否删除该地址信息',
      confirmColor: '#0087fe',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定');
          wx.request({
            url: app.globalData.url + '/api/user/dladdr/' + addrId,
            method: 'POST',
            header: { TOKEN: app.globalData.token },
            data: {},
            success: function (res) {
              console.log(res.data);
              var page = getCurrentPages();
              console.log(page)
              console.log(page[page.length - 1]);
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
  returnDemand: function () {
    if (this.data.currentId) {
      wx.redirectTo({
        url: '../newDemand/newDemand',
      })
    }
    else {
      wx.showModal({
        title: '请选择联系地址信息',
        confirmColor: '#0087fe',
        // content: '若在师傅接单10分钟后更换师傅将收取一定的服务费，是否确定？',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定');
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }

  }
})