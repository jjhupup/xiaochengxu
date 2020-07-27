// pages/document/document.js
const utils = require('../../../utils/util.js')
const Api = require('../../../config/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stage: ['代写诉状', '发律师函', '合同审核', '取保候审申请申诉', '再审申请书'],
    index1: 0,
    textType: '代写诉状',
    imgurl: [],
    tempFiles: [],
    imgurl2:[],
    tempFiles2:[],
    uploadFiles: [],
    uploadImgs: [],
    swiperH: "126%",
    case_id: '',
    desctxt: '',
    btnTxt: '提交咨询',
    isEdit: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.edit) {
      let key = this.getArrayIndex(this.data.stage, options.index1)
      this.setData({
        case_id: options.case_id,
        index1: key,
        isEdit: true,
        btnTxt: '确认修改'
      })
      this.getDetail(options.case_id)
    }else{
      this.addSwiperH()
    }
  },
  getArrayIndex(arr, obj) {
    var i = arr.length;
    while (i--) {
      if (arr[i] === obj) {
        return i;
      }
    }
    return -1;
  },
  getDetail(id) {
    let that = this
    utils.request(Api.GetOrderDetail, {
      case_id: id
    }, "POST").then(res => {
      console.log(res)
      if (res.code == 'S_Ok') {
        let alldata = res.data
        that.setData({
          desctxt: alldata.extra_info.description,
          imgurl2:alldata.extra_info.imgs,
          tempFiles2:alldata.extra_info.files
        })
        that.addSwiperH()
      } else {
        wx.showModal({
          title: '提示',
          content: '数据请求出错！',
          success() {
            wx.navigateBack()
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   
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
    if (e.detail.current == 3) {
      this.addSwiperH(3)
    }
    this.setData({
      index1: e.detail.current,
      textType: this.data.stage[e.detail.current]
    })
  },
  bindPickerChange(e) {
    console.log(e)
    this.setData({
      index1: e.detail.value
    })
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
          imgurl: imgurl2,
          uploadImgs: imgurl2
        })
        that.addSwiperH()
      }
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
        that.addSwiperH()
      }
    })
    // wx.getFileSystemManager({
    //   success(res) {
    //     console.log(res.fileList)
    //   }
    // })
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
    this.addSwiperH()
  },
  // 删除文档
  deletefile(e) {
    let key = e.currentTarget.dataset.index
    let files = this.data.tempFiles
    files.splice(key, 1)
    this.setData({
      tempFiles: files
    })
    this.addSwiperH()
  },
  // 动态给swiper高度方法
  addSwiperH(num) {
    let that = this
    var query = wx.createSelectorQuery();
    console.log(query)
    query.select('.swiper-item').boundingClientRect()

    query.exec((res) => {
      console.log(res)
      var listHeight = res[0].height; // 获取list高度
      if (num) {
        listHeight = 800
      }
      that.setData({
        swiperH: listHeight + 100 + 'px'
      })
    })
  },
  subQuestion(e) {
    let that = this
    console.log(e.detail.value)
    let obj = e.detail.value
    obj.description = obj.description.replace(/\s*/g, "");
    if (obj.description == '' || obj.description.length < 10) {
      wx.showToast({
        title: '请详细填写案件或文书要求描述~',
        icon: 'none',
        duration: 2000
      })
    } else {

      wx.showModal({
        title: '提示',
        content: '请确认文书提交类型和相关证据的上传提交~',
        confirmText: '确认提交',
        success: (res => {
          if (res.confirm) { //确认了，提交数据

            obj.textType = that.data.textType
            console.log(obj)
            wx.showLoading({
              title: '文件上传中~',
              mask: true
            })
            Promise.all([...that.FilesUpload(that.data.imgurl), ...that.FilesUpload(that.data.tempFiles, true)]).then(allres => {
              // let filesData=[]
              console.log('allres', allres)
              obj.imgs = that.data.uploadImgs.concat(that.data.imgurl2)
              obj.files = that.data.uploadFiles.concat(that.data.tempFiles2)
              // obj.fileName=[]
              console.log(obj)
              wx.hideLoading()
              that.publishOrder(obj)
            }).catch(err=>{
              console.log(err);
              wx.hideLoading()
              that.publishOrder(obj)
            })
            // that.publishOrder(obj)
            // that.FileUpload(obj)
          }
        })
      })
    }
  },
  publishOrder(obj) {
    console.log(obj)
    if (!this.data.isEdit) {
      wx.showLoading({
        title: '提交中...',
      })
      utils.request(Api.OrderPublish, {
        customer_id: wx.getStorageSync('user_id'),
        case_type: 1,
        extra_info: JSON.stringify(obj)
      }, 'POST').then(res => {
        console.log(res)
        wx.hideLoading()
        if (res.code == 'S_Ok') {
          wx.showToast({
            title: '咨询提交成功',
          })
          wx.requestSubscribeMessage({
            tmplIds: ['okc6i2NLrkY6LGEK-eW6w5xqplqb5nbmNM3b2kwjZrU'],
            success(res) {
              console.log(res)
              setTimeout(() => {
                wx.navigateBack()
              }, 1000)
            },
            fail(err) {
              setTimeout(() => {
                wx.navigateBack()
              }, 1000)
            }
          })

        }
      })
    }else{

      utils.request(Api.UpdateOrder,{
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
  // 图片预览
  seeImg(e) {
    console.log(e)
    // this.FileUpload()
    let imgurls = this.data.imgurl
    let index = e.target.dataset.key
    wx.previewImage({
      current: imgurls[index], // 当前显示图片的http链接
      urls: imgurls // 需要预览的图片http链接列表
    })
  },
  // 图片文件上传
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
  }
})