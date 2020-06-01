// pages/lawyer/uploadData/uploadData.js
const utils = require('../../../utils/util.js')
const Api = require('../../../config/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: [],
    uploadImgs:[],
    tempFiles:[],
    uploadFiles:[],
    case_id:'',
    extra_info:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      case_id:options.case_id,
      extra_info:JSON.parse(options.extra_info)
    })
    
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
  addImg() {
    let that = this
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log(res)
        let imgurl = res.tempFilePaths
        let imgurl2 = that.data.imgurl
        imgurl2 = imgurl2.concat(imgurl)
        that.setData({
          imgurl: imgurl2
        })
      }
    })
  },
  // 删除图片
  deleteImg(e) {
    console.log(e.currentTarget.dataset.index)
    let key = e.currentTarget.dataset.index
    let imgarr = this.data.imgurl
    imgarr.splice(key, 1)
    this.setData({
      imgurl: imgarr
    })
  },
  // 删除文档
  deletefile(e) {
    let key = e.currentTarget.dataset.index
    let files = this.data.tempFiles
    files.splice(key, 1)
    this.setData({
      tempFiles: files
    })
  },
   // 添加文档
   addWord() {
    let that = this
    wx.chooseMessageFile({
      count: 3,
      type: 'file',
      success(res) {
        console.log(res)
        let files = that.data.tempFiles
        files = files.concat(res.tempFiles)
        that.setData({
          tempFiles: files,
          uploadFiles: files
        })
      }
    })
  },
  uploadData(){
    let that=this
    console.log(123,that.data.imgurl);
    if(that.data.imgurl.length==0&&that.data.tempFiles.length==0){
      wx.showToast({
        title: '请选择相关的资料图片上传',
        icon:'none'
      })
    }
    let obj={}
    wx.showLoading({
      title: '资料上传中~',
    })
    Promise.all([...that.FilesUpload(that.data.imgurl), ...that.FilesUpload(that.data.tempFiles, true)]).then(allres=>{
      console.log('allres', allres)
      obj.confirmimgs = that.data.uploadImgs
      obj.confirmfiles = that.data.uploadFiles
      // obj.fileName=[]
      console.log(obj)
      wx.hideLoading()
      that.publishOrder(obj)
    })
  },
  FilesUpload(filesData, isFile = false) {
    let that = this
    if (filesData.length != 0) {
      console.log(456, filesData, isFile)
      let allres11 = []
      let aa
      for (let i = 0; i < filesData.length; i++) {
        aa = new Promise((resolve, reject) => {
          wx.uploadFile({
            url: Api.FileUpload,
            header: {
              'content-type': 'multipart/form-data',
              'Authorization': 'Bearer ' + wx.getStorageSync('token')
            },
            filePath: isFile ? filesData[i].path : filesData[i],
            name: 'files',
            success(res) {
              console.log('files', res)
              const data = res.data
              if (isFile) {
                filesData[i].path = JSON.parse(data).data.urls[0]
                that.setData({
                  uploadFiles: filesData
                })
              } else {
                filesData[i] = JSON.parse(data).data.urls[0]
                that.setData({
                  uploadImgs: filesData
                })
              }
              resolve(data)
              //do something
            },
            fail(err) {
              console.log(err)
              reject(err)
            }
          })
        })
        allres11.push(aa)
      }
      console.log(allres11)
      return (allres11)
    } else {
      return new Promise((resolve, reject) => {
        resolve([])
      })
    }
  },
  publishOrder(obj){
    let that=this
    let extra_info=that.data.extra_info
    extra_info={...extra_info,...obj}
    console.log('extra_info',extra_info);
    
    utils.request(Api.UpdateOrder,{
      case_id:that.data.case_id,
      status:4,
      extra_info:JSON.stringify(extra_info)
    },'POST').then(res=>{
      if(res.code=='S_Ok'){
        wx.showToast({
          title: '资料上传完毕',
        })
        setTimeout(()=>{
          wx.navigateBack()
        },1200)
      }
    })
  }
})