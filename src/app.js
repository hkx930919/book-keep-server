const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const userRoute = require('./route/user')
const accountRoute = require('./route/account')
const recordRoute = require('./route/record')

const { middleToken } = require('./util/token')
require('./models/db.js')

const app = express()

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// 验证token中间件
app.use(middleToken(['/user/register', '/user/login']))

app.use('/user', userRoute)
app.use('/account', accountRoute)
app.use('/record', recordRoute)

app.listen(3009)
