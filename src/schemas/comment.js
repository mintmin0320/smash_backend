const mongoose = require('mongoose')
const { Schema } = mongoose;

const commentSchema = new Schema({
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

module.exports = mongoose.model('comment', commentSchema)