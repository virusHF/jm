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
    await db.collection('ads').add({
      data: {
        openId: OPENID,
        isFinished: event.isFinished,
        createTime: new Date().getTime()
      }
    })
    return {
      code: 1,
    }
  } catch (e) {
    return {
      message: e.message,
      code: 0,
    }
  }
}