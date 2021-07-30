const cookieName = '海底捞'
const signurlKey = 'signurl_hdl'
const signheaderKey = 'signheader_hdl'
const signbodyKey = 'signbody_hdl'
const hdl = init()

let isGetCookie = typeof $request !== 'undefined'

if (isGetCookie) {
   getcookie()
} else {
   sign()
}

function getcookie() {
  if ($request && $request.method == 'POST') {
      const signurlVal = $request.url
      const signheaderVal = JSON.stringify($request.headers)
      const signbodyVal = $request.body
  
      if (signurlVal) hdl.setdata(signurlVal, signurlKey)
      if (signheaderVal) hdl.setdata(signheaderVal, signheaderKey)
      if (signbodyVal) hdl.setdata(signbodyVal, signbodyKey)
       hdl.msg(cookieName, `获取Cookie: 成功, 请禁用该脚本`, ``)
   }
   hdl.done()
}
   
function sign() {
  const signurlVal = hdl.getdata(signurlKey)
  const signheaderVal = hdl.getdata(signheaderKey)
  const signbodyVal = hdl.getdata(signbodyKey)
  const url = { url: signurlVal, headers: JSON.parse(signheaderVal), body: signbodyVal }
  hdl.post(url, (error, response, data) => {
    hdl.log(`${cookieName}, data: ${data}`)
    const title = `${cookieName}`
    let subTitle = ''
    let detail = ''
    const result = JSON.parse(data)
    if (result.success == true && result.signInfoVO.todaySigned == true) {
      subTitle = `签到结果: 成功`
      detail = `签到奖励: ${result.customInfo.foodNum}火柴, 连签: ${result.signInfoVO.continueDay}天`
    } else if (result.success == false && result.signInfoVO.todaySigned == true) {
      subTitle = `签到结果: 成功 (重复签到)`
      detail = `连签: ${result.signInfoVO.continueDay}天`
    } else {
      subTitle = `签到结果: 失败`
      detail = `说明: ${result.message}, 请重新获取`
    }
    hdl.msg(title, subTitle, detail)
    hdl.done()
  })
}

function init() {
  isSurge = () => {
    return undefined === true
  }
  isQuanX = () => {
    return undefined === this.$task ? false : true
  }
  getdata = (key) => {
    if (true) return $persistentStore.read(key)
   
  setdata = (key, val) => {
    if (true) return $persistentStore.write(key, val)
   
  }
  msg = (title, subtitle, body) => {
    if (true) $notification.post(title, subtitle, body)
  
  }
  log = (message) => console.log(message)
  get = (url, cb) => {
    if (true) {
      $httpClient.get(url, cb)
    }
  
   
  }
  post = (url, cb) => {
    if (true) {
      $httpClient.post(url, cb)
    }
    
    }
  }
  put = (url, cb) => {
    if (true)) {
      $httpClient.put(url, cb)
    }
    
  }
  done = (value = {}) => {
    $done(value)
  }
  return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, put, done }
}
