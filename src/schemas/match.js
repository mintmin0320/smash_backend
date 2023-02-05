const mongoose = require('mongoose')
const { Schema } = mongoose;

const matchSchema = new Schema({
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
  date: {
    type: String,
  },
  count: {
    type: String,
  },
  category: {
    type: String,
  },
  latitude: {
    type: String,
  },
  longitude: {
    type: String,
  }
}, {
  versionKey: false,
})

module.exports = mongoose.model('match', matchSchema)