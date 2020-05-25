// pages/lawyer/tixian/tixian.js
const utils = require('../../../utils/util.js')
const Api = require('../../../config/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalBalance: 0,
    txmoney: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getData()
  },

  getData() {
    // 获取余额
    let that = this
    utils.request(Api.GetUserBalance, {
      user_id: wx.getStorageSync('user_id')
    }, 'POST').then(res => {
      console.log(res)
      if (res.code == 'S_Ok') {
        that.setData({
          totalBalance: res.data.totalBalance
        })
      }
    })
  },
  isNumber(val) {
    var regPos = /^\d+(\.\d+)?$/; //非负浮点数
    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
    if (regPos.test(val) || regNeg.test(val)) {
      return true;
    } else {
      return false;
    }

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },
  TJmoney(e) {
    console.log(e)
    this.setData({
      txmoney: e.detail.value 
    })
  },
  tixian() {
    console.log(456)
    let that = this
    let txmoney = that.data.txmoney
    let totalBalance = that.data.totalBalance
    if (!that.isNumber(txmoney)){
      wx.showToast({
        title: '请输入数字金额',
        icon: 'none'
      })
      return
    }
    if (txmoney < 0.01) {
      wx.showToast({
        title: '提现金额要大于100元',
        icon: 'none'
      })
    } else if (!txmoney) {
      wx.showToast({
        title: '请输入提现金额',
        icon: 'none'
      })
    } else if (txmoney * 100 > totalBalance) {
      wx.showToast({
        title: '提现金额不能大于余额',
        icon: 'none'
      })
    } else {
      wx.showModal({
        title: '提现提示',
        content: '您要提现的金额为' + txmoney + '元',
        success(res) {
          if (res.confirm) {
            that.withDrawal()
          }
        }
      })
    }
  },
  withDrawal() {
    let that = this
    utils.request(Api.Withdrawal, {
      lawyer_id: wx.getStorageSync('user_id'),
      apply_fee: that.data.txmoney * 100
    }, 'POST').then(res => {
      console.log(res)
      if (res.code == 'S_Ok') {
        wx.showToast({
          title: '提现成功',
        })
        that.getData()
      }
    })
  }
})