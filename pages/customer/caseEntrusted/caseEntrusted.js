// pages/caseEntrusted/caseEntrusted.js
const Api=require('../../../config/api.js')
const utils=require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    anJianArray1: ['请选择...','民事代理', '商事纠纷', '刑事辩护', '行政诉讼'],
    status:['请选择...','原告(申请人)','被告(被申请人)','上诉人','被上诉人','第三人'],
    index1:0,
    diweiIndex:0,
    jieduanIndex:0,
    leixin1:0,
    leixin2:0,
    anJianArray2:[],
    stage: ['请选择...','一审','二审','再审','执行','仲裁','复议'],
    regionVal: ['广东省', '广州市', '天河区'],
    regionVal2: ['广东省', '广州市', '天河区'],
    real_name:'',
    case_id:'',
    gender:0,
    btnTxt:'开始匹配律师',
    isedit:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.edit){
      this.setData({
        case_id:options.case_id,
        isedit:true,
        btnTxt:'确认修改'
      })
      this.getOrderdata(options.case_id)
    }
  },
  getOrderdata(id){
    let that=this
    utils.request(Api.GetOrderDetail,{
      case_id:id
    },"POST").then(res=>{
      console.log(res)
      if(res.code=='S_Ok'){
       let alldata=res.data.extra_info
        that.setData({
          real_name:alldata.real_name,
          gender:alldata.gender,
          DetailTxt:alldata.DetailTxt,
          regionVal:alldata.GXdi,
          regionVal2:alldata.fiedWhere
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getRegion(e){
    console.log(e)
    this.setData({
      regionVal: e.detail.value
    })
  },
  getRegion2(e){
    this.setData({
      regionVal2: e.detail.value
    })
  },
  getAnJianType(e){
    console.log(e)
    this.setData({
      leixin1:e.detail.value
    })
  },
  getAnJianData(e){
    console.log(e.detail.value)
    let obj = e.detail.value
    let that=this
    if (!obj.real_name){
      wx.showToast({
        title: '请填写您的姓名',
        icon:'none'
      })
    }else if(obj.SJmoney=='true'&&obj.ZYmoney==''){
      wx.showToast({
        title: '请填写受争议的金额~',
        icon: 'none'
      })
    } else if (this.data.leixin1 == 0 || this.data.diweiIndex == 0 || this.data.jieduanIndex==0){
      wx.showToast({
        title: '请选择相关案件信息~',
        icon: 'none'
      })
    } else if (obj.DetailTxt==''||obj.DetailTxt.length<10){
      wx.showToast({
        title: '请详细填写案倾简介~',
        icon: 'none'
      })
    }else{
      //提交数据
      wx.requestSubscribeMessage({
        tmplIds: ['okc6i2NLrkY6LGEK-eW6w5xqplqb5nbmNM3b2kwjZrU'],
        success(res) {
          console.log(res)
        }
      })
      if(!that.data.isedit){
        wx.showModal({
          title: '提交数据提示',
          content: '确认无误后，即可提交委托信息~',
          success(res){
            if(res.confirm){
              that.tijiaoData(obj)
            }
          }
        })
      }else{
        wx.showModal({
          title: '修改数据提示',
          content: '确认无误后，即可修改委托信息~',
          success(res){
            if(res.confirm){
              that.tijiaoData(obj)
            }
          }
        })
      }
     
      
    }
  },
  Diwei(e){
    this.setData({
      diweiIndex: e.detail.value
    })
  },
  JieDuan(e){
    this.setData({
      jieduanIndex: e.detail.value
    })
  },
  tijiaoData(obj){
    let that=this
    if(!that.data.isedit){
      utils.request(Api.OrderPublish,{
        customer_id:wx.getStorageSync('user_id'),
        case_type:2,
        extra_info:JSON.stringify(obj)
      },'POST').then(res=>{
        console.log(res)
        if(res.code=='S_Ok'){
          wx.showModal({
            title: '提示',
            content: '案件委托提交成功~',
            success:()=>{
              wx.switchTab({
                url: '/pages/index/index',
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