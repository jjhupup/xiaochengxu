//index.js
//获取应用实例
const app = getApp()
const utils = require('../../utils/util.js')
const Api = require('../../config/api.js')
Page({
  data: {
    banner: [{
        id: 1,
        link: 'Url',
        image_url: 'http://yanxuan.nosdn.127.net/65091eebc48899298171c2eb6696fe27.jpg'
      },
      {
        id: 2,
        link: 'Url2',
        image_url: 'http://yanxuan.nosdn.127.net/bff2e49136fcef1fd829f5036e07f116.jpg'
      },
      {
        id: 3,
        link: 'Url3',
        image_url: 'http://yanxuan.nosdn.127.net/8e50c65fda145e6dd1bf4fb7ee0fcecc.jpg'
      }
    ],
    userInfo: {},
    customerList: [{
        id: 1,
        img_url: '/static/images/consult.png',
        pageUrl: '/pages/customer/freeConsult/freeConsult',
        titleone: '免费咨询',
        detailed: '快速在线提问，多个律师为您解答'
      },
      {
        id: 2,
        img_url: '/static/images/edit.png',
        pageUrl: '/pages/customer/document/document?order_type=1',
        titleone: '文书起草',
        detailed: '法律文书写作，合同委托信息等等'
      },
      {
        id: 3,
        img_url: '/static/images/entrust.png',
        pageUrl: '/pages/customer/caseEntrusted/caseEntrusted?order_type=2',
        titleone: '案件委托',
        detailed: '编辑您的委托信息，律师任你选择'
      },
      {
        id: 4,
        img_url: '/static/images/find.png',
        pageUrl: '/pages/customer/queryBusiness/queryBusiness',
        titleone: '信息查看',
        detailed: '查看各种信息，等等等等信息'
      },
      {
        id: 5,
        img_url: '/static/images/guwen.png',
        titleone: '法律顾问',
        pageUrl: '/pages/customer/corporateLawyer/corporateLawyer?order_type=1',
        detailed: '提交您的顾问需求，律师任你选择'
      }
    ],
    lawyerList: [{
        id: 1,
        img_url: '/static/images/dayi.png',
        pageUrl: '/pages/lawyer/dayi/dayi?title=0',
        titleone: '答疑解惑',
        detailed: '为客户答疑解惑，提升活跃度'
      },
      {
        id: 3,
        img_url: '/static/images/wenshu2.png',
        pageUrl: '/pages/lawyer/dayi/dayi?title=1',
        titleone: '文书委托',
        detailed: '接收客户的文书委托，获得悬赏金'
      },
      {
        id: 2,
        img_url: '/static/images/entrust.png',
        pageUrl: '/pages/lawyer/dayi/dayi?title=2',
        titleone: '案件委托',
        detailed: '案件委托抢单，获取悬赏金'
      },
      {
        id: 4,
        img_url: '/static/images/guwen.png',
        pageUrl: '/pages/lawyer/dayi/dayi?title=3',
        titleone: '顾问委托',
        detailed: '顾问委托抢单，获取悬赏金'
      },
      {
        id: 5,
        img_url: '/static/images/find.png',
        pageUrl: '/pages/lawyer/dayi/dayi?title=4',
        titleone: '查询委托',
        detailed: '查询委托抢单，获取悬赏金'
      }
    ],
    showLoginDialog: false,
    showStatusDialog: false,
    isShow: true,
    gotoUrl: '',
    role: wx.getStorageSync('role')
  },
  onLoad: function() {

  },
  onShow: function() {
    let role = wx.getStorageSync('role')
    let that = this
    let nowtime = new Date()
    nowtime = Date.parse(nowtime)
    let loginTime=wx.getStorageSync('loginTime')
    console.log((nowtime - loginTime), loginTime)
    if (nowtime - loginTime > 172800000 && loginTime){
      console.log('超过两天，从新请求')
      that.getUserData()
    }
    console.log(utils, Api)
    console.log(role)
    if (!role) {
      console.log('还没身份')
      that.setData({
        showStatusDialog: true
      })
    } else {
      that.setData({
        role: role * 1,
        showStatusDialog: false
      })
      if (role * 1 == 2) {
        that.setData({
          isShow: false
        })
      }
    }

  },
  // 打开页面
  goPage: function(e) {
    console.log(e)
    this.setData({
      gotoUrl: e.currentTarget.dataset.url
    })
    if (wx.getStorageSync('userInfo')) {
      wx.navigateTo({
        url: e.currentTarget.dataset.url,
      })
    } else {
      this.showLoginDialog();
    }

  },
  // 打开登陆框
  showLoginDialog() {
    this.setData({
      showLoginDialog: true
    })
  },
  // 登录按钮关闭和身份框关闭
  onCloseDialog() {
    this.setData({
      showLoginDialog: false,
      showStatusDialog: false
    })
  },
  onDialogBody() {
    // 阻止冒泡
  },
  // 微信登录，同时记录用户信息
  onWechatLogin(e) {
    console.log(111, e)
    let that = this
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
        showLoginDialog: false
      });
      wx.navigateTo({
        url: that.data.gotoUrl
      })
      console.log(wx.getStorageSync('role'))
      wx.setStorageSync('userInfo', JSON.stringify(e.detail.userInfo));
      // utils.request()
    }
  },
  getPhoneNumber(e) {
    console.log(999, e)
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    return {
      title: '搞咩法律',
      desc: '青青草原法律大规',
      path: '/pages/index/index'
    }
  },
  // 获取openid和role身份
  getUserData() {
    let that = this
    wx.showLoading({
      title: '加载中',
    })
    return new Promise((resolve, rej) => {
      utils.login()
        .then(res => {
          console.log(res)
          wx.hideLoading()
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
  //设置页面展示内容
  setpageFG(role) {
    let that = this
    if (role == 1) {
      that.setData({
        isShow: true
      })
    } else {
      that.setData({
        isShow: false
      })
    }
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
  optStatus(e) {
    let role = e.currentTarget.dataset.role
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
  //测试用！！！！！！！！
  upDataRole2(role) {
    utils.request(Api.UpDataUserData, {
      user_id: wx.getStorageSync('user_id'),
      base_info: JSON.stringify({
        role: role
      })
    }, "POST").then(res => {
      console.log(res)
    })
  },
  change() {
    this.upDataRole2(2)
  },
  change2() {
    this.upDataRole2(1)
  }

})