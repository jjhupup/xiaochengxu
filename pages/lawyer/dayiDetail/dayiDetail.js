// pages/lawyer/dayiDetail/dayiDetail.js
const utils = require('../../../utils/util.js')
const Api = require('../../../config/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    answer: '',
    questionType: ['民事代理', '商事纠纷', '刑事辩护', '行政诉讼'],
    advice_id: '',
    pid: 0,
    questionData: [],
    isShowComment: false,
    canreply: true,
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    let advice_id = options.id
    let that = this
    that.setData({
      advice_id: advice_id,
      userInfo: wx.getStorageSync('userInfo')
    })
    that.getComment(advice_id)
  },

  getComment(advice_id) {
    let that = this
    utils.request(Api.GetDetailQuestion, {
      advice_id
    }, "POST").then(res => {
      console.log(res)
      res.data.create_time = utils.switchTimeFormat(res.data.create_time)
      res.data.replies = that.treeData(res.data.replies)
      // res.data.replies = res.data.replies.reverse()
      that.setData({
        questionData: res.data,
        advicer: res.data.advicer
      })
      console.log(res.data)
    }).catch(rej => {
      console.log(rej)
    })
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
  bindTextAreaBlur(e) {
    console.log(e)
    this.setData({
      answer: e.detail.value
    })
  },
  subQuestion() {
    let that = this
    setTimeout(() => {
      console.log(that.data.answer)
      let str = that.data.answer
      str = str.replace(/\s*/g, "");
      if (str == '') {
        wx.showToast({
          title: '请输入回复内容~',
          icon: 'none'
        })
      } else {
        if (that.data.canreply) {
          that.setData({
            canreply: false
          })
          utils.request(Api.Reply, {
            advice_id: that.data.questionData.id,
            pid: that.data.pid,
            content: that.data.answer,
            from_openid: wx.getStorageSync('openid'), //当前评论人的openid
            from_name: that.data.userInfo.nickName, //当前评论人的name
            to_openid: that.data.advicer.openid, //发布咨询者的openid
            to_name: that.data.advicer.nick_name //发布咨询者的name
          }, 'POST').then(res => {
            console.log(res)
            setTimeout(() => {
              that.setData({
                canreply: true
              })
            }, 300)
            if (res.code = "S_Ok") {
              if (res.error) {
                wx.showToast({
                  title: '暂不支持回复表情!',
                  icon: 'none'
                })
              } else {
                that.setData({
                  isShowComment: false
                })
                wx.showToast({
                  title: '回复成功！',
                })
                that.getComment(that.data.advice_id)
              }
            }
          }).catch(rej => {
            console.log(rej)
            setTimeout(() => {
              that.setData({
                canreply: true
              })
            }, 300)
          })
        }
      }

    }, 150)
  },
  // 评论功能打开
  openComment(e) {
    console.log(e.currentTarget.dataset.pid)
    this.setData({
      pid: e.currentTarget.dataset.pid
    })
    this.setData({
      isShowComment: true
    })
  },
  // 评论功能关闭
  closeComment(e) {
    this.setData({
      isShowComment: false
    })
  },
  // 阻止冒泡
  onDialogBody() {},
  // 评论树状结构
  treeData(data) {
    let cloneData = JSON.parse(JSON.stringify(data))
    return cloneData.filter(father => {
      let branchArr = cloneData.filter(child => father.id === child.pid)
      branchArr.length > 0 ? father.children = branchArr : ''
      return father.pid === 0 || father.pid === null;
    })
  }
})