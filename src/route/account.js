/**
 * 账户
 */
const express = require('express')
const Account = require('../models/account')
const { successTip, errorTip } = require('../util/index')
const { token } = require('../util/token')

const router = express.Router()
// 增
router.post('/addAccount', (req, res) => {
  const { userid } = token.getPayLoad(req.get('Authorization'))
  const account = { ...req.body, userid }
  const user = new Account(account)
  user.save((err, data) => {
    if (err) {
      res.json(errorTip(err.message))
      return
    }
    res.json(successTip(data))
  })
})

// 查
router.get('/getAccount', (req, res) => {
  const { userid } = token.getPayLoad(req.get('Authorization'))
  //   Account.find({ userid })
  //     .populate('userid')
  //     .exec((err, docs) => {
  //       if (err) {
  //         res.json(errorTip(err.message))
  //         return
  //       }
  //       res.json(successTip(docs))
  //     })
  Account.find({ userid }, ' -userid', (err, docs) => {
    if (err) {
      res.json(errorTip(err.message))
      return
    }
    res.json(successTip(docs))
  })
})

module.exports = router
