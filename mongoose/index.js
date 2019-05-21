const mongoose = require('mongoose')
const { MONGODB_URL, DATA_BASE } = require('../setting')

const { Schema, model } = mongoose
mongoose.connect(`${MONGODB_URL}/${DATA_BASE}`, { useNewUrlParser: true })

const db = mongoose.connection
db.once('open', () => {
  console.log('连接成功')
})
// 创建schema 定义字段
const personSchema = new Schema({
  name: String,
  age: Number,
  sex: Number, // 0：男 1：女
})
// Schema定义的方法会再model的原型上
personSchema.methods = {
  say() {
    console.log(`my name is ${this.name}`)
  },
}
// 定义的statics在model的静态方法中，this执行model
personSchema.statics.findName = function findName() {
  console.log('执行了findName方法')
}

// 创建model
const Person = model('Person', personSchema)
Person.prototype.info = function info() {
  console.log(`i am ${this.name},my age is ${this.age}`)
}

const tom = new Person({ name: 'tom', age: 19, sex: '0' })
console.log('tom', tom) // tom { _id: 5cde13f2c060b0a96cd7cb66, name: 'tom', age: 19, sex: 0 }
tom.say()
tom.info()

tom.save()
Person.findName()
