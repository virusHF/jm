// eslint-disable-next-line no-unused-vars
const regeneratorRuntime = require('../../libs/runtime')
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';

const {
  search
} = require('../../utils/service')

const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    searchKey: '',
    data: [],
    showEmpty: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(option) {
    const searchKey = option.key

    this.setData({
      searchKey
    })

    this.search()
  },

  onSearch() {
    this.search();
  },

  onChange(e) {
    this.setData({
      searchKey: e.detail,
    });
  },

  onShareAppMessage() {
    let title = ''
    let path = ''
    let imageUrl = ''
    if (!this.data.showEmpty) {
      title = '看我梦见' + this.data.searchKey + '预示着什么'
      path = '/pages/dream/index?key=' + this.data.searchKey
    } else {
      title = '梦，是窥探内心的一面隐秘之镜，是另一种虚幻却真实的人生体验。'
      path = '/pages/index/index'
      imageUrl = '../../images/share_bg.png'
    }

    return {
      title: title,
      path: path,
      imageUrl: imageUrl,
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
    let title = ''
    let path = ''
    let imageUrl = ''
    if (!this.data.showEmpty) {
      title = '看我梦见' +  this.data.searchKey + '预示着什么'
      path = '/pages/dream/index?key=' +  this.data.searchKey
    } else {
      title = '梦，是窥探内心的一面隐秘之镜，是另一种虚幻却真实的人生体验。'
      path = '/pages/index/index'
      imageUrl = '../../images/share_bg.png'
    }

    return {
      title: title,
      path: path,
      imageUrl: imageUrl,
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

  onShare(e) {

  },

  async favorite() {
    const result = await wx.cloud.callFunction({
      name: 'add-favorite',
      data: {
        tag: this.data.searchKey
      }
    })
    console.log(result)
    if (result.result['code'] == 1) {
      Toast.success("收藏成功")
    } else {
      Toast.success("已存在该收藏")
    }
  },

  async onFavorite(e) {
    if (app.globalData.userInfo) {
      this.favorite();
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
      this.favorite();
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
    }
  },

  search() {
    if (!this.data.searchKey) {
      return
    }
    search(this.data.searchKey).then(response => {
      console.log(response)
      if (response.status === 0 && response.result.list) {
        this.setData({
          data: response.result.list,
          showEmpty: false
        })
      } else {
        this.setData({
          data: [],
          showEmpty: true
        })
      }
    })
  }
})