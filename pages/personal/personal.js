// pages/personal/personal.js
const util = require('../../utils/util.js')
const Api = require('../../config/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid: '',
    lawyerData:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      uid: options.openid
    })
    this.getUserinfo()
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

 getUserinfo(){
   let that=this
   util.request(Api.GetUserData,{
     user_id:that.data.uid
   },'post').then(res=>{
     console.log(res)
     if(res.code=='S_Ok'){
       that.setData({
         lawyerData:res.data
       })
     }
   })
 }
})