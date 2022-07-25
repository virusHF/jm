import {
  get,
  post,
  put,
  del
} from './network';
export const search = (keyword) => {

  let appkeys = getApp().globalData.appkey
  console.log(appkeys)

  if (!appkeys) {
    console.log('use default appKey')
    appkeys = [
      'key1',  //极速api注册的key
      'key2'
    ]
  }

  let index = Math.floor(Math.random() * appkeys.length);

  let appkey = appkeys[index]

  return get(`/search`, {
    appkey: appkey,
    pagenum: 1,
    pagesize: 100,
    keyword: keyword
  });
}