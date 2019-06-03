import datas from './../../datas/lessons.js';

Page({
  data: {
    activeIndex: 0,
    dayName: ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    datas: [],
  },
  onLoad: function() {
    this.getData();
  },
  getData: function() {
    let oneDayTimestamp = 24*60*60*1000;
    let todayTimestamp = Date.now();
    let Arr = new Array(7).fill([]);
    Arr = Arr.map((data,index) => {
      let timestamp = todayTimestamp + oneDayTimestamp * index;
      let result = this.formate(timestamp);
      result.day_display = this.data.dayName[result.day];
      result.lessons = datas[result.day];
      return result;
    })
    this.setData({ datas: Arr });
  },
  formate: function(timestamp) {
    let data = new Date(timestamp);
    let month = this.formatNumber(data.getMonth() + 1);
    let date = this.formatNumber(data.getDate());
    let day = data.getDay();
    return {
      day,
      date: `${month}.${date}`,
    }
  },
  formatNumber: function(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  },
  handleCheckout: function(e) {
    let activeIndex = e.currentTarget.dataset.index;
    this.setData({ activeIndex })
  },
  onShareAppMessage: function (res) {
    return {
      title: '健身课程表',
      path: '/pages/index/index'
    }
  }
})
