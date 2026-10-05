App({
  globalData: {
    userInfo: null,
    version: 'demo'
  },

  onLaunch() {
    this.ensureLocalUserId()
  },

  ensureLocalUserId() {
    let uid = wx.getStorageSync('demoUserId')
    if (!uid) {
      uid = 'demo_' + Date.now().toString(36)
      wx.setStorageSync('demoUserId', uid)
    }
  }
})
