const express = require('express');
const router = express.Router();
const { signUp, signUserId, signUserPw, signStatus } = require('../middleware/auth');

// 회원가입
router.post("/signUp", signUp);
router.post("/id", signUserId);
router.post("/password", signUserPw);
router.get("/signStatus", signStatus);

module.exports = router;