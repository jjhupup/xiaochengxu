// pages/lawyer/AJweituo/AJweituo.js
const utils = require('../../../utils/util.js')
const Api = require('../../../config/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    NavArr: ['抢单报价', '服务中', '申诉中', '待确认','', '已结束'],
    key:0,
    allAjweituo:[],
    scrollL:0
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
    this.getBJData()
  },
  getDatalist(e) {
    console.log(e)
    
    if(e.currentTarget.dataset.index==0){
      this.getBJData()
    }else{
      this.getData()
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
    let key = e.currentTarget.dataset.index
    if (key == 3) {
      this.setData({
        scrollL: 100
      })
    }
  },
  getBJData(){
    let that=this
    utils.request(Api.GetBidList,{
      lawyer_id:wx.getStorageSync('user_id'),
      type:2
    },'POST').then(res=>{
      console.log(res)
      if(res.code=='S_Ok'){
        that.setData({
          allAjweituo:res.data
        })
      }
    })
  },
  getData() {
    let that = this
    utils.request(Api.GetLawyerListData, {
      type: 2,
      lawyer_id: wx.getStorageSync('user_id')
    }, 'POST').then(res => {
      console.log(res)
      if (res.code == 'S_Ok') {
        that.setData({
          allAjweituo: res.data
        })
      }
    })
  },
  lookDetail(e) {
    console.log(e.currentTarget.dataset)
    let case_id = e.currentTarget.dataset.questionid
    let status = e.currentTarget.dataset.orderstatus
    wx.navigateTo({
      url: '/pages/lawyer/myOrderDetail/myOrderDetail?case_id=' + case_id + '&type=2&orderstatus=' + status,
    })
  }
})