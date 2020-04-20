var api = require('../config/api.js')

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
/**
 * 封封微信的的request
 */
 // if(method=='GET'){
    //   contentType = 'application/json'
    // }else{
    //   contentType = 'application/x-www-form-urlencoded'
    // }
function request(url, data = {}, method = "GET") {
  return new Promise(function(resolve, reject) {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+wx.getStorageSync('token')
      },
      success: function(res) {
        console.log("success",res);

        if (res.statusCode == 200) {

          if (res.data.errno == 401) {
            //需要登录后才可以操作

            let code = null;
            return login().then((res) => {
              code = res.code;
              return getUserInfo();
            }).then((userInfo) => {
              //登录远程服务器
              request(api.AuthLoginByWeixin, {
                code: code,
                userInfo: userInfo
              }, 'POST').then(res => {
                if (res.errno === 0) {
                  //存储用户信息
                  wx.setStorageSync('userInfo', res.data.userInfo);
                  wx.setStorageSync('token', res.data.token);

                  resolve(res);
                } else {
                  reject(res);
                }
              }).catch((err) => {
                reject(err);
              });
            }).catch((err) => {
              reject(err);
            })
          } else {
            resolve(res.data);
          }
        } else {
          reject(res.errMsg);
        }

      },
      fail: function(err) {
        reject(err)
        console.log("failed",err)
      }
    })
  });
}
// 微信登录获取code
function login() {
  return new Promise(function(resolve, reject) {
    wx.login({
      success: function(res) {
        console.log(res)
        if (res.code) {
          resolve(res.code);
        } else {
          reject(res);
        }
      },
      fail: function(err) {
        reject(err);
      }
    });
  });
}

/**
 * 封装微信的的showModal api
 */
function showModal() {
  wx.showModal({
    title: '提示',
    content: '是否提交问题？',
    success(res) {
      if (res.confirm) {
        console.log('用户点击确定')
        console.log('提交数据', that.data.questionContext)
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
}

function switchTimeFormat(time) {
  const dateTime = new Date(time)
  const year = dateTime.getFullYear()
  const month = dateTime.getMonth() + 1
  const date = dateTime.getDate()
  // const hour = dateTime.getHours()
  // const minute = dateTime.getMinutes()
  // const second = dateTime.getSeconds()
  // console.log(year,month,date,hour,minute,second)
  return (year + '年' + addZero(month) + '月' + addZero(date) + '日')
}

function addZero(v) {
  return v < 10 ? '0' + v : v
}

module.exports = {
  switchTimeFormat,
  formatTime,
  request,
  showModal,
  login
}