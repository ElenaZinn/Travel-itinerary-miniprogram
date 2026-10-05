const { DESTINATIONS } = require('../../data/mock')

Page({
  data: {
    statusBarHeight: 0,
    activeTab: 'available',
    availableList: [],
    soonList: []
  },

  onShow() {
    const sysInfo = wx.getWindowInfo ? wx.getWindowInfo() : wx.getSystemInfoSync()
    const availableList = []
    const soonList = []
    DESTINATIONS.forEach((d) => {
      const row = { id: d.id, name: d.name, flags: d.flags, disabled: !d.available }
      if (d.available) availableList.push(row)
      else soonList.push(row)
    })
    this.setData({ statusBarHeight: sysInfo.statusBarHeight || 0, availableList, soonList })
  },

  switchTab(e) {
    const tab = e.currentTarget.dataset.tab
    if (tab && tab !== this.data.activeTab) this.setData({ activeTab: tab })
  },

  selectDestination(e) {
    const { id, disabled } = e.currentTarget.dataset
    if (disabled) {
      wx.showToast({ title: 'Coming soon', icon: 'none' })
      return
    }
    wx.setStorageSync('selectedDestinationId', id)
    wx.switchTab({ url: '/pages/home/home' })
  },

  onShareAppMessage() { return {} },
  onShareTimeline() { return {} }
})
