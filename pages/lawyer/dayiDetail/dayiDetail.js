// pages/lawyer/dayiDetail/dayiDetail.js
const utils=require('../../../utils/util.js')
const Api=require('../../../config/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    answer:'',
    questionData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let id=options.id
    let that=this
    utils.request(Api.GetDetailQuestion,{
      id
    },"POST").then(res=>{
      console.log(res)
      that.setData({
        questionData:res.data
      })
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  bindTextAreaBlur(e){
    console.log(e)
    this.setData({
      answer: e.detail.value
    })
  },
  subQuestion(){
    let that=this
    setTimeout(()=>{
      console.log(that.data.answer)
      utils.request(Api.Reply,{
        advice_id:that.data.questionData.id,
        pid:0,
        content:that.data.answer,
        from_openid:'110119',
        from_name:'辉记律师',
        to_openid: that.data.questionData.c_openid,
        to_name:'辉'
      },'POST').then(res=>{
        console.log(res)
      })
    },150)
  }
})