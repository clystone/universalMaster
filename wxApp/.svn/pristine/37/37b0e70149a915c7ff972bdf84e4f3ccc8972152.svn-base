var that
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count: [1,2,3],
    currentItem: '0',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    console.log('contact onload')
    wx.request({
      url: app.globalData.url + '/api/user/findAddr',
      method: 'GET',
      header: { TOKEN:app.globalData.token},
      data: {
        
      },
      success: res => {
        console.log(res.data)
      }
    })
  },
  changeSelected: function (e) {
    this.setData({
      currentItem: e.currentTarget.dataset.idx
    })    
  },
  delItem: function (e) {
    var index = e.currentTarget.dataset.idx;
    var count = that.data.count;
    count.splice(index, 1);
    that.setData({
      count: count,
      currentItem: e.currentTarget.dataset.idx
    })
  },
})