// pages/lawyer/AJquote/AJquote.js
const utils = require('../../../utils/util.js')
const Api = require('../../../config/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    AJDetail: {},
    bjmoney:0,
    order_id:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getDetail(options.id)
    this.setData({
      order_id: options.id
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },
  getDetail(id) {
    let that = this
    utils.request(Api.GetOrderDetail, {
      order_id: id
    }, 'POST').then(res => {
      console.log(res)
      if (res.code == 'S_Ok') {
        that.setData({
          AJDetail: res.data
        })
      }
    })
  },
  getMoney(e){
    console.log(e.detail.value)
    this.setData({
      bjmoney:e.detail.value*1
    })
  },
  BaoJiaFun() {
    let that = this
    let can = true
    if (that.data.bjmoney == 0) {
      wx.showToast({
        title: '请填写报价金额！',
        icon: 'none'
      })
      return
    }
    // 判断律师是否已经报过价了
    let bidders = this.data.AJDetail.bidders
    console.log(123, bidders)
    bidders.map(val => {
      if (val.lawyer.id == wx.getStorageSync('user_id')) {
        can = false
        wx.showModal({
          title: '提示！',
          content: '您已经对该订单报过价~',
          success() {
            wx.navigateBack()
          }
        })
      }
    })
    if (can) {
      wx.showModal({
        title: '提示',
        content: '您对该订单的报价为' + that.data.bjmoney + '元',
        success(res) {
          if (res.confirm) {
            that.pushMoneyOrder()
          }
        }
      })
    }
  },
  pushMoneyOrder(){
    let that=this
    utils.request(Api.Baojia,{
      order_id:that.data.order_id,
      lawyer_id: wx.getStorageSync('user_id'),
      price:that.data.bjmoney
    },'POST').then(res=>{
      console.log(res)
      if (res.code =='S_Ok'){
        wx.showToast({
          title: '提交成功，即将返回首页~',
          icon:'none'
        })
        setTimeout(()=>{
           wx.switchTab({
             url: '/pages/index/index',
           })
        },1000)
      }else{
        wx.showToast({
          title: '服务器出错，请联系管理员！',
          icon:'none'
        })
      }
    })
  }
})