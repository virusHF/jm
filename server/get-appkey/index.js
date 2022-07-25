const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event) => {
  const db = cloud.database()

  const {
    OPENID,
    APPID
  } = cloud.getWXContext()

  console.log(event)

  try {
    const appKeys = await db.collection('appkey').get()

    if (appKeys.data.length) {
      return {
        'code': 1,
        'keys': appKeys.data[0].list,
      }
    } else {
      return {
        'code': 0,
        'msg': 'this type not exist'
      }
    }
  } catch (e) {
    return {
      message: e.message,
      code: 0,
    }
  }
}