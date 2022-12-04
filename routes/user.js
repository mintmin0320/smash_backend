const express = require('express');
const router = express.Router();
const User = require('../schemas/user');
const { auth } = require('../middleware/auth');

router.get('/', (req, res) => {
  res.send('user name is hamin');
});

router.get('/info', async(req, res, next) => {
  try{
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.post('/insert', async (req, res) => {
  try {
    const user = await User.create({
      name: req.body.name,
      password: req.body.password,
    });
    res.send('succ');
    console.log(user);
  } catch (err) {
    console.log(err);
  }
});

router.post('/login', (req, res) => {
  User.findOne({ name: req.body.name }, (err, user) => {
    if(!user) {
      return res.json({
        loginSuccess: false,
        message: "아이디가 존재하지 않습니다"
      });
    }
    // comparePassword, isMatch는 임의로 지은 함수 이름이다. 
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch)
        return res.json({
          loginSuccess: false, message: "비밀번호가 틀렸습니다."
        });
    });

    user.generateToken((err, user) => {
      if(err) return res.status(400).send(err);
      res.cookie("x-auth", user.token)
        .status(200)
        .json({
          loginSuccess: true,
          userId: user._id
        });
      }
    )}
  );
});

router.get('/auth', auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0? false : true,
    isAuth: true,
    name: req.user.name,
  });
});

router.get('/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id },
    { token: "" }
  , (err, user) => {
    if(err) return res.json({ success: false, err});
    return res.status(200).send({
      success: true
    });
  });
});

// router.post('/insert', async (req, res) => {
//   try {
//     const user = await User.findOne({ name: req.body.name, age: req.body.age });
//     if(user.name && user.age){
//       console.log('로그인 성공');  
//       res.json({result: true, message: '로그인 성공'});
//     } 
//     console.log(user);
//   } catch (err) {
//     console.log('로그인 실패');
//     res.send({result: false, message: '로그인 실패'});
//     console.log(err);
//   }
// });

module.exports = router;