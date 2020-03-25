// pages/lawyer/myOrderDetail/myOrderDetail.js
const util = require('../../../utils/util.js')
const Api = require('../../../config/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allData:{},
    mybidder:{},
    type:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCaseData(options.case_id)
    this.setData({
      type:options.type
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

  getCaseData(id){
    let that=this
    util.request(Api.GetOrderDetail,{
      case_id:id
    },'post').then(res=>{
      if(res.code=='S_Ok'){
       let bidder= res.data.bidders.filter(val=>{
          if (val.lawyer.uid==wx.getStorageSync('openid')){
            return val
          }
        })
        console.log(bidder)
        that.setData({
          allData:res.data,
          mybidder:bidder
        })
      }
    })
  }
})