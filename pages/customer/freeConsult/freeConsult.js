// pages/freeConsult/freeConsult.js
const utils = require('../../../utils/util.js')
const Api=require('../../../config/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['民事代理', '商事纠纷', '刑事辩护', '行政诉讼'],
    index: 0,
    questionTitle:'',
    questionContext: ' ',
    openid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
      this.setData({
        openid:wx.getStorageSync('openid')
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  // 问题类型选择触发事件
  bindPickerChange(e) {
    console.log(e.detail)
    this.setData({
      index: e.detail.value
    })
  },
  // 输入框失去焦点获取内容
  bindTextAreaBlur(e) {
    console.log(e.detail.delta.ops[0].insert)
    this.setData({
      questionContext: e.detail.delta.ops[0].insert
    })
  },
  GetTextTitle(e){
    console.log(e.detail.value)
    this.setData({
      questionTitle: e.detail.value
    })
  },
  // 提交数据
  subQuestion() {
    let that = this
    let index = this.data.index
    console.log(that.data.array[index],utils)
    wx.showModal({
      title: '提示',
      content: '是否提交问题？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          let contentStr = that.data.questionContext
          let titletxt=that.data.questionTitle
          contentStr = contentStr.replace(/\s*/g, "");
          titletxt = titletxt.replace(/\s*/g, "");
          console.log(contentStr, contentStr.length)
          if (that.data.questionContext == '') {
            wx.showToast({
              title: '请输入您的问题',
              icon: 'none',
              duration: 1200
            })
          } else if (contentStr.length<10){
            wx.showToast({
              title: '输入内容少于10字 ',
              icon: 'none',
              duration: 1200
            })
          } else if (titletxt.length==0){
            wx.showToast({
              title: '请填写内容标题~',
              icon: 'none',
              duration: 1200
            })
          }else {
            console.log('提交数据', contentStr, Api)
            utils.request(Api.Publish,{
              advicer_openid:that.data.openid,
              topic:that.data.index*1,
              title: titletxt,
              content:contentStr
            },"POST").then(res=>{
              console.log(res)
              if (res.code =='S_Ok'){
                wx.showToast({
                  title: '询问提交成功',
                })
                setTimeout(()=>{
                  wx.navigateBack()
                },800)
              }else{
                wx.showToast({
                  title: res.error.msg,
                  icon:'none'
                })
              }
            })
          }

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  }
})