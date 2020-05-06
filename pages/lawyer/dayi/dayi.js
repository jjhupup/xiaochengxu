// pages/lawyer/dayi/dayi.js
const utils = require('../../../utils/util.js')
const Api = require('../../../config/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    NavArr: ['抢单报价'],
    key: 0,
    title: ['答疑解惑', '文书委托', '案件委托', '顾问委托'],
    questionType: ['民事代理', '商事纠纷', '刑事辩护', '行政诉讼'],
    Allquestion: [],
    AJAllOrder: [], //案件
    WSAllOrder: [], //文书
    GWAllOrder: [], //顾问
    CXAllOrder: [], //查询
    btnTxt: '立即抢答',
    ordertype: 0,
    verify_status: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    wx.setNavigationBarTitle({
      title: this.data.title[options.title]
    })
    if (options.title != 0) {
      this.setData({
        btnTxt: '立即报价抢单',
        ordertype: options.title
      })
    }
    // this.setData({
    //   title:
    // })
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
    if (that.data.ordertype == 0) {
      that.getZixunData()
    } else {
      that.getOrderData()
    }
  },
  // 获取案件文书顾问数据
  getOrderData() {
    let that = this
    utils.request(Api.GetOrderList, {
      type: that.data.ordertype
    }, 'POST').then(res => {
      console.log(res)
      let type = that.data.ordertype
      if (type == 1) {
        // 文书起草
        that.setData({
          WSAllOrder: res.data
        })
      } else if (type == 2) {
        //案件委托
        that.setData({
          AJAllOrder: res.data
        })
      } else if (type == 3) {
        // 法律顾问
        that.setData({
          GWAllOrder: res.data
        })
      } else {
        // 查询
        that.setData({
          CXAllOrder: res.data
        })
      }

    })
  },
  // 咨询页面数据获取
  getZixunData() {
    let that = this
    // 获取答疑解惑列表或者其他列表
    utils.request(Api.GetAllQuestion).then(res => {
      console.log(res)
      that.setData({
        Allquestion: res.data
      })
    }).catch(rej => {
      console.log(rej)
      wx.showModal({
        title: '提示',
        content: '服务器出错，请稍后再试',
        success(comfin) {
          wx.switchTab({
            url: '/pages/index/index',
          })
        }
      })
    })
  },

  getData(e) {
    console.log(e)
    this.setData({
      key: e.currentTarget.dataset.index
    })
  },
  lookDetail(e) {
    console.log(e)
    let id = e.currentTarget.dataset.questionid
    let that=this
    this.getLawyerData(id).then(res => {
      console.log('resres', res)
      if (that.data.ordertype == 0 && res.verify_status == 3) {
        wx.navigateTo({
          url: '/pages/lawyer/dayiDetail/dayiDetail?id=' + id
        })
      } else if (res.verify_status == 2) {
        wx.showModal({
          title: '提示~',
          content: '您的律师认证还在审核中，请审核通过后再进行下一步操作'
        })
      }else {
        wx.showModal({
          title: '提示',
          content: '请提交您的律师相关证件，再进行下一步操作',
          success(data) {
            if (data.confirm) {
              wx.navigateTo({
                url: '/pages/userdata/userdata',
              })
            }
          }
        })
      }
    })

  },
  // 去往律师报价页面
  goQuote(e) {
    console.log(e)
    let id = e.currentTarget.dataset.id
    let that=this
    this.getLawyerData().then(res => {
      if (res.verify_status == 3) {  // 测试先用的2，后面要改回3
        if (that.data.ordertype == 2) {
          wx.navigateTo({
            url: '/pages/lawyer/AJquote/AJquote?id=' + id,
          })
        } else if (that.data.ordertype == 3) {
          wx.navigateTo({
            url: '/pages/lawyer/guwen/guwen?id=' + id,
          })
        } else if (that.data.ordertype == 4) {
          wx.navigateTo({
            url: '/pages/lawyer/chaxun/chaxun?id=' + id,
          })
        } else {
          wx.navigateTo({
            url: '/pages/lawyer/offerDetail/offerDetail?id=' +id
          })
        }
      } else if (res.verify_status == 2) {
        wx.showModal({
          title: '提示~',
          content: '您的律师认证还在审核中，请审核通过后再进行下一步操作'
        })
      } else {
        wx.showModal({
          title: '提示~',
          content: '请提交您的律师相关证件，再进行下一步操作',
          success(data){
            if (data.confirm) {
              wx.navigateTo({
                url: '/pages/userdata/userdata',
              })
            }
          }
        })
      }
    })

  },
  getLawyerData() {
    let that = this
    return new Promise((result, rej) => {
      utils.request(Api.GetUserData, {
        user_id: wx.getStorageSync('user_id')
      }, 'POST').then(res => {
        console.log(res)
        if (res.code == 'S_Ok') {
          wx.setStorageSync('verify_status', res.data.verify_status)
          result(res.data)
        }
      })
    })

  }
})