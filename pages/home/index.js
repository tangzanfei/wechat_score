//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    wifissid: '未检测到wifi',
    wifiBssid: '',
    qrcode: '',
    checkResult: '打卡成功',
    checkLocation: '组织部主题党日打卡点',
    checkTime: '2020年10月14日15:43:16',
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  // 扫码打卡
  Scan: function () {
    var that = this;
    if (app.globalData.userInfo) {
      wx.navigateTo({
        url: '/pages/home/SignIn/index',
      });
    } else {
      wx.switchTab({
        url: '/pages/mine/index',
      });
      wx.showToast({
        title: '请先登录',
      })
    }
  },

  // 更新wifi
  getWifiInfo: function () {
    var that = this;
    wx.startWifi({
      success(res) {
        console.log(res.errMsg, 'wifi初始化成功')
      },
      fail: function (res) {
        console.log(res.errMsg, 'wifi初始化失败')
      }
    });
    wx.getConnectedWifi({
      success: function (e) {
        wx.showToast({
          title: '获取wifi成功',
          icon: 'success'
        });
        console.log(e.wifi.BSSID);
        that.setData({
          wifissid: e.wifi.SSID,
          wifiBssid: e.wifi.BSSID
        })
      },
      fail: res => {
        console.log(res);
        switch (res.errCode) {
          case 12005:
            that.setData({
              wifissid: "请先打开手机的wifi开关"
            });
            break;
          case 12006:
            that.setData({
              wifissid: "请先打开手机的“位置信息”开关"
            });
            break;
        }
      }
    })
  },



})
