// pages/customer/AnjianDetail/AnjianDetail.js
const utils = require('../../../utils/util.js')
const Api = require('../../../config/api.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    anjianData:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id
    })
    this.getData(options.id)

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  getData(id){
    let that=this
    utils.request(Api.GetOrderDetail,{
      case_id:id
    },"POST").then(res=>{
      console.log(res)
      if(res.code=='S_Ok'){
        that.setData({
          anjianData:res.data
        })
      }
    })
  },
  
})