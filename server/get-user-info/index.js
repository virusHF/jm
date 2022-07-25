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
    const user = await db.collection('users').where({
      _openid: OPENID
    }).get()

    if (user.data.length) {
      return {
        'code': 1,
        'user': user.data[0],
      }
    } else {
      return {
        'code': 0,
        'msg': 'this user not exist'
      }
    }
  } catch (e) {
    return {
      message: e.message,
      code: 0,
    }
  }
}