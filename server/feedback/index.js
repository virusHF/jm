const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event) => {
  const db = cloud.database()

  userId = event.name
  content = event.content
  try {
      const ret = await db.collection('feedback').add({
        data: {
          userId: userId,
          content: content,
          createTime: new Date().getTime()
        }
      })
      return {
        'code': 1,
        'teamId': ret._id
      }
  } catch (e) {
    return {
      message: e.message,
      code: 0,
    }
  }
}