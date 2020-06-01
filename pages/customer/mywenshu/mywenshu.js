// pages/customer/mywenshu/mywenshu.js
const util = require('../../../utils/util.js')
const Api = require('../../../config/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    NavArr: ['报价中', '服务中', '申诉中', '待确认', '已结束'],
    NavArr2: ['报价中', '服务中', '申诉中', '待确认', '已结束'],
    NavArr3: ['报价中', '服务中', '申诉中', '待确认', '已结束'],
    NavArr4: ['报价中', '服务中', '申诉中', '待确认', '已结束'],
    key: 0,
    allWenshu: [],
    allAnjian: [],
    allGuwen: [],
    allChaxun: [],
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
    // 请求数据
    this.getAllData(this.data.type)
  },
  getAllData(type) {
    let that = this
    util.request(Api.GetCustomerOrderData, {
      type: type,
      customer_id: wx.getStorageSync('user_id')
    }, "POST").then(res => {
      console.log(res)
      if (res.code == 'S_Ok') {
        res.data = res.data.filter(val => {
          if (val.status == 0) {
            if (val.bidders.length == 0) {
              val.statustxt = '待抢单'
            } else {
              val.statustxt = '未支付'
            }
          } else if (val.status == 1) {
            val.statustxt = '服务中'
          } else if (val.status == 2) {
            val.statustxt = '已结束'
          }
          return val
        })
        if (type == 1) {
          that.setData({
            allWenshu: res.data
          })
        } else if (type == 2) {
          that.setData({
            allAnjian: res.data
          })
        } else if (type == 4) {
          that.setData({
            allChaxun: res.data
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
    this.getAllData(this.data.type)
    // if (e.currentTarget.dataset.index==4){
    //   this.setData({
    //     key: 5
    //   })
    //   return
    // }
    this.setData({
      key: e.currentTarget.dataset.index
    })
  },
  lookDetail(e) {
    let statusOeder = e.currentTarget.dataset.orderstatus
    let id = e.currentTarget.dataset.questionid
    console.log(e, statusOeder)
    // 订单待处理状态，进入选择律师页面
      console.log('页面跳转1')
        wx.navigateTo({
          url: '/pages/customer/wenshuDetail/wenshuDetail?id=' + id + '&type=' + this.data.type + '&status=' + statusOeder,
        })
    // this.setData({
    //   key:
    // })
  }
})