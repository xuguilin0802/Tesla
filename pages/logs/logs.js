Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    password:''
  },
  phoneInput:function(e){
    this.setData({
      phone:e.detail.value
    })
  },
  passwordInput:function(e){
    this.setData({
      password:e.detail.value
    })
  },
  login:function(){
    if(this.data.phone.length == 0||this.data.password.length == 0){
      wx.showToast({
        title: '用户名和密码不能为空',
        icon:'loading',
        duration:2000
      })
    }else if(this.data.phone=='201711040127'&&this.data.password=='123456'){
      wx.showToast({
        title: '登陆成功',
        icon:'success',
        duration:2000,  
      }, wx.navigateBack({
        delta: 2
      }))
    }else{
      wx.showToast({
        title: '密码错误',
        icon:'false',
        duration:2000
      })
    }
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