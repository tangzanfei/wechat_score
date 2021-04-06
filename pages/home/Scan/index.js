// pages/home/SignIn/index.js
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
    qrcode: '',
    checkResult: '',
    checkLocation: '',
    checkTime: '',
  },

  // 扫码打卡
  Scan: function () {
    var that = this;
    if (app.globalData.userInfo) {
      wx.scanCode({
        onlyFromCamera: true,
        success(res) {
          console.log(res);
          if (res.errMsg == "scanCode:ok") {
            that.setData({
              qrcode: res.result,
            });
            that.checkIn(that.data.qrcode);
          } else {
            //识别二维码失败，应该很少这个情况
          }
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

  //二维码发给服务器打卡
  checkIn: function (qrcode) {
    var _this=this;
    wx.request({
      url: app.globalData.url+'check/CheckByScanQrcode?code='+qrcode+'&sessionkey='+app.globalData.sessionKey,
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