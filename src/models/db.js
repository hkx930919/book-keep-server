const mongoose = require('mongoose')
const { MONGODB_URL, DATA_BASE } = require('../../setting')

mongoose.connect(`${MONGODB_URL}/${DATA_BASE}`, { useNewUrlParser: true })
const { connection } = mongoose
connection.once('open', () => {
  console.log('连接成功')
})
module.exports = connection
