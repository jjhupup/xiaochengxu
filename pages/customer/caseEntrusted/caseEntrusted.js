// pages/caseEntrusted/caseEntrusted.js
const Api=require('../../../config/api.js')
const utils=require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    anJianArray1: ['请选择...','民事代理', '商事纠纷', '刑事辩护', '行政诉讼'],
    status:['请选择...','原告(申请人)','被告(被申请人)','上诉人','被上诉人','第三人'],
    index1:0,
    diweiIndex:0,
    jieduanIndex:0,
    leixin1:0,
    leixin2:0,
    anJianArray2:[],
    stage: ['请选择...','一审','二审','再审','执行','仲裁','复议'],
    regionVal: ['广东省', '广州市', '天河区'],
    regionVal2: ['广东省', '广州市', '天河区']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getRegion(e){
    console.log(e)
    this.setData({
      regionVal: e.detail.value
    })
  },
  getRegion2(e){
    this.setData({
      regionVal2: e.detail.value
    })
  },
  getAnJianType(e){
    console.log(e)
    this.setData({
      leixin1:e.detail.value
    })
  },
  getAnJianData(e){
    console.log(e.detail.value)
    let obj = e.detail.value
    if (!obj.real_name){
      wx.showToast({
        title: '请填写您的姓名',
        icon:'none'
      })
    }else if(obj.SJmoney=='true'&&obj.ZYmoney==''){
      wx.showToast({
        title: '请填写受争议的金额~',
        icon: 'none'
      })
    } else if (obj.AJtype == 0 || obj.DiWei == 0 || obj.JieDuan==0){
      wx.showToast({
        title: '请选择相关案件信息~',
        icon: 'none'
      })
    } else if (obj.DetailTxt==''||obj.DetailTxt.length<10){
      wx.showToast({
        title: '请详细填写案倾简介~',
        icon: 'none'
      })
    }else{
      //提交数据
      this.tijiaoData(obj)
    }
  },
  Diwei(e){
    this.setData({
      diweiIndex: e.detail.value
    })
  },
  JieDuan(e){
    this.setData({
      jieduanIndex: e.detail.value
    })
  },
  tijiaoData(obj){
    utils.request(Api.OrderPublish,{
      customer_id:wx.getStorageSync('user_id'),
      order_type:2,
      extra_info:JSON.stringify(obj)
    },'POST').then(res=>{
      console.log(res)
      if(res.code=='S_Ok'){
        wx.showModal({
          title: '提示',
          content: '案件委托提交成功~',
          success:()=>{
            wx.switchTab({
              url: '/pages/index/index',
            })
          }
        })
      }
    })
  }
})