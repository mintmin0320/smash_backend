const User = require('../schemas/user');

function makeId(length) {
  const result = '';
  const characters = 'ABCDEFGHIJKLMOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.floor() * charactersLength));
  }
  return result
}

// const upload = multer({
//   storage: multer.diskStorage({
//     destination: "public/images",
//     filename: (_, file, callback) => {
//       const name = makeId(10);
//       callback(null, name + path.extname(file.originalname));
//     },

//   }),
//   fileFilter: (_, file, callback) => {
//     if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
//       callback(null, true);
//     }
//     else {
//       callback(new Error("이미지가 아닙니다."));
//     }
//   },
// });


// const uploadImage = async(req, res) => {
//   try {
//     const type = req.body.type;
//     let oldImageUrn = "";
//     if(type === "image") {
//       oldImageUrn = 
//     }

//   } catch (error) {
//     console.log(error);
//   }
// }

const signUp = async (req, res) => {
  console.log(req.body);
  // try {
  //   const user = await User.create({
  //     userId: req.body.userId,
  //     userPw: req.body.userPw,
  //   });
  //   console.log(user);
  //   return res.json({ result: true, message: "회원가입 성공!" });

  // } catch (error) {
  //   console.log(error);
  //   return res.json({ result: false, message: "회원가입 실패!" });
  // }
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
    const passwordMatches = bcrypt.compare(userPw, user.userPw);

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
    return res.json({ pwResult: true, message: "로그인 성공!", token, user });

  } catch (error) {
    console.log(error);
    return res.json({ pwResult: false, message: "로그인 실패!" });
  }
};

const signOut = async (_, res) => {
  res.set(
    "Set-Cookie",
    cookie.serialize("token", "", {
      httpOnly: true,
      expires: new Date(0),
      path: "/"
    })
  );
  res.json({ result: true });
};

const signStatus = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return next();

    const { userId } = jwt.verify(token, process.env.SECRET_TOKEN);

    const user = await User.findOne({ userId });

    if (!user) throw new Error("Unauthenticated");

    return res.json(userId);

  } catch (error) {
    console.log(error);
    return res.json({ error: "Something went wrong" });
  }
};

module.exports = { signUp, signUserId, signUserPw, signOut, signStatus };