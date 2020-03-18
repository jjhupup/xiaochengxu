// pages/customer/paymoney/paymoney.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    payshow:false
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
  onDialogBody(){
     // 阻止冒泡
  },
  tanchuPay(){
    this.setData({
      payshow:true
    })
  },
  closeShow(){
    this.setData({
      payshow:false
    })
  },
  paymoney(){
    console.log('支付')
  }
})