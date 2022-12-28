const mongoose = require('mongoose')
const { Schema } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
  },
  body: {
    type: String,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  versionKey: false,
})

module.exports = mongoose.model('post', postSchema)