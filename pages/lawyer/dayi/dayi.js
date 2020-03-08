// pages/lawyer/dayi/dayi.js
const utils=require('../../../utils/util.js')
const Api=require('../../../config/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    NavArr:['抢单报价'],
    key:0,
    title:['答疑解惑','案件委托','文书委托','顾问委托'],
    questionType: ['民事代理', '商事纠纷', '刑事辩护', '行政诉讼'],
    Allquestion:[],
    btnTxt:'立即抢答',
    ordertype:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    wx.setNavigationBarTitle({
      title: this.data.title[options.title]
    })
    if(options.title!=0){
      this.setData({
        btnTxt:'立即报价抢单',
        ordertype:1
      })
    }
    // this.setData({
    //   title:
    // })
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
    let that=this
    // 获取答疑解惑列表或者其他列表
    utils.request(Api.GetAllQuestion).then(res=>{
      console.log(res)
      that.setData({
        Allquestion:res.data
      })
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  getData(e){
    console.log(e)
    this.setData({
      key:e.currentTarget.dataset.index
    })
  },
  lookDetail(e){
    console.log(e)
    let id = e.currentTarget.dataset.questionid
    if(this.data.ordertype==0){
      wx.navigateTo({
        url: '/pages/lawyer/dayiDetail/dayiDetail?id='+id
      })
    }else{
      console.log(222)
      wx.navigateTo({
        url: '/pages/lawyer/offerDetail/offerDetail?id='+id
      })
    }
  }
})