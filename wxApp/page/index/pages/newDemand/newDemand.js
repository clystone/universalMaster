var util = require('../../../../util/util.js')
var playTimeInterval
var recordTimeInterval
var sourceType = ['camera', 'album']
var sizeType = ['compressed', 'original']
var that;
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    countIndex1: 0,
    count1: [1, 2, 3],
    imageList2: [],
    timeArray: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00',],
    mIndex: [0, 12],
    showTxts: true,
    // showServices:true,
    recording: false,
    playing: false,
    hasRecord: false,
    recordTime: 0,
    playTime: 0,
    gooditems1: [],
    formatedRecordTime: '00:00',
    formatedPlayTime: '00:00',
    multiIndex: [0, 0],
    // textDes: null,
    imageList: [],
    countIndex: 2,
    count: [1, 2, 3],
    firstStep: true,
    secondStep: false,
    currentId1: null,
    textDes: '',
    formId: null,
    btnDis: false,
    recordText: '按住说话'
  },

  good: {//商品

  },
  chooseitems: [//选中的花色

  ],
  itemSelect: 0,//判断是否选中

  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    // wx.getSetting({
    //   success(res) {
    //     if (!res.authSetting['scope.record']) {
    //       wx.authorize({
    //         scope: 'scope.record',
    //         success() {
    //           // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
    //           // wx.startRecord()
    //         }
    //       })
    //     }
    //   }
    // })
    console.log(options)
    let that = this;
    this.setData({
      currentSkill: options.currentSkill
    })
  },
  onShow: function () {
    let that = this;
    if (this.data.currentSkill) {
      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.record']) {
            wx.authorize({
              scope: 'scope.record',
              success() {
                // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
                // wx.startRecord()
              },
              fail: function () {
                wx.showModal({
                  title: '警告',
                  confirmText: '授权',
                  cancelText: '不授权',
                  content: '您没有授权小程序录音功能，将无法正常使用录音功能,点击授权按钮重新获取授权；若点击不授权按钮，后期还使用此功能，需先关闭此小程序然后重新打开重新授权即可使用',
                  success: function (res) {
                    if (res.confirm) {
                      wx.openSetting({
                        success: (res) => {
                          if (res.authSetting["scope.record"]) {////如果用户重新同意了授权登录

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
        }
      })
    }

    var time1 = util.formatTime1(new Date());
    var timeStamp1 = Date.parse(time1);
    var day1 = util.formatMyTime(new Date());
    var date1 = util.formatDate(new Date());
    console.log(date1)

    var timeStamp2 = timeStamp1 + 24 * 60 * 60 * 1000;
    var time2 = new Date(timeStamp2);
    var day2 = util.formatMyTime(time2);
    var date2 = util.formatDate(time2);
    console.log(date2)

    var timeStamp3 = timeStamp1 + 2 * 24 * 60 * 60 * 1000;
    var time3 = new Date(timeStamp3);
    var day3 = util.formatMyTime(time3);
    var date3 = util.formatDate(time3);

    var timeStamp4 = timeStamp1 + 3 * 24 * 60 * 60 * 1000;
    var time4 = new Date(timeStamp4);
    var day4 = util.formatMyTime(time4);
    var date4 = util.formatDate(time4);

    var timeStamp5 = timeStamp1 + 4 * 24 * 60 * 60 * 1000;
    var time5 = new Date(timeStamp5);
    var day5 = util.formatMyTime(time5);
    var date5 = util.formatDate(time5);

    var timeStamp6 = timeStamp1 + 5 * 24 * 60 * 60 * 1000;
    var time6 = new Date(timeStamp6);
    var day6 = util.formatMyTime(time6);
    var date6 = util.formatDate(time6);

    var timeStamp7 = timeStamp1 + 6 * 24 * 60 * 60 * 1000;
    var time7 = new Date(timeStamp7);
    var day7 = util.formatMyTime(time7);
    var date7 = util.formatDate(time7);
    // 再通过setData更改Page()里面的data，动态更新页面的数据  
    this.setData({
      newArray: [
        { name: '今天', value: date1 },
        { name: '明天', value: date2 },
        { name: '后天', value: date3 },
        { name: day4, value: date4 },
        { name: day5, value: date5 },
        { name: day6, value: date6 },
        { name: day7, value: date7 },],
      mArray: [['今天', '明天', '后天', day4, day5, day6, day7], ['00:00-01:00', '01:00-02:00', '02:00-03:00', '03:00-04:00', '04:00-05:00', '05:00-06:00', '06:00-07:00', '07:00-08:00', '08:00-09:00', '09:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00', '13:00-14:00', '14:00-15:00', '15:00-16:00', '16:00-17:00', '17:00-18:00', '18:00-19:00', '19:00-20:00', '20:00-21:00', '21:00-22:00', '22:00-23:00', '23:00-00:00']],
      timeStamp1: timeStamp1,
    });

    //获取服务类型
    wx.request({
      url: app.globalData.url + '/api/skill/findAll/1001',
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data.parms.skill)
        that.setData({
          gooditems1: res.data.parms.skill
        })
        console.log(that.data.gooditems1)
      },
      fail: function (err) {
        console.log(err)
      }
    })
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
            url: '../contactinput/contactinput',
          })
        }
        else if (!that.data.currentSkill) {
          wx.redirectTo({
            url: '../chooseSkill/chooseSkill',
          })
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
  },
  toChooseSkill: function () {
    wx.redirectTo({
      url: '../chooseSkill/chooseSkill',
    })
  },
  showHelp: function () {
    this.setData({
      helpToast: true
    })
  },
  hideHelp: function () {
    this.setData({
      helpToast: false
    })
  },
  timeTest: function () {
    let temp = '2017/11/28 00:00'
    var timeStamp = Date.parse(temp);
    console.log(this.data.newIndex)
    console.log(this.data.mArray[1][this.data.newIndex[1]])
    console.log(timeStamp)
    console.log(this.data.newArray[this.data.newIndex[0]].value)
    console.log(this.data.timeArray[this.data.newIndex[1]])
    let bookTime = this.data.newArray[this.data.newIndex[0]].value + ' ' + this.data.timeArray[this.data.newIndex[1]]
    console.log(bookTime)
    let bookTime2 = Date.parse(bookTime);
    console.log(bookTime2)
  },
  bindMultiPickerChange1: function (e) {
    console.log('mpicker发送选择改变，携带值为', e.detail.value)
    this.setData({
      mIndex: e.detail.value,
      newIndex: e.detail.value
    })
    // this.setData({
    //   whenTime: this.data.mArray[0][this.data.mIndex[0]] + ' ' + this.data.mArray[1][this.data.mIndex[1]]
    // })
  },
  bindTextInt: function (e) {
    console.log(e.detail.value)
    this.setData({
      textDes: e.detail.value
    })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  formSubmit: function (e) {
    let that = this;
    // let booktime = this.data.date + ' ' + this.data.time
    // let date1 = this.data.date;
    // let time1 = this.data.time;
    // let myTime = booktime.replace(/-/g, '/');
    // let bookTime1 = Date.parse(new Date(myTime))
    // console.log(bookTime1)
    if (this.data.newIndex) {
      let bookTime = this.data.newArray[this.data.newIndex[0]].value + ' ' + this.data.timeArray[this.data.newIndex[1]]
      console.log(bookTime)
      var bookTime2 = Date.parse(bookTime);
      var timestampNow = Date.parse(new Date());
      this.setData({
        bookTime2: bookTime2
      });
      console.log(e.detail.formId);
      this.setData({
        formId: e.detail.formId
      })

      if (timestampNow > bookTime2) {
        that.setData({
          btnDis: false
        })
        wx.showToast({
          title: '预约时间有误',
          icon: 'loading',
          duration: 1000
        })
      }

      else if (!that.data.currentSkill) {
        that.setData({
          btnDis: false
        })
        wx.showToast({
          title: '请选择服务类型',
          icon: 'loading',
          duration: 1000
        })
      }
      else if (!that.data.bookTime2) {
        that.setData({
          btnDis: false
        })
        wx.showToast({
          title: '请选择预约时间',
          icon: 'loading',
          duration: 1000
        })
      }
      else {
        wx.showToast({
          title: '下单中...',
          duration: 10000,
          icon: 'loading'
        })
        that.setData({
          btnDis: true
        })
        wx.request({
          url: app.globalData.url + '/api/order/add',
          method: 'POST',
          header: { TOKEN: app.globalData.token },
          data: {
            addr: that.data.addr1,
            bookTime: that.data.bookTime2,
            country: that.data.country1,
            city: that.data.city1,
            district: that.data.district1,
            province: that.data.province1,
            phone: that.data.phone1,
            name: that.data.name1,
            title: '家电维修',
            skill: that.data.currentSkill,
            remark: that.data.textDes,
            latitude: that.data.latitude1,
            longitude: that.data.longitude1
          },
          success: function (res) {
            console.log(res.data);

            let orderId = res.data.parms.orderId;
            wx.request({
              url: app.globalData.url + '/api/user/updateFormId/' + orderId + '/' + that.data.formId,
              header: { TOKEN: app.globalData.token },
              method: 'POST',
              success: function (res) {
                console.log(res)
              },
              fail: function (err) {
                console.log(err)
              }
            })
            wx.uploadFile({
              url: app.globalData.url + '/api/file/ulpic2/' + orderId + '/0',
              filePath: that.data.imageList[0],
              name: 'file',
              header: { TOKEN: app.globalData.token },
              formData: {},
              success: function (res) {
                console.log(res)
                if (res.statusCode == 200) {
                  console.log('上传图片0成功')
                }
                //do something
                wx.uploadFile({
                  url: app.globalData.url + '/api/file/ulpic2/' + orderId + '/1',
                  filePath: that.data.imageList[1],
                  name: 'file',
                  header: { TOKEN: app.globalData.token },
                  formData: {},
                  success: function (res) {
                    console.log(res)
                    if (res.statusCode == 200) {
                      console.log('上传图片1成功')
                    }
                    //do something
                    wx.uploadFile({
                      url: app.globalData.url + '/api/file/ulpic2/' + orderId + '/2',
                      filePath: that.data.imageList[2],
                      name: 'file',
                      header: { TOKEN: app.globalData.token },
                      formData: {},
                      success: function (res) {
                        console.log(res)
                        if (res.statusCode == 200) {
                          console.log('上传图片2成功')
                        }
                        //do something

                      },
                      fail: function (err) {
                        that.setData({
                          btnDis: true
                        })
                        // wx.showToast({
                        //   title: '上传图片1失败',
                        //   icon: 'loading',
                        //   duration: 1000
                        // })
                      }
                    });
                  },
                  fail: function (err) {
                    that.setData({
                      btnDis: true
                    })
                    // wx.showToast({
                    //   title: '上传图片1失败',
                    //   icon: 'loading',
                    //   duration: 1000
                    // })
                  }
                });
              },
              fail: function (err) {
                that.setData({
                  btnDis: true
                })
                // wx.showToast({
                //   title: '下单失败，请重新下单',
                //   icon: 'loading',
                //   duration: 1000
                // })
              }
            });
            setTimeout(function () {
              wx.uploadFile({
                url: app.globalData.url + '/api/file/ulrecord/' + orderId, //orderId测试为9
                filePath: that.data.tempFilePath,
                name: 'file',
                header: { TOKEN: app.globalData.token },
                formData: {},
                success: function (res) {
                  console.log(res)
                  console.log('上传音频成功')
                },
                fail: function (err) {
                  console.log(err)
                }
              })
              wx.switchTab({
                url: '../../../order/index',
              })
            }, 500)
          },
          fail: err => {
            console.log(err)
          }
        })
      }
    }
    else {
      that.setData({
        btnDis: false
      })
      wx.showToast({
        title: '请选择预约时间',
        icon: 'loading',
        duration: 1000
      })
    }
  },
  showPicRecord: function () {
    let booktime = this.data.date + ' ' + this.data.time
    let date1 = this.data.date;
    let time1 = this.data.time;
    let myTime = booktime.replace(/-/g, '/');
    let bookTime1 = Date.parse(new Date(myTime))
    console.log(bookTime1)
    this.setData({
      bookTime1: bookTime1
    });
    let that = this;
    console.log(this.data.formId);
    // if (!that.data.itemNameSelect){
    //   wx.showToast({
    //     title: '请选择服务类型',
    //     icon: 'loading',
    //     duration: 1000
    //   })
    // }
    // else if (!that.data.date) {
    //   wx.showToast({
    //     title: '请选择日期',
    //     icon: 'loading',
    //     duration: 1000
    //   })
    // }
    // else if (!that.data.time) {
    //   wx.showToast({
    //     title: '请选择时间',
    //     icon: 'loading',
    //     duration: 1000
    //   })
    // }
    // else{
    //   wx.request({
    //     url: app.globalData.url + '/api/order/add',
    //     method: 'POST',
    //     header: { TOKEN: app.globalData.token },
    //     data: {
    //       addr: that.data.addr1,
    //       bookTime: that.data.bookTime1,
    //       country: that.data.country1,
    //       city: that.data.city1,
    //       district: that.data.district1,
    //       province: that.data.province1,
    //       phone: that.data.phone1,
    //       name: that.data.name1,
    //       title: '家电维修',
    //       skill: that.data.itemNameSelect,
    //       remark: that.data.textDes,
    //       latitude: that.data.latitude1,
    //       longitude: that.data.longitude1
    //     },
    //     success: function (res) {
    //       console.log(res.data);

    //       let orderId = res.data.parms.orderId;
    //       wx.uploadFile({
    //         url: app.globalData.url + '/api/file/ulpic/' + orderId,
    //         filePath: that.data.imageList[0],
    //         name: 'files',
    //         header: { TOKEN: app.globalData.token },
    //         formData: {},
    //         success: function (res) {
    //           console.log(res)
    //           console.log('上传图片成功')
    //           //do something
    //         },
    //         fail: function (err) {
    //           console.log(err)
    //         }
    //       });
    //       // wx.uploadFile({
    //       //   url: app.globalData.url + '/api/file/ulrecord/' + orderId, //orderId测试为9
    //       //   filePath: that.data.tempFilePath,
    //       //   name: 'file',
    //       //   header: { TOKEN: app.globalData.token },
    //       //   formData: {},
    //       //   success: function (res) {
    //       //     console.log(res)
    //       //     console.log('上传音频成功')
    //       //   },
    //       //   fail: function (err) {
    //       //     console.log(err)
    //       //   }
    //       // })
    //       wx.switchTab({
    //         url: '../../../order/index',
    //       })
    //     },
    //     fail: err => {
    //       console.log(err)
    //     }
    //   })
    // }
  },

  testUpdateRecord: function () {
    console.log(this.data.tempFilePath)
    var that = this;
    wx.uploadFile({
      url: app.globalData.url + '/api/file/ulrecord/182', //orderId测试为9
      filePath: that.data.tempFilePath,
      name: 'file',
      header: { TOKEN: app.globalData.token },
      formData: {},
      success: function (res) {
        console.log(res)
        if (res.statusCode == 200) {
          console.log('测试上传录音成功')
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },

  onHide: function () {
    if (this.data.playing) {
      this.stopVoice()
    } else if (this.data.recording) {
      this.stopRecordUnexpectedly()
    }
  },
  // 选择图片
  chooseImage: function () {
    var that = this
    let imageListTemp = this.data.imageList;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      count: 3 - that.data.imageList.length,
      success: function (res) {
        console.log(res)

        var imgsrc = res.tempFilePaths;
        let imageList1 = imageListTemp.concat(imgsrc)
        // that.setData({
        //   imageList2: imageList1
        // })
        that.setData({
          imageList: imageList1
        })
        console.log(that.data.imageList)
      }
    })
  },
  // 预览图片
  previewImage: function (e) {
    var current = e.target.dataset.src

    wx.previewImage({
      current: current,
      urls: this.data.imageList
    })
  },
  // 删除图片
  deleteImage: function (e) {
    var index = e.currentTarget.dataset.index;
    var imageList = this.data.imageList;
    imageList.splice(index, 1);
    this.setData({
      imageList: imageList
    })
  },

  startRecord: function () {
    // this.setData({ recording: true })
    this.setData({
      recordText: '录音中'
    })
    var that = this
    recordTimeInterval = setInterval(function () {
      var recordTime = that.data.recordTime += 1
      that.setData({
        formatedRecordTime: util.ft(that.data.recordTime),
        recordTime: recordTime
      })
    }, 1000)
    wx.startRecord({
      success: function (res) {
        that.setData({
          tempFilePath: res.tempFilePath,
          formatedPlayTime: util.ft(that.data.playTime)
        })
      },
      complete: function () {
        that.setData({ recording: false })
        clearInterval(recordTimeInterval)
      }
    })
  },
  stopRecord: function () {
    wx.stopRecord()
    this.setData({
      recording: false,
      recordText: '按住说话',
      // recording: true,
      hasRecord: true
    })
  },
  // stopRecordUnexpectedly: function () {
  //   var that = this
  //   wx.stopRecord({
  //     success: function () {
  //       console.log('stop record success')
  //       clearInterval(recordTimeInterval)
  //       that.setData({
  //         recording: false,
  //         hasRecord: false,
  //         recordTime: 0,
  //         formatedRecordTime: util.ft(0)
  //       })
  //     }
  //   })
  // },
  playVoice: function () {
    var that = this
    that.setData({
      playing: true
    })
    playTimeInterval = setInterval(function () {
      var playTime = that.data.playTime + 1
      console.log('update playTime', playTime)
      that.setData({
        formatedPlayTime: util.ft(playTime),
        playTime: playTime
      })
    }, 1000)
    wx.playVoice({
      filePath: this.data.tempFilePath,
      success: function () {

      },
      complete: function () {
        clearInterval(playTimeInterval)
        var playTime = 0
        console.log('play voice finished')
        that.setData({
          playing: false,
          formatedPlayTime: util.ft(playTime),
          playTime: playTime
        })
      }
    })
  },
  pauseVoice: function () {
    clearInterval(playTimeInterval)
    wx.pauseVoice()
    this.setData({
      playing: false
    })
  },
  stopVoice: function () {
    clearInterval(playTimeInterval)
    this.setData({
      playing: false,
      formatedPlayTime: util.ft(0),
      playTime: 0
    })
    wx.stopVoice()
  },
  clear: function () {
    clearInterval(playTimeInterval)
    wx.stopVoice()
    this.setData({
      playing: false,
      hasRecord: false,
      tempFilePath: '',
      formatedRecordTime: util.ft(0),
      recordTime: 0,
      playTime: 0
    })
  },
  chooseImage1: function () {
    var that = this
    let imageListTemp = this.data.imageList2;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      // count: this.data.count[this.data.countIndex],
      count: 3 - that.data.imageList2.length,
      success: function (res) {
        console.log(res)
        var imgsrc = res.tempFilePaths;
        let imageList1 = imageListTemp.concat(imgsrc)
        that.setData({
          imageList2: imageList1
        })
      }
    })
    // console.log(this.data.imageList[0])
  },
  // 预览图片
  previewImage1: function (e) {
    var current = e.target.dataset.src

    wx.previewImage({
      current: current,
      urls: this.data.imageList2
    })
  },
  // 删除图片
  deleteImage1: function (e) {
    var index = e.currentTarget.dataset.index;
    var imageList2 = this.data.imageList2;
    imageList.splice(index, 1);
    this.setData({
      imageList2: imageList2
    })
  },

  testPic: function () {
    let that = this;
    console.log(this.data.imageList[0])
    wx.uploadFile({
      url: 'http://www.quannengshifu.com/api/file/ulpic2/' + 169 + '/0',
      filePath: that.data.imageList[0],
      name: 'file',
      header: { TOKEN: app.globalData.token },
      formData: {},
      success: function (res) {
        if (res.statusCode == 200) {
          console.log('上传图片0成功')
        }
        console.log(res)
        //do something
        wx.uploadFile({
          url: 'http://www.quannengshifu.com/api/file/ulpic2/' + 169 + '/1',
          filePath: that.data.imageList[1],
          name: 'file',
          header: { TOKEN: app.globalData.token },
          formData: {},
          success: function (res) {
            console.log(res)
            if (res.statusCode == 200) {
              console.log('上传图片1成功')
            }
            //do something
            wx.uploadFile({
              url: 'http://www.quannengshifu.com/api/file/ulpic2/' + 169 + '/2',
              filePath: that.data.imageList[2],
              name: 'file',
              header: { TOKEN: app.globalData.token },
              formData: {},
              success: function (res) {
                console.log(res)
                if (res.statusCode == 200) {
                  console.log('上传图片0成功')
                }
                //do something
              },
              fail: function (err) {
                that.setData({
                  btnDis: true
                })
                wx.showToast({
                  title: '上传图片2失败',
                  icon: 'loading',
                  duration: 1000
                })
              }
            });
          },
          fail: function (err) {
            that.setData({
              btnDis: true
            })
            wx.showToast({
              title: '上传图片1失败',
              icon: 'loading',
              duration: 1000
            })
          }
        });
      },
      fail: function (err) {
        that.setData({
          btnDis: true
        })
        wx.showToast({
          title: '上传图片0失败',
          icon: 'loading',
          duration: 1000
        })
      }
    });
  },
})