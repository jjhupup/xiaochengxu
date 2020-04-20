// pages/lawyer/tixian/tixian.js
const utils = require('../../../utils/util.js')
const Api = require('../../../config/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalBalance:0,
    txmoney:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取余额
    let that=this
    utils.request(Api.GetUserBalance,{
      user_id:wx.getStorageSync('user_id')
    },'POST').then(res=>{
      console.log(res)
      if(res.code=='S_Ok'){
        that.setData({
          totalBalance: res.data.totalBalance
        })
      }
    })
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
  TJmoney(e){
    console.log(e)
    this.setData({
      txmoney:e.detail.value*1
    })
  },
  tixian(){
    console.log(456)
    let that=this
    let txmoney=that.data.txmoney
    let totalBalance = that.data.totalBalance
    if(txmoney==0){
      wx.showToast({
        title: '提现金额要大于0',
        icon:'none'
      })
    }else if(!txmoney){
      wx.showToast({
        title: '请输入提现金额',
        icon: 'none'
      })
    } else if (txmoney > totalBalance){
      wx.showToast({
        title: '提现金额不能大于余额',
        icon: 'none'
      })
    }else{
      wx.showModal({
        title: '提现提示',
        content: '您要提现的金额为'+txmoney+'元',
        success(res){
          if(res.confirm){
            that.withDrawal()
          }
        }
      })
    }
  },
  withDrawal(){
    let that=this
    utils.request(Api.Withdrawal,{
      lawyer_id:wx.getStorageSync('user_id'),
      apply_fee:that.txmoney
    },'POST').then(res=>{
      console.log(res)
    })
  }
})