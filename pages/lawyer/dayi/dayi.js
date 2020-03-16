// pages/lawyer/dayi/dayi.js
const utils = require('../../../utils/util.js')
const Api = require('../../../config/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    NavArr: ['抢单报价'],
    key: 0,
    title: ['答疑解惑', '文书委托', '案件委托', '顾问委托'],
    questionType: ['民事代理', '商事纠纷', '刑事辩护', '行政诉讼'],
    Allquestion: [],
    AllOrder:[],
    btnTxt: '立即抢答',
    ordertype: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    wx.setNavigationBarTitle({
      title: this.data.title[options.title]
    })
    if (options.title != 0) {
      this.setData({
        btnTxt: '立即报价抢单',
        ordertype: options.title
      })
    }
    // this.setData({
    //   title:
    // })
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
    let that = this
    if (that.data.ordertype == 0) {
      that.getZixunData()
    }else{
      that.getOrderData()
    }
  },
  // 获取案件文书顾问数据
  getOrderData(){
    let that=this
    utils.request(Api.GetOrderList,{
      type: that.data.ordertype
    },'POST').then(res=>{
      console.log(res)
      that.setData({
        AllOrder:res.data
      })
    })
  },
  // 咨询页面数据获取
  getZixunData() {
    let that=this
    // 获取答疑解惑列表或者其他列表
    utils.request(Api.GetAllQuestion).then(res => {
      console.log(res)
      that.setData({
        Allquestion: res.data
      })
    }).catch(rej => {
      console.log(rej)
      wx.showModal({
        title: '提示',
        content: '服务器出错，请稍后再试',
        success(comfin) {
          wx.switchTab({
            url: '/pages/index/index',
          })
        }
      })
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  getData(e) {
    console.log(e)
    this.setData({
      key: e.currentTarget.dataset.index
    })
  },
  lookDetail(e) {
    console.log(e)
    let id = e.currentTarget.dataset.questionid
    if (this.data.ordertype == 0) {
      wx.navigateTo({
        url: '/pages/lawyer/dayiDetail/dayiDetail?id=' + id
      })
    } else {
      console.log(222)
      wx.navigateTo({
        url: '/pages/lawyer/offerDetail/offerDetail?id=' + id
      })
    }
  },
  // 去往律师报价页面
  goQuote(e){
    console.log(e)
    wx.navigateTo({
      url: '/pages/lawyer/AJquote/AJquote?id='+e.currentTarget.dataset.id,
    })
  }
})