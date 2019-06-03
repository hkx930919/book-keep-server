/**
 * token机制
 * 概述：头部+载荷＋签名
 * 1 生成头部 {"alg": "HS256",//所使用的签名算法"typ": "JWT"}
 * 2 生成Payload
 *               {
 *                该JWT的签发者
 *                "iss": "luffy",
 *                 这个JWT是什么时候签发的
 *                "iat":1441593502,
 *                什么时候过期，这是一个时间戳
 *                "exp": 1441594722,
 *                 接收JWT的一方
 *                "aud":"www.youdao.com",
 *                 JWT所面向的用户
 *                "sub":"any@126.com",
 *                 上面是JWT标准定义的一些字段，除此之外还可以私人定义一些字段
 *                "form_user": "fsdfds"
 *                }
 *
 * 3 生成签名
 */
const crypto = require('crypto')
const { errorTip } = require('./index')

const secret = 'hkx.test.com'
const header = {
  alg: 'HS256',
  typ: 'JWT',
}

const token = {
  /**
   *
   * @param {Object} obj {userid}
   * @param {Number} timeout 过期时间
   */
  createToken(obj, timeout = 60 * 60 * 24 * 7) {
    const payLoad = {
      data: obj, // payload
      created: parseInt(Date.now() / 1000, 10), // token生成的时间的，单位秒
      exp: parseInt(timeout), // token有效期
    }
    // payload信息
    const headerBase64Str = Buffer.from(JSON.stringify(header), 'utf8').toString('base64')
    const payloadBase64Str = Buffer.from(JSON.stringify(payLoad), 'utf8').toString('base64')

    // 添加签名，防篡改

    const hash = crypto.createHmac('sha256', secret)
    hash.update(payloadBase64Str)
    const signature = hash.digest('base64')
    console.log('&&&&&&&&&&&&', `${headerBase64Str}.${payloadBase64Str}.${signature}`)

    return `${headerBase64Str}.${payloadBase64Str}.${signature}`
  },
  decodeToken(tokenVal) {
    if (!tokenVal) {
      return false
    }
    const decArr = tokenVal.split('.')
    if (decArr.length < 3) {
      // token不合法
      return false
    }

    let payload = {}
    // 将payload json字符串 解析为对象
    try {
      payload = JSON.parse(Buffer.from(decArr[1], 'base64').toString('utf8'))
    } catch (e) {
      return false
    }

    // 检验签名
    const hash = crypto.createHmac('sha256', secret)
    hash.update(decArr[1])
    const checkSignature = hash.digest('base64')

    return {
      payload,
      signature: decArr[2],
      checkSignature,
    }
  },
  /**
   * 解析token的值
   */
  getPayLoad(tokenVal) {
    const resDecode = this.decodeToken(tokenVal)
    if (!resDecode) {
      return false
    }
    const { data } = resDecode.payload
    return data
  },
  checkToken(tokenVal) {
    console.log('-------------this', this)

    const resDecode = this.decodeToken(tokenVal)
    if (!resDecode) {
      return false
    }

    // 是否过期
    const expState = !(
      parseInt(Date.now() / 1000) - parseInt(resDecode.payload.created)
      > parseInt(resDecode.payload.exp)
    )
    if (resDecode.signature === resDecode.checkSignature && expState) {
      return true
    }

    return false
  },
}

const middleToken = (white = []) => (req, res, next) => {
  if (white.includes(req.path)) {
    next()
    return
  }

  const Authorization = req.get('Authorization')
  if (!token.checkToken(Authorization)) {
    res.json(errorTip('token校验失败', 201))
    return
  }
  next()
}
module.exports = {
  token,
  middleToken,
}
