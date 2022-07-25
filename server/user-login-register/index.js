const cloud = require('wx-server-sdk')
cloud.init()
// 云函数入口函数
exports.main = async (event) => {
  const {
    OPENID,
    APPID
  } = cloud.getWXContext()

  const db = cloud.database()
  const userInfo = event.user
  const user = await db.collection('users').where({
    _openid: OPENID
  }).get()

  if (user.data.length) {
    await db.collection('users').where({
      _openid: OPENID
    }).update({
      data: {
        nickName: userInfo.nickName,
        gender: userInfo.gender
      }
    })
    return {
      message: 'login success',
      code: 1
    }
  } else {
    await db.collection('users').add({
      data: {
        _openid: OPENID,
        nickName: userInfo.nickName,
        gender: userInfo.gender,
        avatarUrl: userInfo.avatarUrl,
        createTime: new Date().getTime()
      }
    })
    return {
      message: 'register success',
      code: 1
    }
  }
}
