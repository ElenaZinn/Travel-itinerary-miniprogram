const { DESTINATIONS, ITINERARIES } = require('../../data/mock')

const WEEK = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December']

function pad(n) { return String(n).padStart(2, '0') }
function ymd(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) }
function addDays(str, delta) {
  const p = String(str).split('-').map(Number)
  const d = new Date(p[0], p[1] - 1, p[2] + delta)
  return ymd(d)
}

/** Build the 42-cell grid of a month, including the trailing days of adjacent months */
function monthGrid(year, month) {
  const first = new Date(year, month, 1)
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const prevDays = new Date(year, month, 0).getDate()
  const cells = []
  for (let i = first.getDay() - 1; i >= 0; i--) {
    cells.push({ day: prevDays - i, inMonth: false, date: ymd(new Date(year, month - 1, prevDays - i)) })
  }
  for (let i = 1; i <= daysInMonth; i++) {
    cells.push({ day: i, inMonth: true, date: ymd(new Date(year, month, i)) })
  }
  let n = 1
  while (cells.length < 42) {
    cells.push({ day: n, inMonth: false, date: ymd(new Date(year, month + 1, n)) })
    n++
  }
  return cells
}

/** Flatten an itinerary into stops: the date of day N is anchor + (N - 1) */
function flatten(itinerary) {
  const out = []
  ;(itinerary.days || []).forEach((d) => {
    d.stops.forEach((s, i) => {
      out.push({
        id: 'd' + d.day + '-' + i,
        day: d.day,
        dayLabel: d.label,
        title: s.title,
        location: s.location,
        date: addDays(itinerary.anchor, d.day - 1)
      })
    })
  })
  return out
}

Page({
  data: {
    statusBarHeight: 0,
    destinationName: 'Sample Destination',
    week: WEEK,
    dayTabs: [],
    activeDay: '',
    listEvents: [],
    months: [],
    monthIndex: 0,
    currentMonth: null,
    cellsLayout: [],
    loading: true
  },

  onShow() {
    const sysInfo = wx.getWindowInfo ? wx.getWindowInfo() : wx.getSystemInfoSync()
    const picked = wx.getStorageSync('selectedDestinationId')
    const dest = DESTINATIONS.filter((d) => d.available && d.id === picked)[0] ||
      DESTINATIONS.filter((d) => d.available)[0]
    const itinerary = ITINERARIES[dest.id]

    this.events = flatten(itinerary)

    // Only list the months that actually contain stops, same as the production app
    const months = []
    const seen = {}
    this.events.forEach((e) => {
      const p = e.date.split('-').map(Number)
      const key = p[0] + '-' + p[1]
      if (seen[key]) return
      seen[key] = true
      months.push({ year: p[0], month: p[1] - 1, name: MONTH_NAMES[p[1] - 1] })
    })
    months.sort((a, b) => a.year - b.year || a.month - b.month)

    const dayTabs = []
    const daySeen = {}
    this.events.forEach((e) => {
      if (!daySeen[e.day]) {
        daySeen[e.day] = true
        dayTabs.push({ day: e.day, label: e.dayLabel })
      }
    })

    this.setData({
      statusBarHeight: sysInfo.statusBarHeight || 0,
      destinationName: dest.name,
      months,
      monthIndex: 0,
      dayTabs,
      activeDay: dayTabs.length ? dayTabs[0].day : '',
      loading: false
    })
    this.rebuildMonth()
    this.rebuildList()
  },

  prevMonth() {
    const i = Math.max(0, this.data.monthIndex - 1)
    this.setData({ monthIndex: i })
    this.rebuildMonth()
  },

  nextMonth() {
    const i = Math.min(this.data.months.length - 1, this.data.monthIndex + 1)
    this.setData({ monthIndex: i })
    this.rebuildMonth()
  },

  rebuildMonth() {
    const m = this.data.months[this.data.monthIndex]
    if (!m) {
      this.setData({ currentMonth: null, cellsLayout: [] })
      return
    }
    const cells = monthGrid(m.year, m.month)
    const byDate = {}
    this.events.forEach((e) => {
      if (!byDate[e.date]) byDate[e.date] = []
      byDate[e.date].push(e.title)
    })
    const cellsLayout = []
    for (let r = 0; r < 6; r++) {
      cellsLayout.push(cells.slice(r * 7, r * 7 + 7).map((c) => Object.assign({}, c, {
        titles: (byDate[c.date] || []).slice(0, 2),
        hasEvent: !!byDate[c.date]
      })))
    }
    this.setData({ currentMonth: m, cellsLayout })
  },

  switchDay(e) {
    this.setData({ activeDay: Number(e.currentTarget.dataset.day) })
    this.rebuildList()
  },

  rebuildList() {
    this.setData({ listEvents: this.events.filter((e) => e.day === this.data.activeDay) })
  },

  onShareAppMessage() { return {} },
  onShareTimeline() { return {} }
})
