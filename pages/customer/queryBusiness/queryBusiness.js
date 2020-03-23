// pages/queryBusiness/queryBusiness.js  OrderPublish
const util = require('../../../utils/util.js')
const Api = require('../../../config/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stage: ['房产信息', '工商内档/外档', '结婚证', '身份证信息/户籍登记信息', '车辆登记信息'],
    index1: 0,
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
  getData(e) {
    console.log(e)
    let that=this
    let obj = e.detail.value
    wx.showModal({
      title: '提示~',
      content: '确定提交咨询的信息为' + obj.findtype,
      success() {
        that.tijiaoData(obj)
      }
    })
  },
  tijiaoData(obj) {
    util.request(Api.OrderPublish,{
      customer_id:wx.getStorageSync('openid'),
      case_type:4,
      extra_info:JSON.stringify(obj)
    },'POST').then(res=>{
      console.log(res)
      if(res.code=='S_Ok'){
        wx.showToast({
          title: '提交成功',
        })
        setTimeout(()=>{
          wx.navigateBack()
        },1000)
      }else{
        wx.showToast({
          title: '提交失败~',
          icon:'none'
        })
      }
    })
  },
  bindPickerChange(e) {
    this.setData({
      index1: e.detail.value
    })
  }
})