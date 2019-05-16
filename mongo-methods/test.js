const { ObjectID } = require('mongodb')
const express = require('express')
const bodyParser = require('body-parser')
const expressSession = require('express-session')
/**
 * 解析cookie 在req中添加了req.cookies获取cookie
 */
const cookieParser = require('cookie-parser')

const {
  find,
  // eslint-disable-next-line no-unused-vars
  findOne,
  // eslint-disable-next-line no-unused-vars
  insertOne,
  insertMany,
  // eslint-disable-next-line no-unused-vars
  updateOne,
  updateMany,
  deleteOne,
  // eslint-disable-next-line no-unused-vars
  deleteMany,
} = require('./index')

const app = express()
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(
  expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    name: 'hhh',
  }),
)
app.get('/', async (req, res) => {
  console.log(req.query)

  if (req.session.logion) {
    req.session.logion += 1
  } else {
    req.session.logion = 1
  }
  const data2 = [{ name: '张三', age: 19 }, { name: '李四', age: 20 }, { name: '王五', age: 21 }]
  const data = await insertMany('student2', data2)
  if (data) {
    res.status(200).send(data)
  }
})

app.get('/update', async (req, res) => {
  const filter = { name: '李四' }
  const update = { $set: { name: '李4' } }
  /**
   * 更新多条
   */
  const result2 = await updateMany('student2', filter, update)
  res.status(200).send(result2)
})

/**
 * 查找
 */
app.get('/find', async (req, res) => {
  const query = { age: 19 }
  /**
   * 查找一条
   */
  //   const result = await findOne('student2', query)
  /**
   * 查找多条
   */
  const result = await find('student2', { query })
  res.status(200).send(result)
})

/**
 * 删除
 */
app.get('/del', async (req, res) => {
  console.log('id', ObjectID('5cdb8b6f3bc1035c24f07b9b'))
  // 根据ObjectID id删除数据
  const query = { _id: ObjectID('5cdb8b6f3bc1035c24f07b9b') }
  const result = await deleteOne('student2', query)
  //   const result = await deleteMany('student2', query)
  res.status(200).send(result)
})

app.post('/json', (req, res) => {
  console.log('json', req.body)
  res.send(req.body)
})
app.post('/form', (req, res) => {
  console.log('form', req.body)
  res.send(req.body)
})
app.listen(80)
