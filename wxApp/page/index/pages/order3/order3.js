let app = getApp()
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
    console.log(options)
  },
  redirectTo0: function () {
    wx.redirectTo({
      url: '../order/order',
    })
  },
  redirectTo1: function () {
    wx.redirectTo({
      url: '../order1/order1',
    })
  },
  redirectTo2: function () {
    wx.redirectTo({
      url: '../order2/order2',
    })
  },
  redirectTo3: function () {
    wx.redirectTo({
      url: '../order3/order3',
    })
  },
  redirectTo4: function () {
    wx.redirectTo({
      url: '../order4/order4',
    })
  },
  redirectTo5: function () {
    wx.redirectTo({
      url: '../order5/order5',
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