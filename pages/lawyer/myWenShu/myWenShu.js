// pages/lawyer/myWenShu/myWenShu.js
const utils=require('../../../utils/util.js')
const Api=require('../../../config/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    NavArr: ['抢单报价', '服务中','申诉中','待确认','','已结束'],
    key:0,
    allWenshu:[],
    scrollL:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBJData()
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

  getBJData(){
    let that=this
    utils.request(Api.GetBidList,{
      lawyer_id:wx.getStorageSync('user_id'),
      type:1
    },'POST').then(res=>{
      console.log(res)
      if(res.code=='S_Ok'){
        that.setData({
          allWenshu:res.data
        })
      }
    })
  },
  getorder(){
    let that=this
    utils.request(Api.GetLawyerListData,{
      lawyer_id:wx.getStorageSync('user_id'),
      type:1
    },'POST').then(res=>{
      console.log(res)
      if(res.code=='S_Ok'){
        that.setData({
          allWenshu:res.data
        })
      }
    })
  },
  getDatalist(e) {
    console.log(e)
    
    if(e.currentTarget.dataset.index==0){
      this.getBJData()
    }else{
      this.getorder()
    }
    if (e.currentTarget.dataset.index==4){
      this.setData({
        key: 5
      })
      return
    }
    this.setData({
      key: e.currentTarget.dataset.index
    })
  },
  lookDetail(e){
    console.log(e.currentTarget.dataset)
    let case_id = e.currentTarget.dataset.questionid
    let status = e.currentTarget.dataset.orderstatus
    // this.data.allWenshu
    wx.navigateTo({
      url: '/pages/lawyer/myOrderDetail/myOrderDetail?case_id=' + case_id +'&type=1&orderstatus='+status,
    })
  }
})