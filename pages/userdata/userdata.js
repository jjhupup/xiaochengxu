// pages/userdata/userdata.js
const utils = require('../../utils/util.js')
const Api = require('../../config/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: wx.getStorageSync('role'),
    Navarr: [
      ['个人信息'],
      ['个人信息', '律师认证']
    ],
    region: ['广东省', '广州市', '海珠区'],
    expert: [{
        name: '债权债务',
        checked: false
      },
      {
        name: '刑事辩论',
        checked: false
      },
      {
        name: '合同纠纷',
        checked: false
      },
      {
        name: '房产纠纷',
        checked: false
      },
      {
        name: '毒品犯罪',
        checked: false
      },
      {
        name: '取保候审',
        checked: false
      },
      {
        name: '工伤赔偿',
        checked: false
      },
      {
        name: '交通事故',
        checked: false
      },
      {
        name: '家庭婚姻',
        checked: false
      },
      {
        name: '工程建筑',
        checked: false
      },
      {
        name: '法律顾问',
        checked: false
      },
      {
        name: '知识产权',
        checked: false
      },
      {
        name: '公司法',
        checked: false
      },
      {
        name: '侵权',
        checked: false
      },
      {
        name: '继承',
        checked: false
      }
    ],
    key: 0,
    userImg: '',
    zhenjianImg: '',
    uploadUserImg: '',
    uploadZjImg: '',
    userData: {},
    License_no: '',
    canClick: true,
    canUplod: true,
    id_photo: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      status: wx.getStorageSync('role')
    })
    let that = this
    utils.request(Api.GetUserData, {
      user_id: wx.getStorageSync('user_id')
    }, 'POST').then(res => {
      console.log(res)
      if (res.code == 'S_Ok') {
        let expert = that.data.expert.filter(val => {
          if (res.data.extra_profile && res.data.extra_profile.expertise_area) {
            return res.data.extra_profile.expertise_area.filter(item => {
              if (val.name == item) {
                val.checked = true
                return val
              } else {
                return val
              }
            })
          } else {
            return val
          }
        })

        that.setData({
          userData: res.data,
          expert: expert
        })
        if (res.data.extra_profile) {
          that.setData({
            regionVal: res.data.extra_profile.location,
            id_photo: res.data.extra_profile.id_photo,
            userImg: res.data.extra_profile.id_photo,
            zhenjianImg: res.data.extra_profile.license_photo
          })
        }
      }
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
  getData(e) {
    console.log(e)
    this.setData({
      key: e.currentTarget.dataset.index
    })
  },
  getRegion(e) {
    console.log(e)
    this.setData({
      region: e.detail.value
    })
  },
  addImg(e) {
    console.log(e)
    let lx = e.currentTarget.dataset.lx
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log(res)
        if (lx == 0) {
          let imgurl = res.tempFilePaths
          that.setData({
            userImg: imgurl[0]
          })
        } else {
          let imgurl = res.tempFilePaths
          // let imgurl2 = that.data.zhenjianImg
          // imgurl2 = imgurl2.concat(imgurl)
          that.setData({
            zhenjianImg: imgurl[0]
          })
        }
      }
    })
  },
  // 删除图片
  deleteImg(e) {
    this.setData({
      userImg: ''
    })
  },
  deleteZJImg() {
    this.setData({
      zhenjianImg: ''
    })
  },
  saveLawyerData(e) {
    console.log(e.detail.value, 123)
    let obj = e.detail.value
    let that = this
    if (!(/^1[3456789]\d{9}$/.test(obj.phone))) {
      wx.showToast({
        title: '请填写正确的手机号码~',
        icon: 'none'
      })
      return
    } else if (obj.expertData.length == 0) {
      wx.showToast({
        title: '请填写您擅长的领域~',
        icon: 'none'
      })
      return
    } else {
      if (that.data.canClick) {
        this.updataUserData(obj)
      }

    }
    // this.updataUserData(e.detail.value)
  },
  updataUserData(obj) {
    let that = this
    that.setData({
      canClick: false
    })
    let updata = {
      user_id: wx.getStorageSync('user_id'),
      base_info: JSON.stringify({
        real_name: obj.real_name,
        phone: obj.phone
      }),
      extra_profile: JSON.stringify({
        office: obj.office,
        location: obj.location,
        expertise_area: obj.expertData,
        experience_year: obj.experience_year,
        introduction: obj.introduction,
        office_address: obj.office_address
      })
    }
    utils.request(Api.UpDataUserData, {
      ...updata
    }, 'POST').then(res => {
      console.log(res)
      if (res.code == 'S_Ok') {
        wx.showToast({
          title: '信息修改成功~',
        })
        that.setData({
          canClick: true
        })
        // setTimeout(() => {
        //   wx.navigateBack()
        // }, 1200)
      }
    })
  },
  subQuestion(e) {
    console.log(e.detail.value)
    let that = this
    let real_name = e.detail.value.real_name
    let phone=e.detail.value.phone
    let qqnum=e.detail.value.qqnum
    if (e.detail.value.real_name = '') {
      wx.showToast({
        title: '请填写您的姓名',
        icon: 'none'
      })
    } else if (that.data.userImg == '') {
      wx.showToast({
        title: '请选择您的头像',
        icon: 'none'
      })
    } else {
      console.log(456)
      // utils.request(Api.FileUpload,)
      if (that.data.id_photo != that.data.userImg) {
        wx.showLoading({
          title: '上传中~',
        })
        wx.uploadFile({
          url: Api.FileUpload,
          header: {
            'content-type': 'multipart/form-data',
            'Authorization': 'Bearer ' + wx.getStorageSync('token')
          },
          filePath: that.data.userImg,
          name: 'files',
          success(res) {
            console.log('files', res)
            wx.hideLoading()
            let data = res.data
            data = JSON.parse(data)
            that.setData({
              uploadImgs: data.data.urls[0]
            })
            let updata = {
              user_id: wx.getStorageSync('user_id'),
              base_info: JSON.stringify({
                real_name: real_name,
                phone:phone
              }),
              extra_profile: JSON.stringify({
                id_photo: data.data.urls[0],
                qqnum:qqnum
              })
            }
            utils.request(Api.UpDataUserData, updata, "POST").then(res => {
              console.log(res)
              if (res.code == 'S_Ok') {
                wx.showToast({
                  title: '修改成功',
                })
              }
            })
          }
        })
      }else{
        let updata = {
          user_id: wx.getStorageSync('user_id'),
          base_info: JSON.stringify({
            real_name: real_name,
            phone:phone
          }),
          extra_profile: JSON.stringify({
            qqnum:qqnum
          })
        }
        utils.request(Api.UpDataUserData, updata, "POST").then(res => {
          console.log(res)
          if (res.code == 'S_Ok') {
            wx.showToast({
              title: '修改成功',
            })
          }
        })
      }

    }

  },
  getLicense_no(e) {
    console.log(e.detail.value)
    this.setData({
      License_no: e.detail.value
    })
  },
  tongzhi() {
    wx.requestSubscribeMessage({
      tmplIds: ['_uZ9yGSNAit3ler7kga7AfhH6TmuEjQ9wkKSKUgyL8s'],
      success(res) {
        console.log(res)
      },
      fail(err) {
        console.log(err)
      }
    })
  },
  attestLawyer() {

    let that = this
    console.log(444, that.data.License_no, that.data.userImg, that.data.zhenjianImg)
    if (!that.data.canUplod) {
      wx.showToast({
        title: '已经提交申请认证，请等待认证结果',
        icon: 'none'
      })
      return
    }

    if (that.data.License_no == '') {
      wx.showToast({
        title: '请输入您的律师执业编号！',
        icon: 'none'
      })
      return
    }
    if (that.data.userImg == '') {
      wx.showToast({
        title: '选择您的免冠照片！',
        icon: 'none'
      })
      return
    }
    if (that.data.zhenjianImg == '') {
      wx.showToast({
        title: '选择您的律师证件照片！',
        icon: 'none'
      })
      return
    }
    that.tongzhi()
    wx.showModal({
      title: '提示',
      content: '确认无误后即将提交~',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '图片上传中~',
          })
          let upload1 = new Promise((reslove, reject) => {
            wx.uploadFile({
              url: Api.FileUpload,
              header: {
                'content-type': 'multipart/form-data',
                'Authorization': 'Bearer ' + wx.getStorageSync('token')
              },
              filePath: that.data.userImg,
              name: 'files',
              success(res) {
                console.log('files', res)
                let data = res.data
                data = JSON.parse(data)
                that.setData({
                  uploadUserImg: data.data.urls[0]
                })
                reslove(data.data.urls[0])
              },
              fail(err) {
                console.log(err)
                reject(err)
              }
            })
          })
          let upload2 = new Promise((reslove, reject) => {
            wx.uploadFile({
              url: Api.FileUpload,
              header: {
                'content-type': 'multipart/form-data',
                'Authorization': 'Bearer ' + wx.getStorageSync('token')
              },
              filePath: that.data.zhenjianImg,
              name: 'files',
              success(res) {
                console.log('files', res)
                let data = res.data
                data = JSON.parse(data)
                that.setData({
                  uploadZjImg: data.data.urls[0]
                })
                reslove(data.data.urls[0])
              },
              fail(err) {
                console.log(err)
                reject(err)
              }
            })
          })
          Promise.all([upload1, upload2]).then(allres => {
            console.log('allres', allres)

            wx.hideLoading()
            let updata = {
              user_id: wx.getStorageSync('user_id'),
              base_info: JSON.stringify({
                verify_status: 2
              }),
              extra_profile: JSON.stringify({
                id_photo: that.data.uploadUserImg,
                license_photo: that.data.uploadZjImg,
                license_no: that.data.License_no
              })
            }
            utils.request(Api.UpDataUserData, updata, "POST").then(res => {
              if (res) {
                console.log(res)
                wx.showToast({
                  title: '认证信息已提交',
                })
                that.setData({
                  canUplod: false
                })

              }
            })
          }).catch((err) => {
            console.log('err', err)
            wx.hideLoading()
            wx.showToast({
              title: '上传出错，请重试',
              icon: 'none'
            })
          })
        }
      }
    })
  }
})