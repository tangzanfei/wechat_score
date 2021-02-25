// pages/home/Wifi/index.js
const app = getApp()
var util = require('../../../utils/util.js');

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
    checkResult: '',
    checkLocation: '',
    checkTime: '',
  },

  // 扫码打卡
  Scan: function () {
    if (app.globalData.userInfo) {
      this.checkIn();
    } else {
      wx.switchTab({
        url: '/pages/mine/index',
      });
      wx.showToast({
        title: '请先登录',
      })
    }
  },

  //二维码发给服务器打卡
  checkIn: function () {
    var _this=this;
    wx.request({
      url: app.globalData.url+'check/CheckByWifi?wifiMac='+_this.data.wifiBssid+'&sessionkey='+app.globalData.sessionKey,
      method: 'POST',
      success:function(res){
        var result=res.data;
        if (result.Code==0) {
          let  date = util.formatTime(result.Data.CheckTime);
          _this.setData({
            checkResult:result.Msg,
            checkLocation:result.Data.CheckPoint ,
            checkTime:date,
          })
        }
        else{
          _this.setData({
            checkResult:result.Msg,
            checkLocation:"" ,
            checkTime:"",
          })
        }
      },
      fail:function(err){

      }
    })
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
              wifissid: "wifi未打开"
            });
            wx.showToast({
              title: '请打开wifi并连接打卡点wifi',
              icon: 'none'
            });
            break;
          case 12006:
            that.setData({
              wifissid: "“位置信息”开关未打开"
            });
            wx.showToast({
              title: '请打开定位',
              icon: 'none'
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