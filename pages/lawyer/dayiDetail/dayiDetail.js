// pages/lawyer/dayiDetail/dayiDetail.js
const utils = require('../../../utils/util.js')
const Api = require('../../../config/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    answer: '',
    id: '',
    pid: 0,
    questionData: [],
    isShowComment: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    let id = options.id
    let that = this
    that.setData({
      id: id
    })
   getComment(id)
  },

  getComment(id) {
    let that = this
    utils.request(Api.GetDetailQuestion, {
      id
    }, "POST").then(res => {
      console.log(res)
      res.data.create_time = utils.switchTimeFormat(res.data.create_time)
      res.data.replies=that.treeData(res.data.replies)
      // res.data.replies = res.data.replies.reverse()
      that.setData({
        questionData: res.data
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
        utils.request(Api.Reply, {
          advice_id: that.data.questionData.id,
          pid: that.data.pid,
          content: that.data.answer,
          from_openid: '110119',
          from_name: '辉少',
          to_openid: '13268720081',
          to_name: 'c'
        }, 'POST').then(res => {
          console.log(res)
          if (res.code = "S_Ok") {
            that.setData({
              isShowComment: false
            })
            wx.showToast({
              title: '回复成功！',
            })
            that.getComment(that.data.id)
          }
        })
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
  treeData(data){
      let cloneData = JSON.parse(JSON.stringify(data))
      return cloneData.filter(father => {
        let branchArr = cloneData.filter(child => father.id === child.pid)
        branchArr.length > 0 ? father.children = branchArr : ''
        return father.pid === 0 || father.pid === null;
      })
  }
})