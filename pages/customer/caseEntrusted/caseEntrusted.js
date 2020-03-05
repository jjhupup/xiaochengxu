// pages/caseEntrusted/caseEntrusted.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    anJianArray1: ['请选择...','民事代理', '商事纠纷', '刑事辩护', '行政诉讼'],
    status:['请选择...','原告(申请人)','被告(被申请人)','上诉人','被上诉人','第三人'],
    index1:0,
    leixin1:0,
    leixin2:0,
    anJianArray2:[],
    stage: ['请选择...','一审','二审','再审','执行','仲裁','复议'],
    regionVal: ['广东省', '广州市', '天河区']
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
  getRegion(e){
    console.log(e)
    this.setData({
      regionVal: e.detail.value
    })
  }
})