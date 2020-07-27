// pages/queryBusiness/queryBusiness.js  OrderPublish
const util = require('../../../utils/util.js')
const Api = require('../../../config/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stage: ['房产信息', '工商内档/外档', '结婚证', '身份证信息/户籍登记信息', '车辆登记信息'],
    index1: 0,
    isEdit: false,
    btnTxt: '提交查询',
    desc:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    if (options.edit) {
      Array.prototype.indexVf = function (arr) {
        for (var i = 0; i < this.length; i++) {
          if (this[i] == arr) {
            return i;
          }

        }
      }
     let key= this.data.stage.indexVf(options.index1)
     console.log(key);
     
      this.setData({
        case_id: options.case_id,
        index1: key,
        desc:options.desc,
        isEdit: true,
        btnTxt: '确认修改'
      })
    }

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
  getData(e) {
    console.log(e)
    let that = this
    let obj = e.detail.value
    if (obj.desc == '') {
      wx.showToast({
        title: '请填写相关查询的信息！',
        icon: 'none'
      })
      return
    }
    wx.requestSubscribeMessage({
      tmplIds: ['okc6i2NLrkY6LGEK-eW6w5xqplqb5nbmNM3b2kwjZrU'],
      success(res) {
        console.log(res)
      }
    })
    wx.showModal({
      title: '提示~',
      content: '确定提交咨询的信息为' + obj.findtype,
      success() {
        that.tijiaoData(obj)
      }
    })
  },
  tijiaoData(obj) {
    if(!this.data.isEdit){
      util.request(Api.OrderPublish, {
        customer_id: wx.getStorageSync('user_id'),
        case_type: 4,
        extra_info: JSON.stringify(obj)
      }, 'POST').then(res => {
        console.log(res)
        if (res.code == 'S_Ok') {
          wx.showToast({
            title: '提交成功',
          })
          setTimeout(() => {
            wx.navigateBack()
          }, 1000)
        } else {
          wx.showToast({
            title: '提交失败~',
            icon: 'none'
          })
        }
      })
    }else{
      console.log('obj',obj);
      
      util.request(Api.UpdateOrder,{
        case_id:this.data.case_id,
        extra_info:JSON.stringify(obj),
      },'POST').then(res=>{
        console.log(res);
        if(res.code=='S_Ok'){
          wx.showToast({
            title: '修改成功！',
          })
          setTimeout(()=>{
            wx.navigateBack()
          },1200)
         
        }
      })
    }
    
  },
  bindPickerChange(e) {
    this.setData({
      index1: e.detail.value
    })
  }
})