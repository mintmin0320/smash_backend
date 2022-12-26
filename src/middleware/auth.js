const User = require('../schemas/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');

let auth = (req, res, next) => {
  // 클라이언트 쿠키에서 토큰을 가져온다.
  let token = req.cookies['x-auth'];
  // 토큰을 복호화 한후 유저를 찾는다.
  console.log(token);
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({
      isAuth: false,
      error: true
    });

    req.token = token;
    req.user = user;
    next();
  });
  // 유저가 있으면 ok
}

const signUp = async (req, res) => {
  try {
    const user = await User.create({
      userId: req.body.userId,
      userPw: req.body.userPw,
    });
    console.log(user);
    return res.json({ result: true, message: "회원가입 성공!" });

  } catch (error) {
    console.log(error);
    return res.json({ result: false, message: "회원가입 실패!" });
  }
};

const signUserId = async (req, res) => {
  try {
    User.findOne({ userId: req.body.userId }, (_, user) => {
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
  } catch (error) {
    console.log(error);
    return res.json({ idResult: false, message: "아이디 조회 실패" });
  }
};

const signUserPw = async (req, res) => {
  const { userId, userPw } = req.body;
  try {
    const user = await User.findOne({ userId });
    const passwordMatches = await bcrypt.compare(userPw, user.userPw);

    if (!passwordMatches) {
      return res.json({ pwResult: false, message: "비밀번호가 잘못되었습니다." });
    };

    const token = jwt.sign({ userId }, process.env.SECRET_TOKEN);

    res.set("Set-Cookie", cookie.serialize("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, //일주일
      path: "/"
    }));
    console.log(token);
    return res.json({ pwResult: true, message: "로그인 성공!", token });

  } catch (error) {
    console.log(error);
    return res.json({ pwResult: false, message: "로그인 실패!" });
  }
};

module.exports = { auth, signUp, signUserId, signUserPw };