// pages/lawyer/myWenShu/myWenShu.js
const utils=require('../../../utils/util.js')
const Api=require('../../../config/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    NavArr: ['抢单报价', '服务中','申诉中','待确认','已结束'],
    key:0,
    allWenshu:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
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

  getData(){
    let that=this
    utils.request(Api.GetLawyerListData,{
      type:1,
      lawyer_id:wx.getStorageSync('user_id')
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
    this.setData({
      key: e.currentTarget.dataset.index
    })
  },
  lookDetail(e){
    console.log(e.currentTarget.dataset)
    let case_id = e.currentTarget.dataset.questionid
    let status = e.currentTarget.dataset.orderstatus
    wx.navigateTo({
      url: '/pages/lawyer/myOrderDetail/myOrderDetail?case_id=' + case_id +'&type=1&orderstatus='+status,
    })
  }
})