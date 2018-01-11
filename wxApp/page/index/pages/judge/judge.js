let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    //获取地址
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
              currentId1: that.data.userAddresses[i].id,
              country1: that.data.userAddresses[i].country,
              province1: that.data.userAddresses[i].province,
              city1: that.data.userAddresses[i].city,
              district1: that.data.userAddresses[i].district,
              latitude1: that.data.userAddresses[i].latitude,
              longitude1: that.data.userAddresses[i].longitude,
              name1: that.data.userAddresses[i].name,
              phone1: that.data.userAddresses[i].phone,
              addr1: that.data.userAddresses[i].addr,
              hasDefault: true
            })
            // var currentId1 = that.data.userAddresses[i].id;
          }
          // else{
          //   wx.redirectTo({
          //     url: '../contact/contact',
          //   })
          // }

        }

        if (!that.data.hasDefault) {
          console.log(111)
          wx.redirectTo({
            url: '../newContactinput/newContactinput',
          })
        }
        else if (!that.data.currentSkill) {
          wx.redirectTo({
            url: '../chooseSkill/chooseSkill',
          })
        }
        else {
          // that.setData({
          //   loading: false
          // })
        }
        // else {
        //   wx.redirectTo({
        //     url: '../contactinput/contactinput',
        //   })
        // }

        console.log(that.data.currentId1)
      },
      fail: err => {
        console.log(err)
      },
      complete: function () {
        // if (!that.data.hasDefault) {
        //   console.log(111)
        //   wx.redirectTo({
        //     url: '../contactinput/contactinput',
        //   })
        // }
        // else if (!that.data.currentSkill){
        //   wx.redirectTo({
        //     url: '../chooseSkill/chooseSkill',
        //   })
        // }
      }
    })

    // wx.showToast({
    //   title: '加载中...',
    //   icon: 'loading'
    // })
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