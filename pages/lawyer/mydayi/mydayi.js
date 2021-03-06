// pages/lawyer/mydayi/mydayi.js
const utils = require('../../../utils/util.js')
const Api = require('../../../config/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    NavArr: ['发出的回复', '收到的回复'],
    questionType: ['民事代理', '商事纠纷', '刑事辩护', '行政诉讼'],
    key: 0,
    lawyer_openid: 0,
    questionArr:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      user_id: wx.getStorageSync('user_id')
    })
    this.getQuestionData(this.data.user_id)
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
  getQuestionData(id) {
    let that=this
    utils.request(Api.GetLawyerQuestion, {
      user_id: id
    }, 'POST').then(res => {
      console.log(res)
      that.setData({
        questionArr:res.data
      })
    })
  },
  getData(e) {
    console.log(e)
    this.setData({
      key: e.currentTarget.dataset.index
    })
  },
  lookDetail(e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/lawyer/dayiDetail/dayiDetail?id=' + e.currentTarget.dataset.id,
    })
  }
})