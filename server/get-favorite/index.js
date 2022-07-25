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
      _openid: OPENID
    }).get()

    if (tags.data.length) {
      let temp = []
      tags.data.forEach(item=>{
        temp.push(item.tag)
      })
      return {
        'code': 1,
        'tags': temp,
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