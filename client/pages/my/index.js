// eslint-disable-next-line no-unused-vars
const regeneratorRuntime = require('../../libs/runtime')
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';

const app = getApp()
let videoAd = null

Page({
  /**
   * 页面的初始数据
   */
  data: {
    nickName: '未登录',
    userId: '',
    avatarUrl: '/images/default_avatar.jpg',
    showInvite: false,
    teams: [],
    version: ''
  },

  async onLoad() {
    if (app.globalData.userInfo) {
      this.setData({
        nickName: app.globalData.userInfo.nickName,
        avatarUrl: app.globalData.userInfo.avatarUrl,
        userId: app.globalData.userInfo._id.substring(0, 8)
      })
    }

    let accountInfo = wx.getAccountInfoSync();
    this.setData({
      version: accountInfo.miniProgram.version
    })
  },

  onShareAppMessage() {
    return {
      title: "梦，是窥探内心的一面隐秘之镜，是另一种虚幻却真实的人生体验。",
      path: '/pages/index/index',
      imageUrl: '../../images/share_bg.png',
      success: function (res) {
        if (res.errMsg == 'shareAppMessage:ok') {
          Toast.success("分享成功")
        }
      },
      fail: function (res) {
        console.log(res)
        Toast.success("分享失败")
        if (res.errMsg == 'shareAppMessage:fail cancel') {} else if (res.errMsg == 'shareAppMessage:fail') {}
      },
    }
  },


  onShareTimeline() {
    return {
      title: "梦，是窥探内心的一面隐秘之镜，是另一种虚幻却真实的人生体验。",
      path: '/pages/index/index',
      imageUrl: '../../images/share_bg.png',
      success: function (res) {
        if (res.errMsg == 'shareAppMessage:ok') {
          Toast.success("分享成功")
        }
      },
      fail: function (res) {
        console.log(res)
        Toast.success("分享失败")
        if (res.errMsg == 'shareAppMessage:fail cancel') {} else if (res.errMsg == 'shareAppMessage:fail') {}
      },
    }
  },

  onHelp() {
    wx.navigateTo({
      url: '/pages/help/index',
    })
    console.log('onHelp')
  },

  onFavorite() {
    if (app.globalData.userInfo) {
      wx.navigateTo({
        url: '/pages/tag/index?type=-1&title=收藏',
      })
    } else {
      wx.getUserProfile({
        desc: '用于完善用户资料',
        success: (res) => {
          this.loginOrRegister(res.userInfo)
        },
        fail: (res) => {
          Toast.fail("获取用户信息失败")
          console.log(res)
        }
      })
    }
  },

  onFeedback() {
    wx.navigateTo({
      url: '/pages/feedback/index',
    })
    console.log('onFeedback')
  },

  onSetting() {
    wx.navigateTo({
      url: '/pages/setting/index',
    })
    console.log('onSetting')
  },

  onAbout() {
    wx.navigateTo({
      url: '/pages/about/index',
    })
    console.log('onAbout')
  },

  login() {
    if (app.globalData.userInfo) {
      return
    }
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: (res) => {
        this.loginOrRegister(res.userInfo)
      },
      fail: (res) => {
        Toast.fail("获取用户信息失败")
        console.log(res)
      }
    })
  },

  async loginOrRegister(userInfo) {
    wx.showLoading({
      title: '正在获取',
    })
    try {
      const result = await wx.cloud.callFunction({
        name: 'user-login-register',
        data: {
          user: {
            nickName: userInfo.nickName,
            avatarUrl: userInfo.avatarUrl,
            gender: userInfo.gender
          }
        }
      })
      await this.getUserInfo()
      wx.hideLoading()
      wx.navigateBack({
        delta: 1,
      })
    } catch (err) {
      this.setData(needLogin, true)
      console.log(err)
      wx.hideLoading()
      wx.showToast({
        title: '登录失败',
        icon: 'none'
      })
    }
  },

  async getUserInfo() {
    const result = await wx.cloud.callFunction({
      name: 'get-user-info'
    })
    if (result.result['code'] == 1) {
      app.globalData.userInfo = result.result.user
      wx.setStorageSync('userInfo', result.result.user);
      this.setData({
        nickName: app.globalData.userInfo.nickName,
        avatarUrl: app.globalData.userInfo.avatarUrl,
        userId: app.globalData.userInfo._id.substring(0, 8)
      })
    }
  },

  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2,
      })
    }
  },
})