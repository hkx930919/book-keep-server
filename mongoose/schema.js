const mongoose = require('mongoose')
const { MONGODB_URL, DATA_BASE } = require('../setting')

mongoose.connect(`${MONGODB_URL}/${DATA_BASE}`, { useNewUrlParser: true })
const { connection, Schema, model } = mongoose
connection.once('open', () => {
  console.log('连接成功')
})

/**
 * schema
 */
// 1 methods方法
const blogSchema = new Schema(
  {
    name: String,
    title: String,
    author: String,
    date: {
      type: Date,
      default: new Date(),
    },
    comments: [
      {
        content: String,
        date: {
          type: Date,
          default: new Date(),
        },
      },
    ],
  },
  { timestamps: true },
)
/**
 * ! 在methods和statics定义的方法不要用箭头函数，不然this指向错误
 */
// 1.1 在methods中的方法，this执行实例化的document
blogSchema.methods.findSimilarAuthor = function findSimilarAuthor() {
  return this.model('Blog').find({ author: this.author })
}

// 2 statics方法 this指向model

blogSchema.statics.findByTitle = function findByTitle(title) {
  return this.find({ title: new RegExp(title, 'i') })
}
/**
 * 3 虚拟值 scheme.virtual 设置get和set，也不能用箭头函数
 * 虚拟值不能用于查询和字段选择，因为虚拟值不储存于 MongoDB。
 */
// 3.1 get
blogSchema.virtual('info').get(function () {
  return this.name + this.title
})
// 3.2 get set 修改document的字段
blogSchema
  .virtual('info')
  .get(function () {
    return this.name + this.title
  })
  .set(function (val) {
    const [name, title] = val.split(' ')
    this.name = name
    this.title = title
  })
const Blog = model('Blog', blogSchema)
const hkxBlog = new Blog({
  name: 'hkx1',
  title: '测试1',
  author: 'hkx1',
  comments: [
    {
      content: '评论',
    },
  ],
})
hkxBlog.save((err, data) => {
  console.log(err, data)
})
// const data = hkxBlog.findSimilarAuthor()
// data.then((res) => {
//   console.log('res', res)
// })
console.log('info----------', hkxBlog.info)
console.log('info set----------', (hkxBlog.info = 'h 这是blog'))
console.log('hkxBlog', hkxBlog)
// console.log('hkxBlog object', hkxBlog)
