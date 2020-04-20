// pages/lawyer/myOrderDetail/myOrderDetail.js
const util = require('../../../utils/util.js')
const Api = require('../../../config/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allData: {},
    mybidder: {},
    type: 0,
    isShowComment: false,
    shensuTxt: '',
    status: 0,
    case_id: 0
  },

  /**
   * 生命周期函数--监听页面加载case_id=6&type=1&orderstatus=0
   */
  onLoad: function(options) {
    this.getCaseData(options.case_id)
    this.setData({
      type: options.type,
      status: options.orderstatus,
      case_id: options.case_id
    })
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

  getCaseData(id) {
    let that = this
    util.request(Api.GetOrderDetail, {
      case_id: id
    }, 'post').then(res => {
      if (res.code == 'S_Ok') {
        let bidder = res.data.bidders.filter(val => {
          if (val.lawyer.id == wx.getStorageSync('user_id')) {
            return val
          }
        })
        console.log(bidder)
        that.setData({
          allData: res.data,
          mybidder: bidder
        })
      }
    })
  },
  goUpload() {
    wx.navigateTo({
      url: '/pages/lawyer/uploadData/uploadData',
    })
  },
  shensu() {
    this.setData({
      isShowComment: true
    })
  },
  closeComment() {
    this.setData({
      isShowComment: false,
      shensuTxt: ''
    })
  },
  // 阻止冒泡
  onDialogBody() {},
  bindTextAreaBlur(e) {
    console.log(e)
    this.setData({
      shensuTxt: e.detail.value
    })
  },
  subQuestion() {
    let that = this
    let shensuTxt = that.data.shensuTxt
    shensuTxt = shensuTxt.replace(/\s*/g, "");
    console.log(shensuTxt)
    if (shensuTxt == '') {
      wx.showToast({
        title: '请输入申诉理由!',
        icon: 'none'
      })
    } else if (shensuTxt.length < 8) {
      wx.showToast({
        title: '申诉字数不能少于8个!',
        icon: 'none'
      })
    } else {
      that.faShensu(shensuTxt)
    }
  },
  // 发起申诉
  faShensu(txt) {
    console.log(txt)
    let that = this
    util.request(Api.ApplyRefund, {
      case_id: that.data.case_id,
      appealer_id: wx.getStorageSync('user_id'),
      reason: txt
    }, 'POST').then(res => {
      console.log(res)
    })
  }
})