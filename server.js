const express = require('express');
const app = express();
const cors = require('cors');
const connect = require('./schemas');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const corsOptions = {
  origin: "*",
  credential: true,
}
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json()); 
app.use(express.urlencoded( {extended : false } ));
// extended를 true로 주면 추가 설치가 필요한 qs모듈 사용
// false면 node에 기본 내장된 쿼리스트링 모듈사용 qs모듈은 express에 자동 설치되서
// false 하면 됨
// .urlencoded()은 x-www-form-urlencoded형태의 데이터를(form 형식)
// .json()은 JSON형태의 데이터를 해석해줍니다.

// 몽고 디비 연결
connect();

// router
const indexRouter = require('./routes'); // router.get('/', (req, res) => { ... 을 불러옴
const userRouter = require('./routes/user');

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use((req, res, next) => { // 기본경로나 /user말고 다른곳 진입했을경우 실행
  res.status(404).send('Not Found');
});

app.listen(8080, () => {
  console.log(`server is running on ${process.env.PORT}`);
});




