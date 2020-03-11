// pages/my/my.js
const app = getApp()
const utils = require('../../utils/util.js')
const Api=require('../../config/api.js')
const config = require('../../config/config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    userName: '请点击头像登录',
    userImage: '/static/images/userImage.jpg',
    datalist:[
      {
        img_url: '/static/images/xinxi.png',
        text: '信息中心'
      },
      {
        img_url:'/static/images/zixun.png',
        page_url:'/pages/customer/myquestion/myquestion',
        text:'我的咨询'
      },
      {
        img_url: '/static/images/wenshuDA.png',
        page_url:'/pages/customer/mywenshu/mywenshu',
        text: '我的文书'
      },
      {
        img_url: '/static/images/ajweituo.png',
        page_url: '',
        text: '我的案件'
      },
      {
        img_url: '/static/images/guwenWT.png',
        text: '我的顾问'
      },
      {
        img_url: '/static/images/xiugai22.png',
        page_url:'/pages/userdata/userdata',
        text: '修改个人信息'
      }
    ],
    lawyerlist:[
      {
        img_url: '/static/images/xinxi.png',
        page_url:'/pages/news/news',
        text: '信息中心'
      },
      {
        img_url:'/static/images/jieyi.png',
        page_url:'/pages/lawyer/mydayi/mydayi?openid=110119',
        text:'解疑答惑'
      },
      {
        img_url: '/static/images/wenshuDA.png',
        page_url: '/pages/lawyer/myWenShu/myWenShu?openid=110119',
        text: '文书委托'
      },
      {
        img_url: '/static/images/ajweituo.png',
        page_url: '/pages/lawyer/AJweituo/AJweituo?openid=110119',
        text: '案件委托'
      },
      {
        img_url: '/static/images/guwenWT.png',
        page_url:'/pages/lawyer/lawyerOrder/lawyerOrder',
        text: '顾问委托'
      },
      {
        img_url: '/static/images/xiugai22.png',
        page_url: '/pages/userdata/userdata',
        text: '修改个人信息'
      }
    ],
    yijian:[
      {
        img_url: '/static/images/icon_feed_back.png',
        page_url: '',
        text: '意见反馈'
      },
      {
        img_url: '/static/images/settings.png',
        page_url: '',
        text: '设置'
      },
      {
        img_url: '/static/images/qrcode.png',
        page_url: '',
        text: '小程序二维码'
      }
    ],
    showStatusDialog:false,
    status:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that=this
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
    let that=this
    let userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      that.setData({
        userName: JSON.parse(userInfo).nickName,
        userImage: JSON.parse(userInfo).avatarUrl
      })
    }

    let status = wx.getStorageSync('status')
    console.log(status)
    if (!status) {
      console.log('还没身份')
      that.setData({
        showStatusDialog: true
      })
    } else {
      that.setData({
        status: status * 1
      })
      if (status * 1 == 1) {
        that.setData({
          isShow: false,
          showStatusDialog:false
        })
      }
    }
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
  // 微信登录，同时记录用户信息
  onWechatLogin(e) {
    let that=this
    console.log(111, e)
    if (e.detail.errMsg !== 'getUserInfo:ok') {
      if (e.detail.errMsg === 'getUserInfo:fail auth deny') {
        return false
      }
      wx.showToast({
        title: '微信登录失败',
      })
      return false
    } else {
      // 设置用户信息,并发送用户信息和用户身份信息到后台，
      that.setData({
        userInfo: e.detail.userInfo,
        userImage: e.detail.userInfo.avatarUrl,
        userName: e.detail.userInfo.nickName,
        showLoginDialog: false
      });
      wx.navigateTo({
        url: that.data.gotoUrl
      })
      console.log(wx.getStorageSync('status'))
      wx.setStorageSync('userInfo', JSON.stringify(e.detail.userInfo));
      utils.login()
      .then(res=>{
        utils.request(Api.GetOpenId,{
          js_code:res,
          userInfo:that.data.userInfo
        },'GET').then(res=>{
          console.log(res)
        })
      })
    }
  },
  // 获取用户信息
  getUserInfo: function(e) {
    console.log(e)
    this.setData({
      userName: e.detail.userInfo.nickName,
      userImage: e.detail.userInfo.avatarUrl
    })
  },
  getPhoneNumber:function(e){
    console.log(e)
  },
  // 登录按钮关闭和身份框关闭
  onCloseDialog() {
    this.setData({
      showStatusDialog: false
    })
  },
  optStatus(e) {
    let status = e.currentTarget.dataset.status
    let statusName = ''
    let that = this
    console.log(status)
    if (status * 1 == 0) {
      statusName = '客户'
    } else {
      statusName = '律师'
    }
    wx.showModal({
      title: '提示！',
      content: '确认身份后不能随意修改，请认真选择，当前选择是' + statusName,
      showCancel: true,
      success: function (res) {
        console.log(res)
        if (res.confirm) {
          console.log('确认了身份选择', status, statusName)
          wx.setStorage({
            key: 'status',
            data: status,
          })
          that.onCloseDialog()
          if (status * 1 == 0) {
            that.setData({
              isShow: true,
              status:0
            })
            return
          }
          that.setData({
            isShow: false,
            status: 1
          })
        }
      }
    })
  },
  // 我的功能页面跳转
  gopage(e){
    console.log(e)
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    })
  }
})