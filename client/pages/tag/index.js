// eslint-disable-next-line no-unused-vars
const regeneratorRuntime = require('../../libs/runtime')

const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    tags: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(option) {
    const type = option.type
    const title = option.title

    wx.setNavigationBarTitle({
      title: title,
    })

    if (type == -1) {
      const result = await wx.cloud.callFunction({
        name: 'get-favorite',
      })
      if (result.result['code'] == 1) {
        this.setData({
          tags: result.result['tags']
        })
      }
    } else {
      const result = await wx.cloud.callFunction({
        name: 'get_dream_tag',
        data: {
          type: parseInt(type)
        }
      })
      if (result.result['code'] == 1) {
        this.setData({
          tags: result.result['tags']
        })
      }
    }
  },

  click(e) {
    const key = e.currentTarget.dataset['key']
    wx.navigateTo({
      url: `/pages/dream/index?key=${key}`,
    })
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
})