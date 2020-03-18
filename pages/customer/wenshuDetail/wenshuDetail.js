// pages/customer/wenshuDetail/wenshuDetail.js
const util = require('../../../utils/util.js')
const Api = require('../../../config/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    wenshuData:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id
    })
    this.getDetail(options.id)
    console.log(123)
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
  getDetail(id){
    let that=this
    util.request(Api.GetOrderDetail,{
      order_id:id
    },"POST").then(res=>{
      console.log(res)
      if(res.code=='S_Ok'){
        that.setData({
          wenshuData:res.data
        })
      }else{
        wx.showModal({
          title: '提示',
          content: '数据请求出错！',
          success(){
            wx.navigateBack()
          }
        })
      }
    })
  },
  paymoney(e){
    console.log(e.currentTarget.dataset)
    let openid = e.currentTarget.dataset.lawyeropenid
    wx.navigateTo({
      url: '/pages/customer/paymoney/paymoney?openid=' + openid,
    })
  }
})