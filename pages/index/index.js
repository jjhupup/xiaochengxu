//index.js
//获取应用实例
const app = getApp()
const utils = require('../../utils/util.js')
const config = require('../../config/config.js')
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
        pageUrl: '/pages/customer/document/document',
        titleone: '文书起草',
        detailed: '法律文书写作，合同委托信息等等'
      },
      {
        id: 3,
        img_url: '/static/images/entrust.png',
        pageUrl: '/pages/customer/caseEntrusted/caseEntrusted',
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
        pageUrl: '/pages/customer/corporateLawyer/corporateLawyer',
        detailed: '提交您的顾问需求，律师任你选择'
      }
    ],
    lawyerList: [{
        id: 1,
        img_url: '/static/images/dayi.png',
        pageUrl: '/pages/lawyer/dayi/dayi?title=答疑解惑',
        titleone: '答疑解惑',
        detailed: '为客户答疑解惑，提升活跃度'
      },
      {
        id: 2,
        img_url: '/static/images/entrust.png',
        pageUrl: '/pages/lawyer/dayi/dayi?title=案件委托',
        titleone: '案件委托',
        detailed: '案件委托抢单，获取悬赏金'
      },
      {
        id: 3,
        img_url: '/static/images/wenshu2.png',
        pageUrl: '/pages/lawyer/dayi/dayi?title=文书委托',
        titleone: '文书委托',
        detailed: '接收客户的文书委托，获得悬赏金'
      },
      {
        id: 4,
        img_url: '/static/images/guwen.png',
        pageUrl: '/pages/lawyer/dayi/dayi?title=顾问委托',
        titleone: '顾问委托',
        detailed: '提交您的顾问需求，律师任你选择'
      }
    ],
    showLoginDialog: false,
    showStatusDialog: false,
    isShow: true,
    gotoUrl: '',
    status: wx.getStorageSync('status')
  },
  onLoad: function() {

  },
  onShow: function() {
    console.log(utils, config)
    let status = wx.getStorageSync('status')
    let that = this
    console.log(status)
    if (!status) {
      console.log('还没身份')
      that.setData({
        showStatusDialog: true
      })
    } else {
      that.setData({
        status: status * 1,
        showStatusDialog: false
      })
      if (status * 1 == 1) {
        that.setData({
          isShow: false
        })
      }
    }

  },
  // 打开页面
  goPage: function(e) {
    console.log(e)
    wx.request({
      url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx0ca41230ae85d573&secret=ab8814e39e16aef82c5b11090dedf9dd&js_code=JSCODE&grant_type=authorization_code',
      method: 'GET'
    })
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
      this.setData({
        userInfo: e.detail.userInfo,
        showLoginDialog: false
      });
      wx.navigateTo({
        url: this.data.gotoUrl
      })
      console.log(wx.getStorageSync('status'))
      wx.setStorageSync('userInfo', JSON.stringify(e.detail.userInfo));
      
      utils.login()
        .then(res => {
          console.log(res)
          let url = "https://api.weixin.qq.com/sns/jscode2session?appid=" + config.appid + "&secret=" + config.appsecret + "&js_code=" + res + "&grant_type=authorization_code"
          utils.request(url).then(res=>{
            // 获取的openid再通过登录接口发给后台
            console.log(res)
          })
        })
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
      success: function(res) {
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
            })
            return
          }
          that.setData({
            isShow: false,
          })
        }
      }
    })
  }

})