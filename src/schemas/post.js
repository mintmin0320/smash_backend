const mongoose = require('mongoose')
const { Schema } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "users",
    index: true,
    required: true,
  },
}, {
  versionKey: false,
})

module.exports = mongoose.model('post', postSchema)