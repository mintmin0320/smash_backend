const  User  = require('../schemas/user');

let auth = (req, res, next) => {
  // 클라이언트 쿠키에서 토큰을 가져온다.
  console.log(req.cookies['x-auth']);
  let token = req.cookies['x-auth'];
  // 토큰을 복호화 한후 유저를 찾는다.
  console.log(token);
  User.findByToken(token, (err, user) => {
    if(err) throw err;
    if(!user) return res.json({
      isAuth: false,
      error: true
    });

    req.token = token;
    req.user = user;
    next();
  });
  // 유저가 있으면 ok
}

module.exports = { auth };