// pages/customer/myquestion/myquestion.js
const utils=require('../../../utils/util.js')
const Api=require('../../../config/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    NavArr: ['全部咨询', '服务中', '已结束'],
    key: 0,
    allQuestion:[],
    questionType: ['民事代理', '商事纠纷', '刑事辩护', '行政诉讼']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getListData()
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

  getListData(){
    let that=this
    utils.request(Api.GetMyMFZX,{
      user_id: wx.getStorageSync('user_id')
    },'POST').then(res=>{
      console.log(res)
      if (res.code =='S_Ok'){
        res.data = res.data.reverse()
        that.setData({
          allQuestion:res.data
        })
      }else{
        wx.showModal({
          title: '提示',
          content: '服务器出错，请稍后再试~',
          success(){
            wx.switchTab({
              url: '/pages/my/my',
            })
          }
        })
      }
    })
  },
  getData(e) {
    console.log(e)
    let that=this
    let index = e.currentTarget.dataset.index
    that.setData({
      key: index
    })
    if (index==1){
      console.log(that.data.allQuestion)
      let data = that.data.allQuestion
      let list=[]
      data = data.filter(({replies})=>{
        list=replies.filter((from_name)=>{
          if (from_name=='辉') return replies
        })
      })
      console.log(data, list)
    }
  },
  lookDetail(e){
    console.log(e.currentTarget.dataset)
    let orderstatus = e.currentTarget.dataset.orderstatus
    let id = e.currentTarget.dataset.questionid
    if(orderstatus==1){ // 跳转到解疑答惑页面
      wx.navigateTo({
        url: '/pages/customer/questionDetail/questionDetail?id='+id,
      })
    }
  }
})