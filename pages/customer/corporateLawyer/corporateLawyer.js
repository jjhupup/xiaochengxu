// pages/corporateLawyer/corporateLawyer.js
const utils = require('../../../utils/util.js')
const Api = require('../../../config/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    regionVal: ['广东省', '广州市', '天河区'],
    danweiType: ['请选择单位性质', '民营企业', '国有企业', '集体企业', '外资企业', '上市公司', '事业单位', '政府机关', '其他性质'],
    wordTypeKey: 0,
    profession: ['请选择行业', '金融行业', '保险行业', '期货行业', '医疗行业', '交通运输', '矿产资源', '基金行业', '房产行业', '其他行业'],
    professionKey: 0,
    adviserType: ['请选择顾问类型', '常年法律顾问', '新三板挂牌', '公司上市', '私募基金登记', '基金设立', '债券发行', '股权激励', '投融资', '并购重组', '破产重整', '资产证券化', 'ppp', '其他专项顾问'],
    adviserKey: 0,
    real_name:'',
    desctxt:'',
    danweiName:'',
    btnTxt:'开始匹配律师',
    isedit:false,
    case_id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.edit) {
      this.setData({
        btnTxt:'确认修改',
        isedit:true,
        case_id:options.case_id
      })
      this.getDetail(options.case_id)
      
    }
  },

  getDetail(id) {
    let that = this
    utils.request(Api.GetOrderDetail, {
      case_id: id
    }, "POST").then(res => {
      console.log(res)
      if (res.code == 'S_Ok') {
        let alldata=res.data.extra_info
        that.setData({
          real_name: alldata.real_name,
          desctxt: alldata.describe,
          danweiName:alldata.danweiName
        })
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
  getDWeiType(e) {
    console.log(e)
    this.setData({
      wordTypeKey: e.detail.value
    })
  },
  getProfession(e) {
    console.log(e)
    this.setData({
      professionKey: e.detail.value
    })
  },
  getAdviser(e) {
    console.log(e)
    this.setData({
      adviserKey: e.detail.value
    })
  },
  getRegion(e) {
    console.log(e)
    this.setData({
      regionVal: e.detail.value
    })
  },
  getAllData(e) {
    console.log(e.detail.value)
    let obj = e.detail.value
    let that = this
    if (that.data.wordTypeKey == 0 || that.data.professionKey == 0 || that.data.adviserKey == 0) {
      wx.showToast({
        title: '请选择您的相关工作性质信息！',
        icon: 'none'
      })
    } else if (obj.real_name == '') {
      wx.showToast({
        title: '请填写您的姓名！',
        icon: 'none'
      })
    } else if (obj.danweiName == '') {
      wx.showToast({
        title: '请填写您的工作单位名称！',
        icon: 'none'
      })
    } else if (obj.describe == '' || obj.describe.length < 10) {
      wx.showToast({
        title: '顾问需求描述请大于10个字',
        icon: 'none'
      })
    } else {
      //提交数据
      wx.requestSubscribeMessage({
        tmplIds: ['okc6i2NLrkY6LGEK-eW6w5xqplqb5nbmNM3b2kwjZrU'],
        success(res) {
          console.log(res)
        }
      })
      wx.showModal({
        title: '提示！',
        content: '即将提交数据~',
        success(res) {
          console.log(res)
          if (res.confirm) {
            that.uploadData(obj)
          }
        }
      })
      // that.uploadData(obj)
    }
  },
  uploadData(obj) {
    let that=this
    console.log(obj);
    
    if(!this.data.isedit){
      utils.request(Api.OrderPublish, {
        customer_id: wx.getStorageSync('user_id'),
        case_type: 3,
        extra_info: JSON.stringify(obj)
      }, 'POST').then(res => {
        console.log(res)
        if (res.code == 'S_Ok') {
          wx.showModal({
            title: '提示',
            content: '订单提交成功~~',
            success() {
              wx.switchTab({
                url: '/pages/index/index',
              })
            }
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '服务器出错！',
            success() {
              wx.switchTab({
                url: 'pages/index/index',
              })
            }
          })
        }
      })
    }else{
      utils.request(Api.UpdateOrder,{
        case_id:that.data.case_id,
        extra_info:JSON.stringify(obj),
        status:0
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
  }
})