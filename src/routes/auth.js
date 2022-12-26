const express = require('express');
const router = express.Router();
const { signUp, signUserId, signUserPw } = require('../middleware/auth');

// 회원가입
router.post("/signUp", signUp);
router.post("/id", signUserId);
router.post("/password", signUserPw);

module.exports = router;