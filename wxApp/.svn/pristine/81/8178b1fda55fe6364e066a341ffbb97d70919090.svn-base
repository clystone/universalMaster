//index.js
var app = getApp();
//获取应用实例
Page({
  data: {
  },
  //事件处理函数
  onLoad: function (options) {
    var scene = decodeURIComponent(options.scene);
    let that = this;
    // 获取用户信息
    wx.getSetting({
      success: function (res) {
        // if (res.authSetting['scope.userInfo']) {
        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        wx.getUserInfo({
          lang: 'zh_CN',
          success: function (res) {
            // 可以将 res 发送给后台解码出 unionId
            // console.log(res.userInfo)
            app.globalData.userInfo = res.userInfo
            console.log(app.globalData.userInfo)
            wx.login({
              success: function (res) {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                console.log(res.code)
                if (res.code) {
                  // console.log(app.globalData.userInfo.avatarUrl)
                  wx.request({
                    url: app.globalData.url + '/api/mp/login',
                    method: 'POST',
                    data: {
                      code: res.code,
                      headImgUrl: app.globalData.userInfo.avatarUrl,
                      nickname: app.globalData.userInfo.nickName,
                      sex: app.globalData.userInfo.gender,
                      country: app.globalData.userInfo.country,
                      province: app.globalData.userInfo.province,
                      city: app.globalData.userInfo.city
                    },
                    success: function (res) {
                      console.log(res.data.parms.token)
                      app.globalData.token = res.data.parms.token
                      // setTimeout(function () {
                      that.setData({
                        complete: true
                      });
                      wx.request({
                        url: app.globalData.url + '/api/user/udup/' + scene,
                        method: 'POST',
                        header: { TOKEN: app.globalData.token },
                        data: {},
                        success: function (res) {
                          console.log(res.data);
                          if (res.data.info == 1) {
                            wx.showToast({
                              title: '关联成功',
                              icon: 'success',
                              duration: 1000
                            })
                          }
                        },
                        fail: err => {
                          console.log(err)
                        }
                      })
                      // }, 200)
                      // that.setData({
                      //   complete:false
                      // })
                    }
                  })
                }

              }
              
            })
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            if (this.userInfoReadyCallback) {
              this.userInfoReadyCallback(res)

            }
          },
          fail: function () {
            wx.showModal({
              title: '警告',
              confirmText: '授权',
              cancelText: '不授权',
              content: '您没有授权微信登录，将无法正常使用全能师傅客户端,点击授权按钮重新获取授权；若点击不授权按钮，后期还使用小程序，需先关闭此小程序然后重新打开重新授权即可使用',
              success: function (res) {
                if (res.confirm) {
                  wx.openSetting({
                    success: (res) => {
                      if (res.authSetting["scope.userInfo"]) {////如果用户重新同意了授权登录
                        wx.getUserInfo({
                          lang: 'zh_CN',
                          success: function (res) {
                            // 可以将 res 发送给后台解码出 unionId
                            // console.log(res.userInfo)
                            app.globalData.userInfo = res.userInfo
                            console.log(app.globalData.userInfo)
                            wx.login({
                              success: function (res) {
                                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                                console.log(res.code)
                                if (res.code) {
                                  // console.log(app.globalData.userInfo.avatarUrl)
                                  wx.request({
                                    url: app.globalData.url + '/api/mp/login',
                                    method: 'POST',
                                    data: {
                                      code: res.code,
                                      headImgUrl: app.globalData.userInfo.avatarUrl,
                                      nickname: app.globalData.userInfo.nickName,
                                      sex: app.globalData.userInfo.gender,
                                      country: app.globalData.userInfo.country,
                                      province: app.globalData.userInfo.province,
                                      city: app.globalData.userInfo.city
                                    },
                                    success: function (res) {
                                      console.log(res.data.parms.token)
                                      app.globalData.token = res.data.parms.token
                                      // setTimeout(function () {
                                      that.setData({
                                        complete: true
                                      });
                                      wx.request({
                                        url: app.globalData.url + '/api/user/udup/' + scene,
                                        method: 'POST',
                                        header: { TOKEN: app.globalData.token },
                                        data: {},
                                        success: function (res) {
                                          console.log(res.data);
                                          if (res.data.info == 1) {
                                            wx.showToast({
                                              title: '关联成功',
                                              icon: 'success',
                                              duration: 1000
                                            })
                                          }
                                        },
                                        fail: err => {
                                          console.log(err)
                                        }
                                      })
                                      // }, 200)
                                      // that.setData({
                                      //   complete:false
                                      // })
                                    }
                                  })
                                }

                              }

                            })
                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                              this.userInfoReadyCallback(res)

                            }
                          }
                        });
                      }
                    }, fail: function (res) {

                    }
                  })

                }
              }
            })
          }
        });
        // }
      }
    });

  },
  onShow: function () {

  },
  onReady: function () {

  },
  onShareAppMessage: function () {
    return {
      title: '全能师傅',
      // desc: '上门检修 家庭维修 随时响应',
      path: '/page/index/index'
    }
  },
  // onPullDownRefresh: function () {
  //   // wx.startPullDownRefresh()
  //   wx.stopPullDownRefresh()
  //   wx.getUserInfo({
  //     success: function () {
  //       console.log('success')
  //     }
  //   });
  // },
})
