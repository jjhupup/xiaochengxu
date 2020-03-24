// pages/lawyer/AJweituo/AJweituo.js
const utils = require('../../../utils/util.js')
const Api = require('../../../config/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    NavArr: ['全部查询', '待处理', '服务中', '已结束'],
    key: 0,
    allChaxun: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
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
  getDatalist(e) {
    console.log(e)
    this.setData({
      key: e.currentTarget.dataset.index
    })
  },
  getData() {
    let that = this
    utils.request(Api.GetLawyerListData, {
      type: 4,
      lawyer_id: wx.getStorageSync('openid')
    }, 'POST').then(res => {
      console.log(res)
      if (res.code == 'S_Ok') {
        that.setData({
          allChaxun: res.data
        })
      }
    })
  },
})