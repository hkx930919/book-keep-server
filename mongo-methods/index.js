/**
 * 封装mongodb的增删改查
 */
const { MongoClient } = require('mongodb')
const { MONGODB_URL, DATA_BASE } = require('../setting')

const CONNECT_OPTIONS = {
  useNewUrlParser: true,
}
async function connectDB() {
  let client
  try {
    client = await MongoClient.connect(MONGODB_URL, CONNECT_OPTIONS)
  } catch (error) {
    console.log(error)
  }
  return client
}

const find = async (collectionName, query, options = {}) => {
  let data
  const client = await connectDB()

  if (client) {
    const dataBase = client.db(DATA_BASE)
    data = await dataBase
      .collection(collectionName)
      .find(query, options)
      .toArray()
    client.close()
  }
  return data
}
const findOne = async (collectionName, query, options = {}) => {
  let data
  const client = await connectDB()

  if (client) {
    const dataBase = client.db(DATA_BASE)
    data = await dataBase.collection(collectionName).findOne(query, options)
    client.close()
  }
  return data
}
const insertOne = async (collectionName, data, options = {}) => {
  let response
  const client = await connectDB()
  if (client) {
    const dataBase = client.db(DATA_BASE)
    response = await dataBase.collection(collectionName).insertOne(data, options)
    client.close()
  }
  return response
}
const insertMany = async (collectionName, list, options = {}) => {
  let data
  const client = await connectDB()

  if (client) {
    const dataBase = client.db(DATA_BASE)
    data = await dataBase.collection(collectionName).insertMany(list, options)
    client.close()
  }
  return data
}
const updateOne = async (collectionName, filter, update) => {
  let response
  const client = await connectDB()

  if (client) {
    const dataBase = client.db(DATA_BASE)
    response = await dataBase.collection(collectionName).updateOne(filter, update)
    client.close()
  }
  return response
}
const updateMany = async (collectionName, filter, update) => {
  let data
  const client = await connectDB()

  if (client) {
    const dataBase = client.db(DATA_BASE)
    data = await dataBase.collection(collectionName).updateMany(filter, update)
    client.close()
  }
  return data
}
const deleteOne = async (collectionName, query) => {
  let response
  const client = await connectDB()

  if (client) {
    const dataBase = client.db(DATA_BASE)
    response = await dataBase.collection(collectionName).deleteOne(query)
    client.close()
  }
  return response
}
const deleteMany = async (collectionName, query) => {
  let data
  const client = await connectDB()

  if (client) {
    const dataBase = client.db(DATA_BASE)
    data = await dataBase.collection(collectionName).deleteMany(query)
    client.close()
  }
  return data
}

module.exports = {
  find,
  findOne,
  insertOne,
  insertMany,
  updateOne,
  updateMany,
  deleteOne,
  deleteMany,
}
