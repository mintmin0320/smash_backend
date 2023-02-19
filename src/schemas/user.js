const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = new Schema({
  // _id 부분은 기본적으로 생략. 알아서 Object.id를 넣어줌
  userId: {
    type: String,
    // notnull이나 유니크 인덱스 같은건 원래 몽고디비에는 해당 설정이 없음. 
    // 몽구스에서 sql처럼 표현하기 위해 추가된 것!
    // required: true, // null 여부
    unique: true, // 유니크 여부 중복 불가
  },
  userPw: {
    type: String, // Int32가 아니다. 기본 자바스크립트에는 존재하지 않으니 넘버로 해줘야 한다.
    // required: true,
  },
  profileImg: {
    type: String
  },
  fileName: {
    type: String
  },
  role: {        // 관리자 구분 
    type: Number,
    default: 0, // 따로 입력 안 하면 0
  },
  match: {
    type: String,
  },
}, {
  versionKey: false,
});

userSchema.pre("save", function (next) {
  const user = this;
  if (user.isModified('userPw')) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.userPw, salt, function (err, hash) {
        if (err) return next(err);
        user.userPw = hash
        next()
      })
    })
  } else {
    next();
  }
});

module.exports = mongoose.model('User', userSchema);


