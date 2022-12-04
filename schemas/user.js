const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
  // _id 부분은 기본적으로 생략. 알아서 Object.id를 넣어줌
  name: {
    type: String,
    // notnull이나 유니크 인덱스 같은건 원래 몽고디비에는 해당 설정이 없음. 
    // 몽구스에서 sql처럼 표현하기 위해 추가된 것!
    // required: true, // null 여부
    unique: true, // 유니크 여부 중복 불가
  },
  password: {
    type: String, // Int32가 아니다. 기본 자바스크립트에는 존재하지 않으니 넘버로 해줘야 한다.
    // required: true,
  },
  role: {        // 관리자 구분 
    type: Number,
    default: 0, // 따로 입력 안 하면 0
  },
  token: {
    type: String,
  },
  tokenExp: { // 유효기간
    type: Number,
  }
}, {
  versionKey : false,
});

userSchema.pre("save", function(next) {
  const user = this;
  if(user.isModified('password')) {
    bcrypt.genSalt(saltRounds, function(err, salt) {
      if(err) return next(err);
      
      bcrypt.hash(user.password, salt, function(err, hash) {
        if(err) return next(err);
        user.password = hash
        next()
      })
    })
  } else {
      next()
    }
});

userSchema.methods.comparePassword = function(plainPassword, cb) {
  // plainPassword = 입력받은 비밀번호 복호화해서 비교, cb는 콜백의 약자(ismatch와, err)
  bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
    if(err) return cb(err), // compare()은 문자열 비교 함수 에러가 있으면 콜백에 에러를 리턴하고
    cb(null, isMatch) // 없으면 에러에 null user에 isMatch를 반환
  })
}

userSchema.methods.generateToken = function(cb) {
  const user = this;
  const token = jwt.sign(user._id.toHexString(), 'secret'); // secretToken은 임의의 값
  // user._id + 'secretToken' = token
  // toHexString은 toString의 상위 함수다 object 형태의 id를 24바이트의 hex 문자열로 바꾸어 리턴하는 함수
  user.token = token;
  user.save(function(err, user) {
    if(err) return cb(err);
    cb(null, user);
  });
}

userSchema.statics.findByToken = function(token, cb) {
  const user = this;
  // token을 decode 한다
  jwt.verify(token, 'secret', function(err, decoded) {
    // secretToken은 임의로 넣었던 값
    // 유저 아이디를 이용해서 유저를 찾고
    //클라이언트에서 가져온 토큰과 디비에 보관된 토큰을 비교

    user.findOne({"_id": decoded, "token": token }, function(err, user) {
      if(err) return cb(err);
      cb(null, user);
    })
  })
}

module.exports = mongoose.model('User', userSchema);


