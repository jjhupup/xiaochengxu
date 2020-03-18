// pages/customer/mywenshu/mywenshu.js
const util = require('../../../utils/util.js')
const Api = require('../../../config/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    NavArr: ['全部文书', '待处理', '服务中', '已结束'],
    NavArr2: ['全部案件', '待处理', '服务中', '已结束'],
    NavArr3: ['全部顾问', '待处理', '服务中', '已结束'],
    key: 0,
    allWenshu: [],
    allAnjian: [],
    allGuwen: [],
    type: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      type: options.type
    })
    wx.setNavigationBarTitle({
      title: options.name
    })
    // 请求数据
    this.getAllData(options.type)
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
  getAllData(type) {
    let that = this
    util.request(Api.GetCustomerOrderData, {
      type: type,
      user_id: wx.getStorageSync('user_id')
    }, "POST").then(res => {
      console.log(res)
      if (res.code == 'S_Ok') {
        if (type == 1) {
          that.setData({
            allWenshu: res.data
          })
        } else if (type == 2) {
          that.setData({
            allAnjian: res.data
          })
        } else {
          that.setData({
            allGuwen: res.data
          })
        }
      } else {
        wx.showModal({
          title: '提示~',
          content: '服务器出错，请稍后再试',
          success() {
            wx.switchTab({
              url: 'pages/my/my',
            })
          }
        })
      }
    })
  },
  getData(e) {
    console.log(e)
    this.setData({
      key: e.currentTarget.dataset.index
    })
  },
  lookDetail(e) {
    let statusOeder = e.currentTarget.dataset.orderstatus
    let id = e.currentTarget.dataset.questionid
    console.log(e, statusOeder)
    if (statusOeder == 1) { // 订单待处理状态，进入选择律师页面
      console.log('页面跳转1')
      if (this.data.type == 1) { //进入有图片展示的文书详细页
        wx.navigateTo({
          url: '/pages/customer/wenshuDetail/wenshuDetail?id=' + id,
        })
      }else if(this.data.type==2){ // 进入案件详细页
        wx.navigateTo({
          url: '/pages/customer/AnjianDetail/AnjianDetail?id=' + id,
        })
      }else{ //进入顾问详细页
        wx.navigateTo({
          url: '/pages/customer/guwenDetail/guwenDetail?id=' + id,
        })
      }

    } else if (statusOeder == 2) { //服务中状态，进入为自己服务的律师对话页面

    } else {

    }
    // this.setData({
    //   key:
    // })
  }
})