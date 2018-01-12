let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailAddr:'!'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    this.setData({
      contactName: app.globalData.userInfo.nickName
    })
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        // console.log(res.accuracy)
        wx.request({
          url: app.globalData.url + '/api/user/getAddr?latitude=' + latitude + '&longitude=' + longitude,
          method: 'GET',
          header: { TOKEN: app.globalData.token },
          data: {},
          success: function (res) {
            console.log(res.data);
            that.setData({
              province:res.data.parms.addr.province,
              city: res.data.parms.addr.city,
              district: res.data.parms.addr.district,
              street: res.data.parms.addr.street,
              street_number: res.data.parms.addr.street_number
            })
          },
          fail: err => {
            console.log(err)
          }
        })
      }
    })
  },
  showMap: function () {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        console.log(res)
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          contactName: app.globalData.userInfo.nickName,
          contactAddr: res.address
        });
        var temp = res.address;
        var rex = temp.replace(/[\u533a][^\\\/\^]+/, '');
        var street_number = temp.replace(/[^\\\/\^]+[\u533a]/, '');
        console.log(rex);
        var addr = rex + '区';
        var province = addr.replace(/[\u7701][^\\\/\^]+/, '') + '省';
        console.log(province);
        var city = addr.replace(/[^\\\/\^]+[\u7701]/, '').replace(/[\u5e02][^\\\/\^]+/, '') + '市';
        var district = addr.replace(/[^\\\/\^]+[\u5e02]+/, '');
        console.log(city);
        console.log(district);
        console.log(that.data.latitude)
        that.setData({
          province: province,
          city: city,
          district: district,
          street_number: street_number
        })
        console.log(that.data.latitude)
        console.log(that.data);
      },
      fail: (err) => {
        console.log(err)
      }
    })
  },
  phoneInput: function (e) {
    this.data.phone = e.detail.value
  },
  detailInput: function (e) {
    console.log(e.detail.value)
    this.setData({
      detailAddr: e.detail.value
    })
  },
  useContact: function () {
    let that = this;
    console.log(this.data.detailAddr)
    let addr = this.data.street_number + this.data.detailAddr

    wx.request({
      url: app.globalData.url + '/api/user/addaddr',
      method: 'POST',
      header: { TOKEN: app.globalData.token },
      data: {
        country: '中国',
        province: that.data.province,
        city: that.data.city,
        district: that.data.district,
        addr: addr,
        name: that.data.contactName,
        phone: that.data.phone,
        longitude: that.data.longitude,
        latitude: that.data.latitude
      },
      success: function (res) {
        console.log(res)
        wx.request({
          url: app.globalData.url + '/api/user/findAddr',
          method: 'GET',
          header: { TOKEN: app.globalData.token },
          data: {},
          success: function (res) {
            console.log(res.data);
            let currentId = res.data.parms.userAddresses[0].id;
            wx.request({
              url: app.globalData.url + '/api/user/uddfaddr/' + currentId,
              method: 'POST',
              header: { TOKEN: app.globalData.token },
              data: {},
              success: function (res) {
                console.log(res.data);
                wx.redirectTo({
                  url: '../demand/demand',
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
        // wx.redirectTo({
        //   url: '../contact/contact',
        // })
      },
      fail: function (err) {
        console.log(err)
      }
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