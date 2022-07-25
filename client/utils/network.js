export const API_ROOT = "https://api.jisuapi.com/dream/";
export const get = (url, data, headers) => request('GET', url, data, headers);

export const post = (url, data, headers) => request('POST', url, data, headers);

export const put = (url, data, headers) => request('PUT', url, data, headers);

export const del = (url, data, headers) => request('DELETE', url, data, headers);

const CODE_SUCCESS = 200
const SERVICE_ERROR = -1
const OHTER_ERROR = -2

export function request(method, url, data, header = {
  'Content-Type': 'application/json',
}) {
  console.group('==============>新请求<==============');
  console.info(method, url);
  const app = getApp()
  if (app.globalData.userInfo) {
    header.token = app.globalData.userInfo.token
  }

  if (data) console.info('参数：', data);
  return new Promise((resolve, reject) => {
    url = API_ROOT + url
    wx.request({
      url,
      method,
      data,
      header,
      success: (res) => {
        resolve(res.data)
      },
      fail: (error) => {
        reject({
          code: OHTER_ERROR, msg: error
        })
      }
    });
  });
}