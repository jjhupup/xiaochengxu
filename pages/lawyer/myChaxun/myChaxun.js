// pages/lawyer/AJweituo/AJweituo.js
const utils = require('../../../utils/util.js')
const Api = require('../../../config/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    NavArr: ['抢单报价', '服务中', '申诉中', '待确认','已结束','已取消'],
    key: 0,
    allChaxun: []
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
    
    if(this.data.key==0){
      this.getBJData()
    }else{
      this.getData()
    }
  },
  getDatalist(e) {
    console.log(e)
    if(e.currentTarget.dataset.index==0){
      this.getBJData()
    }else{
      this.getData()
    }
    this.setData({
      key: e.currentTarget.dataset.index
    })
    
  },
  getData() {
    let that = this
    utils.request(Api.GetLawyerListData, {
      type: 4,
      lawyer_id: wx.getStorageSync('user_id')
    }, 'POST').then(res => {
      console.log(res)
      if (res.code == 'S_Ok') {
        that.setData({
          allChaxun: res.data
        })
      }
    })
  },
  getBJData() {
    let that = this
    utils.request(Api.GetBidList, {
      type: 4,
      lawyer_id: wx.getStorageSync('user_id')
    }, 'POST').then(res => {
      console.log(res)
      if (res.code == 'S_Ok') {
        that.setData({
          allChaxun: res.data
        })
      }
    })
  },
  lookDetail(e) {
    console.log(e.currentTarget.dataset)
    let case_id = e.currentTarget.dataset.questionid
    let orderstatus = e.currentTarget.dataset.orderstatus
    wx.navigateTo({
        url: '/pages/lawyer/myOrderDetail/myOrderDetail?case_id=' + case_id + '&type=4&orderstatus=' + orderstatus,
    })
  }
})