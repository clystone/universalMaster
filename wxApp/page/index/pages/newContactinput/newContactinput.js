let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // region: ['广东省', '广州市', '天河区'],
    customItem: '全部',
    contact: false,
    contactName: null,
    phone: null,
    detailAddr: ' ',
    province: null,
    city: null,
    district: null,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.currentSkill)
    this.setData({
      currentSkill: options.currentSkill
    })
    var that = this;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success() {
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              // wx.startRecord()
              wx.chooseLocation({
                success: function (res) {
                  console.log(res)
                  that.setData({
                    latitude: res.latitude,
                    longitude: res.longitude,
                    contact: true,
                    contactName: app.globalData.userInfo.nickName,
                    contactAddr: res.address
                  });
                  wx.request({
                    url: app.globalData.url + '/api/user/getAddr?latitude=' + that.data.latitude + '&longitude=' + that.data.longitude,
                    method: 'GET',
                    header: { TOKEN: app.globalData.token },
                    data: {},
                    success: function (res) {
                      console.log(res.data)
                      that.setData({
                        province: res.data.parms.addr.province,
                        city: res.data.parms.addr.city,
                        district: res.data.parms.addr.district,
                      })
                    },
                    fail: err => {
                      console.log(err)
                    }
                  })
                  var address = res.address;
                  // var province = address.slice(0, address.indexOf("省") + 1)
                  // var city = address.slice(address.indexOf("省") + 1, address.indexOf("市") + 1)
                  // var district = address.slice(address.indexOf("市") + 1, address.indexOf("区") + 1)
                  var street_name = address.replace(/[^\\\/\^]+[\u533a]/, '');
                  // var addr = rex + '区';
                  // var province = addr.replace(/[\u7701][^\\\/\^]+/, '') + '省';
                  // console.log(province);
                  // var city = addr.replace(/[^\\\/\^]+[\u7701]/, '').replace(/[\u5e02][^\\\/\^]+/, '') + '市';
                  // var district = addr.replace(/[^\\\/\^]+[\u5e02]+/, '');
                  that.setData({
                    // province: province,
                    // city: city,
                    // district: district,
                    street_name: street_name
                  })
                  console.log(that.data.latitude)
                  console.log(that.data);
                },
                fail: (err) => {
                  console.log(err)
                }
              })
            },
            fail: function () {
              wx.showModal({
                title: '警告',
                confirmText: '授权',
                cancelText: '不授权',
                content: '您没有授权小程序地址功能，将无法正常使用地址功能,点击授权按钮重新获取授权；若点击不授权按钮，后期还使用此功能，需先关闭此小程序然后重新打开重新授权即可使用',
                success: function (res) {
                  if (res.confirm) {
                    wx.openSetting({
                      success: (res) => {
                        if (res.authSetting["scope.userLocation"]) {////如果用户重新同意了授权登录
                          wx.chooseLocation({
                            success: function (res) {
                              console.log(res)
                              that.setData({
                                latitude: res.latitude,
                                longitude: res.longitude,
                                contact: true,
                                contactName: app.globalData.userInfo.nickName,
                                contactAddr: res.address
                              });
                              wx.request({
                                url: app.globalData.url + '/api/user/getAddr?latitude=' + that.data.latitude + '&longitude=' + that.data.longitude,
                                method: 'GET',
                                header: { TOKEN: app.globalData.token },
                                data: {},
                                success: function (res) {
                                  console.log(res.data)
                                  that.setData({
                                    province: res.data.parms.addr.province,
                                    city: res.data.parms.addr.city,
                                    district: res.data.parms.addr.district,
                                  })
                                },
                                fail: err => {
                                  console.log(err)
                                }
                              })
                              var address = res.address;
                              // var province = address.slice(0, address.indexOf("省") + 1)
                              // var city = address.slice(address.indexOf("省") + 1, address.indexOf("市") + 1)
                              // var district = address.slice(address.indexOf("市") + 1, address.indexOf("区") + 1)
                              var street_name = address.replace(/[^\\\/\^]+[\u533a]/, '');
                              // var addr = rex + '区';
                              // var province = addr.replace(/[\u7701][^\\\/\^]+/, '') + '省';
                              // console.log(province);
                              // var city = addr.replace(/[^\\\/\^]+[\u7701]/, '').replace(/[\u5e02][^\\\/\^]+/, '') + '市';
                              // var district = addr.replace(/[^\\\/\^]+[\u5e02]+/, '');
                              that.setData({
                                // province: province,
                                // city: city,
                                // district: district,
                                street_name: street_name
                              })
                              console.log(that.data.latitude)
                              console.log(that.data);
                            },
                            fail: (err) => {
                              console.log(err)
                            }
                          })
                        }
                      }, fail: function (res) {

                      }
                    })

                  }
                }
              })
            }
          })
        }
        else if (res.authSetting['scope.userLocation']) {
          wx.chooseLocation({
            success: function (res) {
              console.log(res)
              that.setData({
                latitude: res.latitude,
                longitude: res.longitude,
                contact: true,
                contactName: app.globalData.userInfo.nickName,
                contactAddr: res.address
              });
              wx.request({
                url: app.globalData.url + '/api/user/getAddr?latitude=' + that.data.latitude + '&longitude=' + that.data.longitude,
                method: 'GET',
                header: { TOKEN: app.globalData.token },
                data: {},
                success: function (res) {
                  console.log(res.data)
                  that.setData({
                    province: res.data.parms.addr.province,
                    city: res.data.parms.addr.city,
                    district: res.data.parms.addr.district,
                  })
                },
                fail: err => {
                  console.log(err)
                }
              })
              var address = res.address;
              // var province = address.slice(0, address.indexOf("省") + 1)
              // var city = address.slice(address.indexOf("省") + 1, address.indexOf("市") + 1)
              // var district = address.slice(address.indexOf("市") + 1, address.indexOf("区") + 1)
              var street_name = address.replace(/[^\\\/\^]+[\u533a]/, '');
              // var addr = rex + '区';
              // var province = addr.replace(/[\u7701][^\\\/\^]+/, '') + '省';
              // console.log(province);
              // var city = addr.replace(/[^\\\/\^]+[\u7701]/, '').replace(/[\u5e02][^\\\/\^]+/, '') + '市';
              // var district = addr.replace(/[^\\\/\^]+[\u5e02]+/, '');
              that.setData({
                // province: province,
                // city: city,
                // district: district,
                street_name: street_name
              })
              console.log(that.data.latitude)
              console.log(that.data);
            },
            fail: (err) => {
              console.log(err)
            }
          })
        }
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

  },
  // bindRegionChange: function (e) {
  //   console.log('picker发送选择改变，携带值为', e.detail.value)
  //   this.setData({
  //     region: e.detail.value
  //   })
  // },
  showMap: function () {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        console.log(res)
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          contact: true,
          contactName: app.globalData.userInfo.nickName,
          contactAddr: res.address
        });
        wx.request({
          url: app.globalData.url + '/api/user/getAddr?latitude=' + that.data.latitude + '&longitude=' + that.data.longitude,
          method: 'GET',
          header: { TOKEN: app.globalData.token },
          data: {},
          success: function (res) {
            console.log(res.data)
            that.setData({
              province: res.data.parms.addr.province,
              city: res.data.parms.addr.city,
              district: res.data.parms.addr.district,
            })
          },
          fail: err => {
            console.log(err)
          }
        })
        var address = res.address;
        // var province = address.slice(0, address.indexOf("省") + 1)
        // var city = address.slice(address.indexOf("省") + 1, address.indexOf("市") + 1)
        // var district = address.slice(address.indexOf("市") + 1, address.indexOf("区") + 1)
        var street_name = address.replace(/[^\\\/\^]+[\u533a]/, '');
        // var addr = rex + '区';
        // var province = addr.replace(/[\u7701][^\\\/\^]+/, '') + '省';
        // console.log(province);
        // var city = addr.replace(/[^\\\/\^]+[\u7701]/, '').replace(/[\u5e02][^\\\/\^]+/, '') + '市';
        // var district = addr.replace(/[^\\\/\^]+[\u5e02]+/, '');
        that.setData({
          // province: province,
          // city: city,
          // district: district,
          street_name: street_name
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
    if (e.detail.value) {
      this.data.detailAddr = e.detail.value
    }
  },
  increasecontact: function () {
    var that = this;

    if (!that.data.phone) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'loading',
        duration: 1000
      })
    }
    else if (!that.data.province) {
      wx.showToast({
        title: '地区缺少省份',
        icon: 'loading',
        duration: 1000
      })
    }
    else if (that.data.phone.length != 11) {
      wx.showToast({
        title: '请输入正确手机号',
        icon: 'loading',
        duration: 1000
      })
    }
    else {
      console.log(that.data.phone)
      console.log(that.data.street_name);
      console.log(that.data.detailAddr);
      let addr = that.data.street_name + that.data.detailAddr
      console.log(addr)
      that.setData({
        addr: addr
      })
      wx.request({
        url: app.globalData.url + '/api/user/addaddr',
        method: 'POST',
        header: { TOKEN: app.globalData.token },
        data: {
          country: '中国',
          province: that.data.province,
          city: that.data.city,
          district: that.data.district,
          addr: that.data.addr,
          name: that.data.contactName,
          phone: that.data.phone,
          longitude: that.data.longitude,
          latitude: that.data.latitude
        },
        success: function (res) {
          console.log(res)
          if (res.data.info == 1) {
            wx.redirectTo({
              url: '../newContact/newContact?currentSkill=' + that.data.currentSkill,
            })
          }
          else {
            wx.showToast({
              title: res.data.msg,
              icon: 'loading',
              duration: 1000
            })
          }
        },
        fail: function (err) {
          console.log(err)
        }
      })
    }
    // console.log(this.data.province)
    // console.log(this.data.city)
    // console.log(this.data.district)
    // console.log(this.data.detailAddr)
    // console.log(this.data.contactName)
    // console.log(this.data.phone)
    // console.log(this.data.longitude)
    // console.log(this.data.latitude)
  }
})