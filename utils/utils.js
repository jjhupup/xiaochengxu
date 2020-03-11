let formatDate = (nDate, date) => {
  if (isNaN(nDate.getTime())) {
    // 不是时间格式
    return '--'
  }
  let o = {
    'M+': nDate.getMonth() + 1,
    'd+': nDate.getDate(),
    'h+': nDate.getHours(),
    'm+': nDate.getMinutes(),
    's+': nDate.getSeconds(),
    // 季度
    'q+': Math.floor((nDate.getMonth() + 3) / 3),
    'S': nDate.getMilliseconds()
  }
  if (/(y+)/.test(date)) {
    date = date.replace(RegExp.$1, (nDate.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(date)) {
      date = date.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return date
}


// type = 1 post 原创文章, type = 2 article 分享文章（entry）
let toPostDetail = (e) => {
  let item = e.currentTarget.dataset.item
  let postId = getPostIdByOriginalUrl(item.originalUrl)
  let entryId = item.objectId
  let t = item.type
  let url = ''
  let id = t === 'post' ? postId : entryId
  url = `/pages/post/post?id=${id}&type=${t}`
  wx.navigateTo({
    url,
  })
}

module.exports = {
  formatDate,
  toPostDetail,
}