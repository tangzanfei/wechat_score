// pages/home/SignIn/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
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

    // 扫码打卡
    Scan: function () {
      var that = this;
      if (app.globalData.userInfo) {
        wx.scanCode({
          onlyFromCamera: true,
          success(res) {
            console.log(res);
            that.setData({
              qrcode: res.result,
            });
            // that.checkIn();
          }
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
    
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  }
})