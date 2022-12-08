const express = require('express');
const router = express.Router();
const User = require('../schemas/user');
const { auth } = require('../middleware/auth');

router.get('/', (req, res) => {
  res.send('user name is hamin');
});

router.get('/info', async (req, res, next) => {
  try {
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
      userId: req.body.userId,
      userPw: req.body.userPw,
    });
    res.send('succ');
    console.log(user);
  } catch (err) {
    console.log(err);
  }
});

router.post('/id', (req, res) => {
  User.findOne({ userId: req.body.userId }, (err, user) => {
    console.log('1');
    if (!user) {
      return res.json({
        idResult: false,
        message: "일치하지 않는 아이디입니다."
      });
    }
    else {
      return res.json({
        idResult: true,
        message: "일치하는 아이디입니다."
      });
    }
  });
});

router.post('/pw', (req, res) => {
  User.findOne({ userId: req.body.userId }, (err, user) => {
    user.comparePassword(req.body.userPw, (err, isMatch) => {
      console.log(isMatch);
      if (!isMatch) {
        return res.json({
          pwResult: false,
          message: "비밀번호가 틀렸습니다."
        });
      }
      else {
        user.generateToken((err, user) => {
          if (err) return res.status(400).send(err);
          res.cookie("x-auth", user.token)
            .status(200)
            .json({
              pwResult: true,
              message: "로그인 성공"
            });
        })
      }
    });
  });
});

router.post('/login', (req, res) => {
  User.findOne({ userId: req.body.userId }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "아이디가 존재하지 않습니다"
      });
    }
    // comparePassword, isMatch는 임의로 지은 함수 이름이다. 
    user.comparePassword(req.body.userPw, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false, message: "비밀번호가 틀렸습니다."
        });
    });

    user.generateToken((err, user) => {
      if (err) return res.status(400).send(err);
      res.cookie("x-auth", user.token)
        .status(200)
        .json({
          loginSuccess: true,
          userId: user._id
        });
    }
    )
  }
  );
});

router.get('/auth', auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    userId: req.user.userId,
  });
});

router.get('/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id },
    { token: "" }
    , (err, user) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true
      });
    });
});

module.exports = router;