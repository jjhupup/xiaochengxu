// pages/customer/mywenshu/mywenshu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    NavArr: ['全部文书', '待处理', '服务中', '已结束'],
    key: 0,
    allWenshu: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  getData(e) {
    console.log(e)
    this.setData({
      key: e.currentTarget.dataset.index
    })
  },
  lookDetail(e) {

    let statusOeder = e.currentTarget.dataset.orderstatus
    console.log(e,statusOeder)
    if (statusOeder == 1) { // 订单待处理状态，进入选择律师页面
    console.log('页面跳转1')
      wx.navigateTo({
        url: '/pages/customer/wenshuDetail/wenshuDetail',
      })
    }else if(statusOeder==2){ //服务中状态，进入为自己服务的律师对话页面

    }else{

    }
    // this.setData({
    //   key:
    // })
  }
})