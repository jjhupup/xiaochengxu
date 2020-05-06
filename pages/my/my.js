// pages/my/my.js
const app = getApp()
const utils = require('../../utils/util.js')
const Api = require('../../config/api.js')
const config = require('../../config/config.js')
Page({

  /**
   * 页面的初始数据
   * {
        img_url: '/static/images/xinxi.png',
        page_url: '/pages/news/news',
        text: '信息中心'
      },
   */
  data: {
    userInfo: {},
    userName: '请点击头像登录',
    userImage: '/static/images/userImage.jpg',
    datalist: [
      {
        img_url: '/static/images/zixun.png',
        page_url: '/pages/customer/myquestion/myquestion',
        text: '我的咨询'
      },
      {
        img_url: '/static/images/wenshuDA.png',
        page_url: '/pages/customer/mywenshu/mywenshu?type=1&name=我的文书',
        text: '我的文书'
      },
      {
        img_url: '/static/images/ajweituo.png',
        page_url: '/pages/customer/mywenshu/mywenshu?type=2&name=我的案件',
        text: '我的案件'
      },
      {
        img_url: '/static/images/guwenWT.png',
        page_url: '/pages/customer/mywenshu/mywenshu?type=3&name=我的顾问',
        text: '我的顾问'
      },
      {
        img_url: '/static/images/finds.png',
        page_url: '/pages/customer/mywenshu/mywenshu?type=4&name=我的查询',
        text: '我的查询'
      }
    ],
    lawyerlist: [
      {
        img_url: '/static/images/money.png',
        page_url: '/pages/lawyer/tixian/tixian',
        text: '提现'
      },
      {
        img_url: '/static/images/jieyi.png',
        page_url: '/pages/lawyer/mydayi/mydayi',
        text: '解疑答惑'
      },
      {
        img_url: '/static/images/wenshuDA.png',
        page_url: '/pages/lawyer/myWenShu/myWenShu',
        text: '文书委托'
      },
      {
        img_url: '/static/images/ajweituo.png',
        page_url: '/pages/lawyer/myAJweituo/myAJweituo',
        text: '案件委托'
      },
      {
        img_url: '/static/images/guwenWT.png',
        page_url: '/pages/lawyer/lawyerOrder/lawyerOrder',
        text: '顾问委托'
      },
      {
        img_url: '/static/images/finds.png',
        page_url: '/pages/lawyer/myChaxun/myChaxun',
        text: '我的查询'
      },
      // {
      //   img_url: '/static/images/xiugai22.png',
      //   page_url: '/pages/userdata/userdata',
      //   text: '修改个人信息'
      // }
    ],
    showStatusDialog: false,
    role: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this


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
    let userInfo = wx.getStorageSync('userInfo')
    console.log(userInfo)
    let nowtime = new Date()
    nowtime = Date.parse(nowtime)
    let loginTime = wx.getStorageSync('loginTime')
    console.log((nowtime - loginTime), loginTime)
    if (nowtime - loginTime > 172800000 && loginTime) {
      console.log('超过两天，从新请求')
      that.getUserData()
    }
    if (userInfo) {
      that.getUser()
      // userInfo = JSON.parse(userInfo)
      that.setData({
        userName: userInfo.real_name || userInfo.nickName,
        userImage: userInfo.avatarUrl
      })
    }

    let role = wx.getStorageSync('role')
    console.log(role)
    if (!role) {
      console.log('还没身份')
      that.setData({
        showStatusDialog: true
      })
    } else {
      that.setData({
        role: role * 1
      })
      that.setData({
        isShow: false,
        showStatusDialog: false
      })
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
  goshezhi() {
    wx.navigateTo({
      url: '/pages/userdata/userdata',
    })
  },
  // 微信登录，同时记录用户信息
  onWechatLogin(e) {
    let that = this
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

    }
  },
  // 获取用户信息
  getUserInfo: function(e) {
    console.log(e)
    wx.setStorageSync('userInfo', e.detail.userInfo)
    this.setData({
      userName: e.detail.userInfo.nickName,
      userImage: e.detail.userInfo.avatarUrl
    })
  },
  // 获取openid和role身份
  getUserData() {
    let that = this
    return new Promise((resolve, rej) => {
      utils.login()
        .then(res => {
          console.log(res)
          utils.request(Api.GetOpenId, {
            js_code: res,
            user_info: that.data.userInfo
          }, "POST").then(res => {
            // 获取的openid再通过登录接口发给后台
            console.log(res)
            if (res.code == 'S_Ok') {
              wx.setStorageSync('openid', res.data.openid)
              wx.setStorageSync('user_id', res.data.id)
              wx.setStorageSync('role', res.data.role)
              wx.setStorageSync('verify_status', res.data.verify_status)
              wx.setStorageSync('token', res.token)
              let loginTime = new Date()
              loginTime = Date.parse(loginTime)
              console.log(loginTime)
              wx.setStorageSync('loginTime', loginTime)
              resolve(res.data.role)
            } else {
              wx.showToast({
                title: '登录出错！',
                icon: 'none'
              })
            }
          })
        })
    })

  },
  //  发送用户选择的身份信息，更新用户身份状态
  upDataRole() {
    utils.request(Api.UpDataUserData, {
      user_id: wx.getStorageSync('user_id'),
      base_info: JSON.stringify({
        role: wx.getStorageSync('role')
      })
    }, "POST").then(res => {
      console.log(res)
    })
  },
  getPhoneNumber: function(e) {
    console.log(e)
  },
  // 登录按钮关闭和身份框关闭
  onCloseDialog() {
    this.setData({
      showStatusDialog: false
    })
  },
  //设置页面展示内容
  setpageFG(role) {
    let that = this
    that.setData({
      role: role
    })
  },
  optStatus(e) {
    console.log(e)
    let role = e.currentTarget.dataset.status
    let statusName = ''
    let that = this
    console.log(role)
    if (role * 1 == 1) {
      statusName = '客户'
    } else {
      statusName = '律师'
    }
    wx.requestSubscribeMessage({
      tmplIds: ['Q49V7Pv4pGG-sQkFRL6L9q7TI_nIUstxI89lcly1WWI'],
      success(res) {
        console.log(res)
      }
    })
    wx.showModal({
      title: '提示！',
      content: '确认身份后不能随意修改，请认真选择，当前选择是' + statusName,
      showCancel: true,
      success: function(res) {
        console.log(res)
        if (res.confirm) {
          console.log('确认了身份选择', role, statusName)
          let userRole = ''
          that.getUserData().then(res2 => {
            console.log(res2)
            if (res2 == 0) { //用户没注册过
              wx.setStorageSync('role', role)
              // 再去调用接口跟新后台用户的身份
              that.upDataRole()
              that.onCloseDialog() //关闭弹窗
              // 设置页面展示内容
              that.setpageFG(role)
              return
            } else if (res2 != role) { //返回来的数据和用户选择的不一样，说明已经注册过
              wx.showToast({
                title: '用户已注册~',
                icon: 'none'
              })
              that.onCloseDialog()
              wx.setStorageSync('role', res2)
              // 根据后台数据来显示页面内容
              that.setpageFG(res2)
              return
            } else { //返回来的数据和用户选择的一样
              that.setpageFG(res2)
              that.onCloseDialog()
              wx.setStorageSync('role', res2)
            }
          })
        }
      }
    })
  },
  // 我的功能页面跳转
  gopage(e) {
    console.log(e)
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    })
  },
  // 获取用户信息
  getUser() {
    let that = this
    utils.request(Api.GetUserData, {
      user_id: wx.getStorageSync('user_id')
    }, 'POST').then(res => {
      console.log(res)
      let userinfo = wx.getStorageSync('userInfo')
      try {
        userinfo = JSON.parse(userinfo)
      } catch (err) {
        console.log(err)
        userinfo = userinfo
      }
      console.log(456)
      userinfo.real_name = res.data.real_name
      userinfo.verify_status = res.data.verify_status
      wx.setStorageSync('userInfo', userinfo)
      that.setData({
        userName: res.data.real_name || res.data.nick_name,
        userImage: res.data.extra_profile.id_photo ||res.data.avatar_url
      })
    })
  }
})