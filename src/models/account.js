/**
 * 账户
 */
const mongoose = require('mongoose')
const moment = require('moment')

const { Schema, model } = mongoose
const { ObjectId } = mongoose.Types
const accountSchema = new Schema(
  {
    userid: {
      type: ObjectId,
      ref: 'User',
      required: [true, 'userid 不能为空'],
    },
    accountType: {
      // 账户类型
      type: Number, // 0 现金 1 支付宝 2 微信 3 信用卡
    },
    name: {
      // 账户名称
      type: String,
      required: [true, '账户名不能为空！'],
    },
    total: {
      // 账户总额
      type: Number,
      default: 0,
    },
    createAt: {
      type: Date,
      default: Date.now,
      get: v => moment(v).format('YYYY-MM-DD HH:mm'),
    },
    __v: {
      select: false,
    },
  },
  {
    toObject: { virtuals: true, getters: true },
    toJSON: { virtuals: true, getters: true },
  },
)

const AccountSchema = model('Account', accountSchema)

module.exports = AccountSchema
