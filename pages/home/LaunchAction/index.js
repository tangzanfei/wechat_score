// pages/home/LaunchAction/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    array: ['组织部会议室', '翡翠湾'],
    objectArray: [
      {
        id: 0,
        name: '组织部会议室'
      },
      {
        id: 1,
        name: '翡翠湾'
      },
      {
        id: 2,
        name: '凯旋城'
      },
    ],
    index: 0,
    begindate: '2021-02-22',
    enddate: '2021-02-23',
  },
  bindKeyInput:function(e){
    this.setData({
      title: e.detail.value
    })
  },
  bindPickerChange: function (e) {
    console.log('打卡点选择', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindbeginDateChange: function (e) {
    console.log('起始时间为', e.detail.value)

    this.setData({
      begindate: e.detail.value,
    })
  },
  bindendDateChange: function (e) {
    console.log('终止时间为', e.detail.value)
    this.setData({
      enddate: e.detail.value
    })
  },

  // 提交活动
  OnSubmit: function () {
    var that = this;
    var url = app.globalData.url + 'admin/LanchAction';
    var pointid=this.data.objectArray[this.data.index]._id;
    wx.request({
      url: url,
      method: 'POST',
      data: JSON.stringify({
        Session: app.globalData.sessionKey,
        BeginTime: that.data.begindate,
        EndTime: that.data.enddate,
        Title: that.data.title,
        PointID: pointid,
      }),
      success: function (result) {
        if (result.statusCode==200) {
          var resultdata = result.data;
          if (resultdata.Code == 0) {
            wx.showToast({
              title: '发起成功',
            })
          }
        } else {
          wx.showToast({
            title: '发起失败:'+result.statusCode,
          })
        }
      },
      fail: function (re) {
        console.log(re);
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var url = app.globalData.url + 'admin/GetPointList?session=' + app.globalData.sessionKey;
    wx.request({
      url: url,
      method: 'GET',
      success: function (result) {
        var resultdata = result.data;
        if (resultdata.Code == 0) {
          var arr = resultdata.Data.map(x => { return x._name });
          that.setData({
            objectArray: resultdata.Data,
            array: arr
          })
        }
      },
      fail: function (re) {
        console.log(re);
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