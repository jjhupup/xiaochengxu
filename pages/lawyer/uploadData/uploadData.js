// pages/lawyer/uploadData/uploadData.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: []
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
  addImg() {
    let that = this
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log(res)
        let imgurl = res.tempFilePaths
        let imgurl2 = that.data.imgurl
        imgurl2 = imgurl2.concat(imgurl)
        that.setData({
          imgurl: imgurl2
        })
        that.addSwiperH()
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
  }
})