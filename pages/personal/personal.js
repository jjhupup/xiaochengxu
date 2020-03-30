// pages/personal/personal.js
const util = require('../../utils/util.js')
const Api = require('../../config/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid: '',
    lawyerData:{},
    payshow: false,
    price:0,
    caseid:0,
    location:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      userid: options.userid,
      price:options.price,
      caseid: options.case_id
    })
    this.getUserinfo()
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

 getUserinfo(){
   let that=this
   util.request(Api.GetUserData,{
     user_id: that.data.userid
   },'post').then(res=>{
     console.log(res)
     if(res.code=='S_Ok'){
       let location = res.data.extra_profile.location[0] + '-' + res.data.extra_profile.location[1]
       console.log(location)
       that.setData({
         location:location,
         lawyerData:res.data
       })
     }
   })
 },
  onDialogBody() {
    // 阻止冒泡
  },
  tanchuPay() {
    this.setData({
      payshow: true
    })
  },
  closeShow() {
    this.setData({
      payshow: false
    })
  },
  paymoney() {
    console.log('支付')
    let that = this
    util.request(Api.GetPayParams, {
      body: '支付给' + that.data.lawyerData.nick_name + '的律师费用',
      total_fee: 100,
      openid: wx.getStorageSync('openid'),
      select_lawyer_id: that.data.lawyerData.id,
      case_id: that.data.case_id
    }, "POST").then(res => {
      console.log('res', res)
    })
  }
})