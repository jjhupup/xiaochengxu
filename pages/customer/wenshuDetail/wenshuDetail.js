// pages/customer/wenshuDetail/wenshuDetail.js
const util = require('../../../utils/util.js')
const Api = require('../../../config/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    case_id:0,
    allData:{},
    type:0,
    isShowComment: false,
    status:0,
    shensuTxt:'',
    editShow:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      case_id:options.id,
      type:options.type,
      status: options.status
    })
    
    console.log(123)
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
    this.getDetail(this.data.case_id)
  },
  getDetail(id){
    let that=this
    util.request(Api.GetOrderDetail,{
      case_id:id
    },"POST").then(res=>{
      console.log(res)
      if(res.code=='S_Ok'){
        that.setData({
          allData:res.data,
          desctxt:res.data.extra_info.description||res.data.extra_info.DetailTxt||res.data.extra_info.describe
        })
      }else{
        wx.showModal({
          title: '提示',
          content: '数据请求出错！',
          success(){
            wx.navigateBack()
          }
        })
      }
    })
  },
  shensu() {
    wx.requestSubscribeMessage({
      tmplIds: ['g0eCjDV_aShehwkFX2uO1GDVgs8R1c6L1_UVylMTN3Q'],
      success(res) {
        console.log(res)
      }
    })
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
  onDialogBody() { },
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
      if(res.code=='S_Ok'){
        wx.showToast({
          title: '申诉成功！',
        })
        setTimeout(()=>{
          wx.navigateBack()
        },1200)
      }
    })
  },
  quxiaoshensu(e){
    console.log(e,'取消申诉')
  },
  seeImg(e){
    let that=this
    console.log(e.target.dataset.index)
    let key = e.target.dataset.index
    wx.previewImage({
      current: that.data.allData.extra_info.imgs[key], // 当前显示图片的http链接
      urls: that.data.allData.extra_info.imgs // 需要预览的图片http链接列表
    })
  },
  uploadFile(e){
    wx.showModal({
      title: '下载提示~',
      content: '是否下载'+e.target.dataset.filename+'文件？',
      success:(res)=>{
        if(res.confirm){
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
  editMoney(){
    let type=this.data.type
    if(type==3){
      wx.navigateTo({
        url: '/pages/customer/corporateLawyer/corporateLawyer?edit=true&case_id='+this.data.case_id,
      })
    }else if(type==1){
      wx.navigateTo({
        url: '/pages/customer/document/document?edit=true&case_id='+this.data.case_id+'&index1='+this.data.allData.extra_info.textType,
      })
    }else if(type==2){
      wx.navigateTo({
        url: '/pages/customer/caseEntrusted/caseEntrusted?edit=true&case_id='+this.data.case_id
      })
    }else{
      wx.navigateTo({
        url: '/pages/customer/queryBusiness/queryBusiness?edit=true&case_id='+this.data.case_id
      })
    }
   
  },
  cancelOrder(){
    let  that=this
    wx.showModal({
      title:'取消提示',
      content:'确认取消该订单的发布？',
      success(res){
        if(res.confirm){
          util.request(Api.UpdateOrder,{
            case_id:that.data.case_id,
            status:5
          },'POST').then(res=>{
            console.log('res',res);
              if(res.code=='S_Ok'){
                wx.showToast({
                  title: '取消发布成功~',
                })
                setTimeout(()=>{
                  wx.navigateBack()
                },1500)
              }else{
                wx.showToast({
                  title: '取消发布失败~',
                })
              }
          })
        }
      }
    })
    
  },
  getEditMoney(e){
    console.log(e.detail.value);
    this.setData({
      getEditMoney:e.detail.value
    })
    
  },
  //客户确认完成订单
  comfinOrder(){
    let that=this
    wx.showModal({
      title:'完成提示',
      content:'确认律师已完成该订单工作？',
      success(res){
        if(res.confirm){
          util.request(Api.ConfirmOrder,{
            out_trade_no:that.data.allData.payOrder[0].out_trade_no,
          },'POST').then(res=>{
            console.log('res',res);
            if(res.code=='S_Ok'){
              wx.showToast({
                title: '订单已确认完成~',
              })
              setTimeout(()=>{
                wx.navigateBack()
              },1200)
            }
          })
        }
      }
    })
  }
})