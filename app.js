//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        var that = this;
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res);
        this.globalData.code=res.code;
        var url=this.globalData.url+'Login/PostCode?code='+res.code;
        console.log(url);
        wx.request({
          url: url,
          method: 'POST',
          success:function(result){
            var resultdata=result.data;
            if(resultdata.Code==0){
              that.globalData.openIdKey=resultdata.Data.OpenIdKey;
              that.globalData.sessionKey=resultdata.Data.SessionKey;
              that.globalData.isAdmin=resultdata.Data.IsAdmin
            }
        },
        fail:function(re){
          console.log(re);
        }
      })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

  globalData: {
    userInfo: null,
    // url: 'http://192.168.0.100/api/',
    // url: 'https://localhost:44354/api/',
    url: 'https://partyscore.tangzanfei.cn/api/',
    code:'',
    openIdKey:'',
    sessionKey:'',
    username:'游客',
    branch:'暂无党组织',
    isAdmin:true,
  }
})