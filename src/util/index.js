const successTip = (data = {}, message = '成功') => ({
  errcode: 0,
  data,
  message,
})
/**
 * 响应返回错误数据
 * @param {*} message 错误提示
 * @param {*} errcode 错误代码 101 字段校验错误 ,201 token无效
 */
const errorTip = (message, errcode = 101) => ({
  errcode,
  data: null,
  message,
})
const removeMiddleKey = (obj) => {
  const keys = Object.keys(obj)
  // eslint-disable-next-line no-restricted-syntax
  for (const key of keys) {
    if (key.startsWith('_')) {
      // eslint-disable-next-line no-param-reassign
      delete obj[key]
    }
  }
  return obj
}
module.exports = {
  successTip,
  errorTip,
  removeMiddleKey,
}
