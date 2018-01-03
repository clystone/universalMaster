//app.js
let app = getApp();
App({
  globalData: {
    userInfo: null,
    url:'https://shifu.jack-kwan.com',
    token:''
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // wx.getUserInfo({
    //   lang: 'zh_CN' ,
    //   success: function (res) {
    //     console.log('success')
    //   }
    // })

    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     console.log(res.code)
    //     if(res.code){

    //     }
    //   }
    // })

    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           // console.log(res.userInfo)
    //           this.globalData.userInfo = res.userInfo
    //           console.log(this.globalData.userInfo)
    //           wx.login({
    //             success: res => {
    //               // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //               console.log(res.code)
    //               if (res.code) {
    //                 // console.log(app.globalData.userInfo.avatarUrl)
    //                 wx.request({
    //                   url: app.globalData.url + '/api/mp/login',
    //                   method: 'POST',
    //                   data: {
    //                     code: res.code,
    //                     headImgUrl: app.globalData.userInfo.avatarUrl,
    //                     nickname: app.globalData.userInfo.nickName,
    //                     sex: app.globalData.userInfo.gender,
    //                     country: app.globalData.userInfo.country,
    //                     province: app.globalData.userInfo.province,
    //                     city: app.globalData.userInfo.city
    //                   },
    //                   success: res => {
    //                     console.log(res.data.parms.token)
    //                     app.globalData.token = res.data.parms.token
    //                   }
    //                 })
    //               }

    //             }
    //           })
    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           // if (this.userInfoReadyCallback) {
    //           //   this.userInfoReadyCallback(res)
                
    //           // }
    //         }
    //       });
    //     }
    //   }
    // });

    
  }

//   return {
//     title: '全能师傅',
//     desc: '上门检修 家庭维修 随时响应',
//     path: 'page/index/index'
//   }
// }
  
})