// pages/customer/myquestion/myquestion.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    NavArr: ['全部咨询', '服务中', '已结束'],
    key: 0,
    allQuestion:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  getData(e) {
    console.log(e)
    this.setData({
      key: e.currentTarget.dataset.index
    })
  },
  lookDetail(e){
    console.log(e.currentTarget.dataset)
    let orderstatus = e.currentTarget.dataset.orderstatus
    let look = e.currentTarget.dataset.look
    if(orderstatus==1||(orderstatus==0&&look)){ // 跳转到解疑答惑页面
      wx.navigateTo({
        url: '/pages/customer/questionDetail/questionDetail',
      })
    }
  }
})