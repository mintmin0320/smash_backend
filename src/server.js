const express = require('express');
const fileUpload = require("express-fileupload");
const path = require("path");
const cors = require('cors');
const morgan = require('morgan'); //morgan은 nodeJS 에서 사용되는 로그 관리를 위한 미들웨어, 로그 관리를 쉽게 하기 위함
const connect = require('./schemas');

// routes
const authRoute = require('../src/routes/auth');
const postRoute = require('../src/routes/post');
const widgetRoute = require('../src/routes/widget');
const matchRoute = require('../src/routes/match');
const commentRoute = require('../src/routes/comment');
const userRoute = require('../src/routes/user');

const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const origin = process.env.ORIGIN;
const corsOptions = {
  origin: origin,
  credentials: true,
}

app.use(cookieParser());
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(express.json());
app.use(fileUpload({ createParentPath: true, }));
app.use(express.urlencoded({ extended: true }));
// extended를 true로 주면 추가 설치가 필요한 qs모듈 사용
// false면 node에 기본 내장된 쿼리스트링 모듈사용 qs모듈은 express에 자동 설치되서
// false 하면 됨
// .urlencoded()은 x-www-form-urlencoded형태의 데이터를(form 형식)
// .json()은 JSON형태의 데이터를 해석해줍니다.

app.use('/api/auth', authRoute);
app.use('/api/post', postRoute);
app.use('/api/widget', widgetRoute);
app.use('/api/comment', commentRoute);
app.use('/api/match', matchRoute);
app.use('/api/user', userRoute);

app.use((_, res,) => { // 기본경로나 /user말고 다른곳 진입했을경우 실행
  res.status(404).send('Not Found');
});

app.listen(8080, () => {
  console.log(`server is running on ${process.env.PORT}`);

  // 몽고 디비 연결
  connect();
});
