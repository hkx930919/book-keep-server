const mongoose = require('mongoose')
const moment = require('moment')

const { Schema, model } = mongoose

const userSchema = new Schema(
  {
    phone: {
      type: Number,
      validate: {
        validator(val) {
          return /^1[2-9]\d{9}/.test(val)
        },
        message: '手机号码格式不正确',
      },
    }, // 手机号
    email: String, // 邮箱
    nickName: String, // 昵称
    sex: Number, // 性别 0 男 1 女
    introduction: Number, // 简介
    monthDay: Date, // 生日
    password: String, // 密码
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

const User = model('User', userSchema)

module.exports = User
