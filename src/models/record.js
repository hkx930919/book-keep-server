/**
 * 记账记录
 */
const mongoose = require('mongoose')
const moment = require('moment')

const { Schema, model } = mongoose
const { ObjectId } = mongoose.Types
const recordSchema = new Schema(
  {
    userid: {
      type: ObjectId,
      ref: 'User',
      required: [true, '用户id不能为空！'],
    },
    transaction: {
      // 交易类型
      type: Number, // 0支出，1 收入，2 转账
      required: [true, '交易类型不能为空！'],
    },
    account: {
      type: ObjectId,
      ref: 'Account',
      required: [true, '账户不能为空！'],
    },
    amount: {
      // 记账金额
      type: Number,
      required: [true, '金额不能为空！'],
    },
    note: {
      // 备注
      type: String,
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

const Record = model('Record', recordSchema)

module.exports = Record
