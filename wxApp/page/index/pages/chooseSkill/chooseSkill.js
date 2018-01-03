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
    var that = this;
    //获取服务类型
    wx.request({
      url: app.globalData.url + '/api/skill/findAll/1001',
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          gooditems1: res.data.parms.skill
        })
        console.log(that.data.gooditems1)
      },
      fail: function (err) {
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
    app.globalData.currentSkill = this.data.itemNameSelect;
    wx.redirectTo({
      url: '../newDemand/newDemand?currentSkill=' + this.data.itemNameSelect,
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