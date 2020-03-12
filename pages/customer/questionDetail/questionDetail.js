// pages/customer/questionDetail/questionDetail.js
const utils = require('../../../utils/util.js')
const Api = require('../../../config/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionData: {},
    isShowComment: false,
    pid: 0,
    answer: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      advice_id:options.id
    })
    this.getData(options.id)
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
  getData(id) {
    let that = this
    utils.request(Api.GetDetailQuestion, {
      advice_id: id
    }, "POST").then(res => {
      console.log(res)
      if (res.code == 'S_Ok') {
        res.data.replies = that.treeData(res.data.replies)
        that.setData({
          questionData: res.data
        })
      } else {
        wx.showModal({
          title: '提示',
          content: '服务器出错，请稍后再试~',
          success() {
            wx.switchTab({
              url: '/pages/my/my',
            })
          }
        })
      }
    })
  },
  treeData(data) {
    let cloneData = JSON.parse(JSON.stringify(data))
    return cloneData.filter(father => {
      let branchArr = cloneData.filter(child => father.id === child.pid)
      branchArr.length > 0 ? father.children = branchArr : ''
      return father.pid === 0 || father.pid === null;
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
            that.getData(that.data.advice_id)
          }
        })
      }

    }, 150)
  },
  bindTextAreaBlur(e) {
    console.log(e)
    this.setData({
      answer: e.detail.value
    })
  }
})