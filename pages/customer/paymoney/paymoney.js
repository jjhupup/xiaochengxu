// pages/customer/paymoney/paymoney.js
const util = require('../../../utils/util.js')
const Api = require('../../../config/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    payshow:false,
    lawyerid:0,
    price:0,
    case_id:0,
    lawyerdata:{}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      lawyerid:options.openid,
      price:options.price,
      case_id: options.case_id
    })
    this.getuserdata(options.openid)
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
    let that=this
    util.request(Api.GetPayParams,{
      body: '支付给' + that.data.lawyerdata.nick_name+'的律师费用',
      total_fee:100,
      openid:wx.getStorageSync('openid'),
      select_lawyer_id:that.data.lawyerdata.uid,
      case_id: that.data.case_id
    },"POST").then(res=>{
      console.log('res',res)
    })
  },
  getuserdata(uid){
    let that=this
    util.request(Api.GetUserData,{
      user_id:uid
    },'POST').then(res=>{
      console.log(res)
      that.setData({
        lawyerdata:res.data
      })
    })
  }
})