// pages/document/document.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stage: ['代写诉状', '发律师函', '合同审核', '取保候审申请申诉', '再审申请书'],
    index1:0,
    imgurl:[],
    tempFiles:[],
    swiperH:"126%"
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
    wx.showShareMenu()
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
  onShareAppMessage: function (res) {
    return {
      title: '搞咩法律',
      desc: '青青草原法律大规',
      path: '/pages/index/index'
    }
  },
  
  changeIndex(e) {
    console.log(e.detail.current)
    this.setData({
      index1: e.detail.current
    })
  },
  bindPickerChange(e){
    console.log(e)
    this.setData({
      index1: e.detail.value
    })
  },
  addImg(){
    let that=this
    wx.chooseImage({
      count:9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res){
        console.log(res)
        let imgurl = res.tempFilePaths
        let imgurl2=that.data.imgurl
        imgurl2 = imgurl2.concat(imgurl)
        that.setData({
          imgurl: imgurl2
        })
        that.addSwiperH()
      }
    })
  },
  // 添加文档
  addWord(){
    let that=this
    wx.chooseMessageFile({
      count: 3,
      type: 'file',
      success(res) {
        console.log(res)
        let files=that.data.tempFiles
        files = files.concat(res.tempFiles)
        that.setData({
          tempFiles:files
        })
        that.addSwiperH()
      }
    })
  },
  // 删除图片
  deleteImg(e){
    console.log(e.currentTarget.dataset.index)
    let key = e.currentTarget.dataset.index
    let imgarr=this.data.imgurl
    imgarr.splice(key,1)
    this.setData({
      imgurl:imgarr
    })
    this.addSwiperH()
  },
  // 删除文档
  deletefile(e){
    let key = e.currentTarget.dataset.index
    let files = this.data.tempFiles
    files.splice(key, 1)
    this.setData({
      tempFiles: files
    })
    this.addSwiperH()
  },
  // 动态给swiper高度方法
  addSwiperH(){
    let that=this
    var query = wx.createSelectorQuery();
    query.select('.swiper-item').boundingClientRect()
    query.exec((res) => {
      console.log(res)
      var listHeight = res[0].height; // 获取list高度
      that.setData({
        swiperH: listHeight + 100 + 'px'
      })
    })
  }
})