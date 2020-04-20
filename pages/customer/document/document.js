// pages/document/document.js
const utils=require('../../../utils/util.js')
const Api=require('../../../config/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stage: ['代写诉状', '发律师函', '合同审核', '取保候审申请申诉', '再审申请书'],
    index1:0,
    textType:'代写诉状',
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
    this.addSwiperH()
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
    if (e.detail.current==3){
      this.addSwiperH(3)
    }
    this.setData({
      index1: e.detail.current,
      textType: this.data.stage[e.detail.current]
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
  addSwiperH(num){
    let that=this
    var query = wx.createSelectorQuery();
    console.log(query)
      query.select('.swiper-item').boundingClientRect()
    
    query.exec((res) => {
      console.log(res)
      var listHeight = res[0].height; // 获取list高度
      if(num){
        listHeight=800
      }
      that.setData({
        swiperH: listHeight + 100 + 'px'
      })
    })
  },
  subQuestion(e){
    let that=this
    console.log(e.detail.value)
    let obj = e.detail.value
    obj.description=obj.description.replace(/\s*/g, "");
    if (obj.description==''||obj.description.length<10){
      wx.showToast({
        title: '请详细填写案件或文书要求描述~',
        icon:'none',
        duration:2000
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '请确认文书提交类型和相关证据的上传提交~',
        confirmText:'确认提交',
        success:(res=>{
          if(res.confirm){ //确认了，提交数据
            console.log(obj)
            obj.textType=that.data.textType
            that.publishOrder(obj)
            that.FileUpload()
          }
        })
      })
    }
  },
  publishOrder(obj){
    utils.request(Api.OrderPublish,{
      customer_id: wx.getStorageSync('user_id'),
      case_type:1,
      extra_info:JSON.stringify(obj)
    },'POST').then(res=>{
      console.log(res)
      if (res.code =='S_Ok'){
        wx.showToast({
          title: '咨询提交成功',
        })
        setTimeout(()=>{
          wx.navigateBack()
        },1000)
      }
    })
  },
  // 图片预览
  seeImg(e){
    console.log(e)
    this.FileUpload()
    let imgurls = this.data.imgurl
    let index = e.target.dataset.key
    wx.previewImage({
      current: imgurls[index], // 当前显示图片的http链接
      urls: imgurls // 需要预览的图片http链接列表
    })
  },
  // 图片上传
  FileUpload(){
    let that=this
    if (that.data.imgurl.length!=0){
      console.log(456, that.data.imgurl[0])
      wx.uploadFile({
        url: Api.FileUpload, 
        header:{
          'content-type':'multipart/form-data'
        },
        filePath: that.data.imgurl[0],
        name: 'files',
        success(res) {
          console.log('imgres',res)
          const data = res.data
          //do something
        },
        fail(err){
          console.log(err)
        }
      })
    }
    
  }
})