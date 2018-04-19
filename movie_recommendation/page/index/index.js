// page/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieList:[{
      movieName:"肖申克的救赎",
      movieImg:"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg",
      movieEvaluate:"希望让人自由。",
      recommend:true,
      id: 1292052,
    }, {
      movieName: "霸王别姬",
      movieImg: "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p1910813120.jpg",
      movieEvaluate: "风华绝代。",
      recommend: false,
      id: 1291546,
      }, {
        movieName: "这个杀手不太冷",
        movieImg: "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p511118051.jpg",
        movieEvaluate: "怪蜀黍和小萝莉不得不说的故事。",
        recommend: true,
        id: 1295644,
    }, {
      movieName: "阿甘正传",
      movieImg: "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p510876377.jpg",
      movieEvaluate: "一部美国近现代史。",
      recommend: false,
      id: 1292720,
      }, {
        movieName: "美丽人生",
        movieImg: "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p510861873.jpg",
        movieEvaluate: "最美的谎言。",
        recommend: true,
        id: 1292063,
      },],
      // current:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(this.data.movieList.length)
    this.setData({
      currentIndex:this.data.movieList.length-1
    })
  },

  f0:function(e){
    this.setData({
      currentIndex:this.data.movieList.length-1
    })
  },

  f1:function(e){
    // console.log(e.currentTarget)
    var mid = e.currentTarget.dataset.movieId
    wx.navigateTo({
      url: '/page/detail/detail?mid=' + mid,
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