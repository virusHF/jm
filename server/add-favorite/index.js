const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event) => {
  const db = cloud.database()

  const {
    OPENID,
    APPID
  } = cloud.getWXContext()

  try {
    const tags = await db.collection('favorite').where({
      _openid: OPENID,
      tag: event.tag
    }).get()

    if (tags.data.length) {
      return {
        message: 'favorite failed',
        code: 0
      }
    } else {
      await db.collection('favorite').add({
        data: {
          _openid: OPENID,
          tag: event.tag,
          createTime: new Date().getTime()
        }
      })
      return {
        message: 'favorite success',
        code: 1
      }
    }

  } catch (e) {
    return {
      message: e.message,
      code: 0,
    }
  }
}