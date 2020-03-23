// pages/lawyer/myWenShu/myWenShu.js
const utils=require('../../../utils/util.js')
const Api=require('../../../config/api.js')
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

  getData(){
    utils.request(Api.GetLawyerListData,{
      type:2,
      lawyer_id:wx.getStorageSync('openid')
    },'POST').then(res=>{
      console.log(res)
    })
  }
})