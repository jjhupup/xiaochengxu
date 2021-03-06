// component/lawyerData/lawyerData.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    userData: Object,
    status: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    userData: {},
    caseid: 0,
    status: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    golawyerData(e) {
      console.log(e)
      let userid = e.currentTarget.dataset.userid
      let price = e.currentTarget.dataset.price
      let case_id = e.currentTarget.dataset.case_id
      wx.navigateTo({
        url: '/pages/personal/personal?userid=' + userid
      })
    },
    shensu() {
      this.triggerEvent('parent', '子组件的数据')
    },
    quxiaoshensu() {
      this.triggerEvent('qxshensu', '子组件的数据')
    },
    call() {
      let that=this
      wx.showModal({
        title: '拨号提示',
        content: '是否拨打号码'+that.data.userData.phone+'？',
        success: (res => {
          if (res.confirm) {
            wx.makePhoneCall({
              phoneNumber: that.data.userData.phone //仅为示例，并非真实的电话号码
            })
          }
        })
      })
    }
  }
})