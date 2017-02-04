//index.js
// 调用本地数据
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    feed: [],
    feed_length: 0
  },

  bindItemTap: function() {

    // 跳转问答页
    wx.navigateTo({
      url: '../answer/answer'
    })
  },
  bindQueTap: function() {


    wx.navigateTo({
      url: '../question/question'
    })
  },

  onLoad: function () {
    console.log('onLoad')
    var that = this
    //获取数据
    this.refresh();
  },

  // 滑动到底部
  upper: function () {
    // 顶部显示加载动画'
    wx.showNavigationBarLoading()
    this.refresh();
    console.log("upper");
    // 两秒后，停止动画及页面刷新
    setTimeout(function(){wx.hideNavigationBarLoading();wx.stopPullDownRefresh();}, 2000);
  },

// 滑动到顶部
  lower: function (e) {
    wx.showNavigationBarLoading();
    var that = this;
    setTimeout(function(){wx.hideNavigationBarLoading();that.nextLoad();}, 1000);
    console.log("lower")
  },

  //使用本地 fake 数据实现刷新效果
  refresh: function(){
    var feed = util.getData2();
    console.log("loaddata");
    var feed_data = feed.data;
    this.setData({
      feed:feed_data,
      feed_length: feed_data.length
    });
  },

  //使用本地 fake 数据实现继续加载效果
  nextLoad: function(){
    var next = util.getNext();
    console.log("continueload");
    var next_data = next.data;
    this.setData({
      feed: this.data.feed.concat(next_data),
      feed_length: this.data.feed_length + next_data.length
    });
  }


})
