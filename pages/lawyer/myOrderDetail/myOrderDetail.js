// pages/lawyer/myOrderDetail/myOrderDetail.js
const util = require('../../../utils/util.js')
const Api = require('../../../config/api.js')
const api = require('../../../config/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allData: {},
    mybidder: {},
    type: 0,
    isShowComment: false,
    shensuTxt: '',
    status: 0,
    case_id: 0,
    editShow: false,
    editmoney: '',
    isEdit: false,
    editTxt: '修改上传资料',
    imgurl: [],
    fileurl: [],
    uploadImgs: [],
    uploadFiles: []
  },

  /**
   * 生命周期函数--监听页面加载case_id=6&type=1&orderstatus=0
   */
  onLoad: function (options) {
    this.getCaseData(options.case_id)
    this.setData({
      type: options.type,
      status: options.orderstatus,
      case_id: options.case_id
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  getCaseData(id) {
    let that = this
    util.request(Api.GetOrderDetail, {
      case_id: id
    }, 'post').then(res => {
      if (res.code == 'S_Ok') {
        let bidder = res.data.bidders.filter(val => {
          if (val.lawyer.id == wx.getStorageSync('user_id')) {
            return val
          }
        })
        console.log(bidder)
        let aa = res.data.extra_info.confirmimgs
        let bb = res.data.extra_info.confirmfiles
        wx.setStorageSync('confirmimgs', JSON.stringify(aa))
        wx.setStorageSync('confirmfiles', JSON.stringify(bb))
        res.data.publisher.create_time=res.data.publisher.create_time.slice(0,10)
        that.setData({
          allData: res.data,
          mybidder: bidder,
          imgurl: aa,
          fileurl: bb
        })
        // that.updataOrder()
      }
    })
  },
  goUpload() {
    wx.redirectTo({
      url: '/pages/lawyer/uploadData/uploadData?case_id=' + this.data.case_id + "&extra_info=" + JSON.stringify(this.data.allData.extra_info),
    })
  },
  shensu() {
    this.setData({
      isShowComment: true
    })
  },
  closeComment() {
    this.setData({
      isShowComment: false,
      shensuTxt: ''
    })
  },
  // 阻止冒泡
  onDialogBody() {},
  bindTextAreaBlur(e) {
    console.log(e)
    this.setData({
      shensuTxt: e.detail.value
    })
  },
  subQuestion() {
    let that = this
    let shensuTxt = that.data.shensuTxt
    shensuTxt = shensuTxt.replace(/\s*/g, "");
    console.log(shensuTxt)
    if (shensuTxt == '') {
      wx.showToast({
        title: '请输入申诉理由!',
        icon: 'none'
      })
    } else if (shensuTxt.length < 8) {
      wx.showToast({
        title: '申诉字数不能少于8个!',
        icon: 'none'
      })
    } else {
      that.faShensu(shensuTxt)
    }
  },
  // 发起申诉
  faShensu(txt) {
    console.log(txt)
    let that = this
    util.request(Api.ApplyRefund, {
      case_id: that.data.case_id,
      appealer_id: wx.getStorageSync('user_id'),
      reason: txt
    }, 'POST').then(res => {
      console.log(res)
    })
  },
  seeImg(e) {
    let that = this
    console.log(e.target.dataset.index)
    let key = e.target.dataset.index
    if (e.target.dataset.myimg) {
      wx.previewImage({
        current: that.data.imgurl[key], // 当前显示图片的http链接
        urls: that.data.imgurl // 需要预览的图片http链接列表
      })
    } else {
      wx.previewImage({
        current: that.data.allData.extra_info.imgs[key], // 当前显示图片的http链接
        urls: that.data.allData.extra_info.imgs // 需要预览的图片http链接列表
      })
    }

  },
  uploadFile(e) {
    wx.showModal({
      title: '下载提示~',
      content: '是否下载' + e.target.dataset.filename + '文件？',
      success: (res) => {
        if (res.confirm) {
          wx.downloadFile({
            url: e.target.dataset.path, //仅为示例，并非真实的资源
            success(res) {
              console.log(res)
              if (res.statusCode === 200) {
                wx.openDocument({
                  filePath: res.tempFilePath,
                  success: function (res) {
                    console.log('打开文档成功')
                  },
                  fail: function (res) {
                    console.log(res);
                  },
                })
              }
            }
          })
        }
      }
    })
  },
  getEditMoney(e) {
    console.log(e.detail.value);
    this.setData({
      editmoney: e.detail.value
    })
  },
  editMoney() {
    this.setData({
      editShow: true
    })
  },
  cancelShow() {
    this.setData({
      editShow: false
    })
  },
  cancelOrder() {
    let that = this
    wx.showModal({
      title: '提示',
      content: '是否要取消对该订单的报价？',
      success(res) {
        if (res.confirm) {
          console.log('请求数据删除报价');
          util.request(Api.CancelBid, {
            bid_id: that.data.mybidder[0].id
          }, 'POST').then(res => {
            if (res.code == 'S_Ok') {
              wx.showToast({
                title: '取消报价成功！',
              })
              setTimeout(() => {
                wx.navigateBack()
              }, 1200)
            }
          })
        }
      }
    })
  },
  enterEdit() {
    let that = this
    console.log(that.data.editmoney);
    let editmoney = that.data.editmoney
    if (!that.isNumber(editmoney)) {
      wx.showToast({
        title: '请输入数字金额',
        icon: 'none'
      })
      that.setData({
        editmoney: ''
      })
      return
    }
    util.request(Api.UpdataBmoney, {
      bid_id: that.data.mybidder[0].id,
      price: that.data.editmoney * 100
    }, 'POST').then(res => {
      if (res.code == 'S_Ok') {
        that.data.mybidder[0].price = that.data.editmoney * 100
        that.setData({
          mybidder: that.data.mybidder,
          editShow:false
        })
        wx.showToast({
          title: '更新报价成功！',
        })
        // setTimeout(()=>{
        //   wx.navigateBack()
        // },1200)
      }
    })
  },
  isNumber(val) {
    var regPos = /^\d+(\.\d+)?$/; //非负浮点数
    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
    if (regPos.test(val) || regNeg.test(val)) {
      return true;
    } else {
      return false;
    }
  },
  // 修改上传的资料
  editZiliao() {
    let that = this
    let isedit = that.data.isEdit
    if (isedit) {
      console.log(that.data.allData);
      that.setData({
        isEdit: false,
        editTxt: '修改上传资料'
      })
      if (that.data.uploadImgs.length != 0||that.data.uploadFiles!=0) {
        wx.showLoading({
          title: '资料上传中~',
        })
        Promise.all([...that.FilesUpload(that.data.uploadImgs),...that.FilesUpload(that.data.uploadFiles,true)]).then(res => {
          wx.hideLoading()
          console.log('图片上传结果和文件上传结果',res);
          //上传完毕，把最新的文件信息保存到本地
          let confirmimgs=JSON.parse(wx.getStorageSync('confirmimgs'))
          let confirmfiles=JSON.parse(wx.getStorageSync('confirmfiles'))
          confirmimgs= confirmimgs.concat(that.data.uploadImgs)
          confirmfiles= confirmfiles.concat(that.data.uploadFiles)
          wx.setStorageSync('confirmimgs', JSON.stringify(confirmimgs))
          wx.setStorageSync('confirmfiles', JSON.stringify(confirmfiles))
          //把uploadImgs和uploadFiles置空
          that.setData({
            uploadImgs:[],
            uploadFiles:[]
          })
          //最后更新order的资料信息
          that.updataOrder()
        })
        
      }else{ //只是删除文件
        that.updataOrder()
      }

    } else {
      that.setData({
        isEdit: true,
        editTxt: '完成修改'
      })
    }
  },
  addConImg() {
    let that = this
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log(res)
        let imgurl = res.tempFilePaths
        let imgurl2 = that.data.imgurl
        let uploadImgs = that.data.uploadImgs
        imgurl2 = imgurl2.concat(imgurl)
        uploadImgs = uploadImgs.concat(imgurl)
        that.setData({
          imgurl: imgurl2,
          uploadImgs
        })
      }
    })
  },
  // 添加文档
  addConFile() {
    let that = this
    wx.chooseMessageFile({
      count: 3,
      type: 'file',
      success(res) {
        console.log(res)
        let files = that.data.fileurl
        let uploadFiles = that.data.uploadFiles
        files = files.concat(res.tempFiles)
        uploadFiles = uploadFiles.concat(res.tempFiles)
        that.setData({
          fileurl: files,
          uploadFiles
        })
      }
    })
  },
  // 删除图片
  deleteImg(e) {
    console.log(e.currentTarget.dataset.index)
    let key = e.currentTarget.dataset.index
    let imgarr = this.data.imgurl
    let confirmimgs=JSON.parse(wx.getStorageSync('confirmimgs'))
    if(confirmimgs[key]==imgarr[key]){
      confirmimgs.splice(key,1)
    }
    console.log('confirmimgs',confirmimgs);
    
    wx.setStorageSync('confirmimgs', JSON.stringify(confirmimgs))
    imgarr.splice(key, 1)
    this.setData({
      imgurl: imgarr
    })
  },
  // 删除文档
  deletefile(e) {
    let key = e.currentTarget.dataset.index
    let files = this.data.fileurl
    let confirmfiles=JSON.parse(wx.getStorageSync('confirmfiles'))
    if(confirmfiles[key].path==files[key].path){
      confirmfiles.splice(key,1)
    }
    console.log('confirmfiles',confirmfiles);
    wx.setStorageSync('confirmfiles', JSON.stringify(confirmfiles))
    files.splice(key, 1)
    this.setData({
      fileurl: files
    })
  },
  FilesUpload(filesData, isFile = false) {
    let that = this
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
            if(isFile){
              let uploadFiles=that.data.uploadFiles
              uploadFiles[i].path=JSON.parse(data).data.urls[0]
              console.log('修改文件path');
              that.setData({
                uploadFiles
              })
            }else{
              console.log('修改图片path');
              let uploadImgs=that.data.uploadImgs
              uploadImgs[i]=JSON.parse(data).data.urls[0]
              that.setData({
                uploadImgs
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
      if (i == filesData.length - 1) {
        return allres11
      }
    }
    console.log('allres', allres11);
    if(filesData.length==0){
      return new Promise((resolve,reject)=>{
        resolve([])
      })
    }

    // })
  },
  // 更新订单信息
  updataOrder() {
    let that=this
    console.log(that.data.allData);
    let extra_info=that.data.allData.extra_info

    extra_info.confirmimgs=JSON.parse(wx.getStorageSync('confirmimgs'))
    extra_info.confirmfiles=JSON.parse(wx.getStorageSync('confirmfiles'))
    util.request(Api.UpdateOrder,{
      case_id:that.data.case_id,
      status:4,
      extra_info:JSON.stringify(extra_info)
    },'POST').then(res=>{
      if(res.code=='S_Ok'){
        wx.showToast({
          title: '资料更新完毕',
        })
      }
    })
  }
})