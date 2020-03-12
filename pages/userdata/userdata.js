// pages/userdata/userdata.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: wx.getStorageSync('role'),
    Navarr: [
      ['个人信息'],
      ['个人信息', '律师认证']
    ],
    regionVal: ['广东省', '广州市', '天河区'],
    key: 0,
    userImg: '',
    zhenjianImg: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      status: wx.getStorageSync('role')
    })
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
  getRegion(e) {
    console.log(e)
    this.setData({
      regionVal: e.detail.value
    })
  },
  addImg(e) {
    console.log(e)
    let lx = e.currentTarget.dataset.lx
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log(res)
        if (lx == 0) {
          let imgurl = res.tempFilePaths
          let imgurl2 = that.data.userImg
          imgurl2 = imgurl2.concat(imgurl)
          that.setData({
            userImg: imgurl2
          })
        } else {
          let imgurl = res.tempFilePaths
          let imgurl2 = that.data.zhenjianImg
          imgurl2 = imgurl2.concat(imgurl)
          that.setData({
            zhenjianImg: imgurl2
          })
        }
      }
    })
  },
  // 删除图片
  deleteImg(e) {
    this.setData({
      userImg: ''
    })
  },
  deleteZJImg() {
    this.setData({
      zhenjianImg: ''
    })
  },
  saveUserData(e) {
    console.log(e,123)
  }
})