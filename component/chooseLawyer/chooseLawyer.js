
// component/chooseLawyer/chooseLawyer.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    orderData: Array,
    caseid: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    orderData: [],
    caseid: 0
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
      wx.redirectTo({
        url: '/pages/personal/personal?userid=' + userid + '&price=' + price + '&case_id=' + case_id
      })
    }
  }
})