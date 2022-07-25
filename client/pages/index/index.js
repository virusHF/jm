// eslint-disable-next-line no-unused-vars
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
import {
  category
} from '../../utils/service';
const regeneratorRuntime = require('../../libs/runtime')
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    searchKey: '',
    tabActive: 0,
    userInfo: {},
    listData: [{
        type: 1,
        name: "人物",
        icon: "/images/ic_people.png",
      },
      {
        type: 2,
        name: "动物",
        icon: "/images/ic_animal.png",
      },
      {
        type: 3,
        name: "植物",
        icon: "/images/ic_botany.png",
      },
      {
        type: 4,
        name: "物品",
        icon: "/images/ic_goods.png",
      },
      {
        type: 5,
        name: "活动",
        icon: "/images/ic_activity.png",
      },
      {
        type: 6,
        name: "生活",
        icon: "/images/ic_live.png",
      },
      {
        type: 7,
        name: "自然",
        icon: "/images/ic_natural.png",
      },
      {
        type: 8,
        name: "鬼神",
        icon: "/images/ic_ghost.png",
      },
      {
        type: 9,
        name: "建筑",
        icon: "/images/ic_place.png",
      },
      {
        type: 100,
        name: "其他",
        icon: "/images/ic_other.png",
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(option) {
    const result = await wx.cloud.callFunction({
      name: 'get-appkey',
    })
    console.log(result)
    if (result.result['code'] == 1) {
      app.globalData.appkey = result.result['keys']
    }
  },

  onShareTimeline() {

  },

  onShareAppMessage() {

  },

  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  onChangeTab(event) {
    this.setData({
      active: event.detail
    });
  },

  onChange(e) {
    this.setData({
      searchKey: e.detail,
    });
  },
  
  onSearch() {
    wx.navigateTo({
      url: `/pages/dream/index?key=${this.data.searchKey}`,
    })
  },

  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0,
      })
    }
  },
})