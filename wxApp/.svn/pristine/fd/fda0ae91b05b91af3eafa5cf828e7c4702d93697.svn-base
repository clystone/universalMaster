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
    wx.request({
      url: app.globalData.url + '/api/agency/findhouses?page=1&size=999',
      method: 'GET',
      header: { TOKEN: app.globalData.token },
      data: {},
      success: function (res) {
        console.log(res.data);
        that.setData({
          agencies: res.data.parms.agencies
        })
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  chooseItem: function (data) {
    var that = this;
    var item_id = data.currentTarget.dataset.select;
    var item_name = data.currentTarget.dataset.itemName;

    that.setData({//把选中值，放入判断值中
      itemNameSelect: item_name,
      itemSelect: item_id
    })
    var str = item_id + ',' + item_name;
    var chooseitems = that.data.chooseitems;
    chooseitems = [];
    chooseitems.push(str);
    that.setData({
      chooseitems: chooseitems,
      itemImgSelect: data.currentTarget.dataset.img
    })
    console.log(this.data.itemNameSelect)
  },
  ensureAgency:function(){
    let that = this;
    console.log(this.data.itemSelect);
    if (this.data.itemSelect){
      wx.request({
        url: app.globalData.url + '/api/user/udhouse/' + that.data.itemSelect,
        method: 'POST',
        header: { TOKEN: app.globalData.token },
        data: {},
        success: function (res) {
          // console.log(res.data)
          let msg = res.data.msg;
          if (res.data.info == 1){
            wx.showToast({
              title: '更新成功',
              icon: 'success',
              duration: 1000,
              success: function(){
                setTimeout(function(){
                  wx.switchTab({
                    url: '../../../my/index',
                  })
                },1000)
              }
            })
          }
          else{
            console.log(res.data)
            wx.showToast({
              title: res.data.msg,
              icon: 'loading',
              duration: 1000
            })
          }
        },
        fail: err => {
          console.log(err)
        }
      })
    }
    else{
      wx.showToast({
        title: '请选择楼盘',
        icon: 'loading',
        duration: 1000
      })
    }
    
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