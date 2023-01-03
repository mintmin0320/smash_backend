const mongoose = require('mongoose')
const { Schema } = mongoose;

const commentSchema = new Schema({
  body: {
    type: String,
  },
  userId: {
    type: String,
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
  },
  date: {
    type: String,
  }
}, {
  versionKey: false,
})

module.exports = mongoose.model('comment', commentSchema)