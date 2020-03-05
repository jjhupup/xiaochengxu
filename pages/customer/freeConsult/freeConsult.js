// pages/freeConsult/freeConsult.js
const utils = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['民事代理', '商事纠纷', '刑事辩护', '行政诉讼'],
    index: 0,
    questionContext: ''
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
  // 提交数据
  subQuestion() {
    let that = this
    let index = this.data.index
    console.log(that.data.array[index])
    wx.showModal({
      title: '提示',
      content: '是否提交问题？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          let contentStr = that.data.questionContext
          contentStr = contentStr.replace(/\s*/g, "");
          console.log(contentStr, contentStr.length)
          if (that.data.questionContext == '') {
            wx.showToast({
              title: '请输入您的问题',
              icon: 'none',
              duration: 1200
            })
          } else if (contentStr.length<20){
            wx.showToast({
              title: '输入内容少于20字 ',
              icon: 'none',
              duration: 1200
            })
          }else {
            console.log('提交数据', contentStr)
          }

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  }
})