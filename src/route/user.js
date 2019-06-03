/**
 * 用户路由
 */
const express = require('express')
const User = require('../models/user')
const { successTip, errorTip } = require('../util/index')
const { token } = require('../util/token')

const router = express.Router()

router.post('/register', (req, res) => {
  const user = new User(req.body)
  user.save((err, data) => {
    if (err) {
      res.json(errorTip(err.message))
      return
    }
    // const responseData = Object.assign(data, { authorize: createToken('hkx') })
    const { phone, id } = data.toJSON()
    res.json(successTip({ authorize: token.createToken({ userid: id }), phone }))
  })
})

module.exports = router
