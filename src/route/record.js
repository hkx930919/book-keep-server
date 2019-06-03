/**
 * 交易记录
 */
const express = require('express')
const Record = require('../models/record')
const { successTip, errorTip } = require('../util/index')
const { token } = require('../util/token')

const router = express.Router()

router.post('/addRecord', (req, res) => {
  const { userid } = token.getPayLoad(req.get('Authorization'))
  const record = new Record({ userid, ...req.body })
  record.save((err, data) => {
    if (err) {
      res.json(errorTip(err.message))
      return
    }
    // const { phone, id } = data.toJSON()
    res.json(successTip(data))
  })
})

router.get('/getRecord', (req, res) => {
  const { userid } = token.getPayLoad(req.get('Authorization'))
  Record.find({ userid })
    .select('-userid')
    .populate('account', '-userid')
    .exec((err, docs) => {
      if (err) {
        res.json(errorTip(err.message))
        return
      }
      res.json(successTip(docs))
    })
})

module.exports = router
