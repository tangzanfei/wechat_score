// pages/mine/detail/detail.js
//获取应用实例
const app = getApp()
var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list01: [
      { item_id: "9月13日 三会一课缺签 -10" }, { item_id: "9月19日 主题党日缺签 -10" }, { item_id: "9月23日 三会一课缺签 -10" },
    ],
    list02: [
      { item_id: "9月3日 凯旋城 +10" }, { item_id: "9月30日 翡翠湾社区 +10" },
    ],
    list03: [
      { item_id: "9月10日 郴州日报投稿 +10" },
    ],
    list04: [
      { item_id: 11 }, { item_id: 11 }, { item_id: 11 }
    ],

    isNoBAction: true,
    totalScore: 60,
    BaScore: 30,
    usualScore: 20,
    bonusScore: 10,
    // 展开折叠
    selectedFlag: [false, false, false, false],

  },
  // 展开折叠选择  
  changeToggle: function (e) {
    var index = e.currentTarget.dataset.index;
    if (this.data.selectedFlag[index]) {
      this.data.selectedFlag[index] = false;
    } else {
      this.data.selectedFlag[index] = true;
    }

    this.setData({
      selectedFlag: this.data.selectedFlag
    })
  },
  // 获取志愿服务打卡数据
  GetUsualScoreData: function () {
    var _this = this;
    var url = app.globalData.url + 'score/GetThisMounthSignData?sessionkey=' + app.globalData.sessionKey;
    console.log(url);
    wx.request({
      url: url,
      method: 'GET',
      success: function (result) {
        var resultdata = result.data;
        if (resultdata.Code == 0) {
          var list = resultdata.Data;
          var datalist = [];
          for (let index = 0; index < list.length; index++) {
            const data = list[index];
            let date = util.formatTime(data.CheckTime);
            // dateFormat(data.CheckTime,"yyyy-mm-dd HH:MM:ss");
            var item = { item_id: date + " " + data.CheckPoint + " +10" };
            datalist.push(item);
          }
          _this.setData({ list02: datalist });
        } else {
          if (resultdata.Code == 2) {
            //本月无志愿打卡记录
            _this.setData({
              list02: [],
            });
          }
        }
        _this.RefreshScore();
      },
      fail: function (re) {
        console.log(re);
      }
    });
  },
  // 获取日常履职未打卡数据
  GetUnsignActionData: function () {
    var _this = this;
    var url = app.globalData.url + 'Score/UnSignBA_Data?sessionkey=' + app.globalData.sessionKey;
    console.log(url);
    wx.request({
      url: url,
      method: 'GET',
      success: function (result) {
        var resultdata = result.data;
        if (resultdata.Code == 0) {
          var list = resultdata.Data;
          var datalist = [];
          for (let index = 0; index < list.length; index++) {
            const data = list[index];
            let date = util.formatTime(data.CheckTime);
            // dateFormat(data.CheckTime,"yyyy-mm-dd HH:MM:ss");
            var item = { item_id: date + " " + data.CheckPoint + "缺签 -10" };
            datalist.push(item);
          }
          _this.setData({ list01: datalist });
        } else {
          if (resultdata.Code == 2) {
            //本月无支部活动
            _this.setData({
              list01: [{ item_id: "本月无支部活动，默认满分" }],
              isNoBAction: true,
            });

          }
        }

        _this.RefreshScore();
      },
      fail: function (re) {
        console.log(re);
      }
    });
  },
  RefreshScore: function () {
    var _this = this;
    var s, s_1, s_2, s_3 = 0;
    s_1 = _this.data.list01.length * 10;
    s_2 = _this.data.list02.length * 10;
    s_3 = _this.data.list03.length * 10;
    if (s_1 > 60) {
      s_1 = 60;
    }
    if (s_2 > 20) {
      s_2 = 20;
    }
    if (s_3 > 20) {
      s_3 = 20;
    }
    if (_this.data.isNoBAction) {
      //如果本月无支部活动，默认第一项不扣分
      s_1 = 0;
    }
    s = 60 - s_1;//日常履职做减法，缺签一次－10分
    s += s_2 + s_3;
    _this.setData({
      totalScore: s,
      BaScore: 60 - s_1,
      usualScore: s_2,
      bonusScore: s_3
    });

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
    var that = this;
    that.GetUsualScoreData();
    that.GetUnsignActionData();
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