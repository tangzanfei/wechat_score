// pages/mine/detail/detail.js
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

  // 展开折叠
    selectedFlag: [false, false, false, false],
  },
   // 展开折叠选择  
   changeToggle:function(e){
    var index = e.currentTarget.dataset.index;
    if (this.data.selectedFlag[index]){
      this.data.selectedFlag[index] = false;
    }else{
      this.data.selectedFlag[index] = true;
    }

    this.setData({
      selectedFlag: this.data.selectedFlag
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