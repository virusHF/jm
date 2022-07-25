// eslint-disable-next-line no-unused-vars
const regeneratorRuntime = require('../../libs/runtime')
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';

const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    feedback: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad() {},

  inputFeedback(e) {
    this.setData({
      feedback: e.detail.value
    })
  },

  async commit() {
    if (!this.data.feedback) {
      Toast.fail("内容不能为空")
      return
    }

    wx.showLoading({
      title: '提交中',
    })
    await wx.cloud.callFunction({
      name: 'feedback',
      data: {
        userId: app.globalData.userInfo._id ? "" : -1,
        content: this.data.feedback
      }
    })
    wx.hideLoading()
    Toast.success('提交成功')
    setTimeout(function () {
      wx.navigateBack({
        delta: 1,
      })
    }, 2000)

  }
})