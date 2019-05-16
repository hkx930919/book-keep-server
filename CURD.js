const { MongoClient } = require('mongodb')
const express = require('express')
const { errTip } = require('./util')

const app = express()
const DATA_BASE_URL = 'mongodb://localhost:27017'
// 插入数据
/*
insertOne(doc, options, callback){Promise} 返回的promise
promise = {
  result: { n: 1, ok: 1 },
  connection: { id: 0, host: 'localhost', port: 27017 },
  ops: [{ name: '张三', age: 19, _id: '5cdbb2981b756c6f0446af07' }],
  insertedCount: 1,
  insertedId: '5cdbb2981b756c6f0446af07',
  n: 1,
  ok: 1,
}
*/

/* 插入多条
insertMany(docs, options, callback){Promise}
promise = {
    result: { ok: 1, n: 3 },
    ops: [
      { name: '张三', age: 19, _id: '5cdbb1d02e0f1359ac0c8a9c' },
      { name: '李四', age: 20, _id: '5cdbb1d02e0f1359ac0c8a9d' },
      { name: '王五', age: 21, _id: '5cdbb1d02e0f1359ac0c8a9e' },
    ],
    insertedCount: 3,
    insertedIds: {
      0: '5cdbb1d02e0f1359ac0c8a9c',
      1: '5cdbb1d02e0f1359ac0c8a9d',
      2: '5cdbb1d02e0f1359ac0c8a9e',
    },
  }
*/
app.get('/', (req, res) => {
  MongoClient.connect(DATA_BASE_URL, { useNewUrlParser: true }, async (err, db) => {
    if (err) {
      console.log('连接失败', err)
      res.send(errTip('数据库连接失败'))
      db.close()
      return
    }
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    const dbase = db.db('test')
    // res.send(successTip('恭喜，数据库已经成功连接'))
    // const data = [{ name: '张三', age: 19 }, { name: '李四', age: 20 }, { name: '王五', age: 21 }]
    // const dataObj = { name: '张三', age: 19 }
    // const result2 = await dbase.collection('student2').insertOne(dataObj)
    // res.status(200).send(result2)
    try {
      const data = []
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < 10; i++) {
        data.push({
          age: 16 + i,
          name: '张3',
        })
      }
      const result = await dbase.collection('student2').insertMany(data)
      res.status(200).send(result)
    } catch (error) {
      res.send(error)
    }
    db.close()
  })
})
/**
 * 更新 原子操作符
 * $set 用来指定一个键并更新键值，若键不存在并创建。
 * $unset 用来删除一个键。
 * $inc 文档的某个值为数字型（只能为满足要求的数字）的键进行增减的操作。
 * $push 把value追加到field里面去，field一定要是数组类型才行，如果field不存在，会新增一个数组类型加进去。
 * $pushAll 同$push,只是一次可以追加多个值到一个数组字段内。
 * $pull 从数组field内删除一个等于value值。
 * $addToSet 增加一个值到数组内，而且只有当这个值不在数组内才增加。
 * $pop 删除数组的第一个或最后一个元素
 * $rename 修改字段名称
 * $bit 位操作，integer类型
 */
app.get('/update', (req, res) => {
  MongoClient.connect(DATA_BASE_URL, { useNewUrlParser: true }, async (err, db) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    if (err) {
      console.log('连接失败', err)
      res.send(errTip('数据库连接失败'))
      db.close()
      return
    }
    const dbase = db.db('test')
    const filter = { name: '张三' }
    const update = { $set: { name: '张3' } }
    /**
     * 更新一条
     */
    // const result = await dbase.collection('student2').updateOne(filter, update)
    // res.status(200).send(result)
    /*
    result = {
      result: { n: 1, nModified: 1, ok: 1 },
      connection: { id: 0, host: 'localhost', port: 27017 },
      modifiedCount: 1,
      upsertedId: null,
      upsertedCount: 0,
      matchedCount: 1,
      n: 1,
      nModified: 1,
      ok: 1,
    }
    */

    /**
     * 更新多条
     */
    const result2 = await dbase.collection('student2').updateMany(filter, update)
    res.status(200).send(result2)
    /*
    result2 = {
      result: { n: 20, nModified: 20, ok: 1 },
      connection: { id: 0, host: 'localhost', port: 27017 },
      modifiedCount: 20,
      upsertedId: null,
      upsertedCount: 0,
      matchedCount: 20,
      n: 20,
      nModified: 20,
      ok: 1,
    }
    */
    db.close()
  })
})

/**
 * 查找
 */
app.get('/find', (req, res) => {
  MongoClient.connect(DATA_BASE_URL, { useNewUrlParser: true }, async (err, db) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    if (err) {
      console.log('连接失败', err)
      res.send(errTip('数据库连接失败'))
      db.close()
      return
    }
    const dbase = db.db('test')
    const query = { age: 19 }
    const update = { $set: { age: 190 } }
    // const options = {
    //   skip: 0,
    //   limit: 5,
    //   // 只返回age字段
    //   projection: {
    //     age: 1,
    //   },
    // }
    /**
     * 查找一条
     */
    // const result = await dbase.collection('student2').findOne(query)
    // res.status(200).send(result)
    /*
    result = { _id: '5cdbad8a0eab485de06db2da', name: '张3', age: 19 }
    */

    /**
     * 查找多条
     */
    // const result = await dbase
    //   .collection('student2')
    //   .find(query, options)
    //   .toArray()
    // res.status(200).send(result)

    /*
    result = [
      { _id: '5cdbad8a0eab485de06db2da', name: '张3', age: 19 },
      { _id: '5cdbadb31bad827210de28de', name: '张3', age: 19 },
      { _id: '5cdbadea4c1a1d6ab8a9f211', name: '张3', age: 19 },
    ]
    */

    /**
     * 查找一条并修改
     */
    const result = await dbase.collection('student2').findOneAndUpdate(query, update)
    res.status(200).send(result)
    /*
    result = {
      lastErrorObject: { n: 1, updatedExisting: true },
      value: { _id: '5cdbad8a0eab485de06db2da', name: '张3', age: 19 },
      ok: 1,
    }
    */

    db.close()
  })
})

/**
 * 删除
 */
app.get('/del', (req, res) => {
  MongoClient.connect(DATA_BASE_URL, { useNewUrlParser: true }, async (err, db) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    if (err) {
      console.log('连接失败', err)
      res.send(errTip('数据库连接失败'))
      db.close()
      return
    }
    const dbase = db.db('test')
    const query = { name: '王五' }
    // const options = {
    //   skip: 0,
    //   limit: 5,
    //   // 只返回age字段
    //   projection: {
    //     age: 1,
    //   },
    // }
    /**
     * 删除一条
     */
    // const result = await dbase.collection('student2').deleteOne(query)
    // res.status(200).send(result)
    /*
    result = {
      result: { n: 1, ok: 1 },
      connection: { id: 0, host: 'localhost', port: 27017 },
      deletedCount: 1,
      n: 1,
      ok: 1,
    }
    */

    /**
     * 删除多条
     */
    const result = await dbase.collection('student2').deleteMany(query)
    res.status(200).send(result)

    db.close()
  })
})

app.listen(80)
