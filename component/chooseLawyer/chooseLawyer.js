// component/chooseLawyer/chooseLawyer.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    orderData:Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    orderData:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    paymoney(e) {
      console.log(e.currentTarget.dataset)
      let openid = e.currentTarget.dataset.lawyeropenid
      let price = e.currentTarget.dataset.price
      let case_id = e.currentTarget.dataset.case_id
      wx.navigateTo({
        url: '/pages/customer/paymoney/paymoney?openid=' + openid + '&price=' + price + '&case_id=' + case_id,
      })
    },
    golawyerData(e) {
      console.log(e)
      let openid = e.currentTarget.dataset.uid
      wx.navigateTo({
        url: '/pages/personal/personal?openid=' + openid
      })
    }
  }
})
