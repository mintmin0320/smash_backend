const express = require('express');
const router = express.Router();
const { signUp, signUserId, signUserPw, signOut, signStatus } = require('../middleware/auth');
const Post = require('../schemas/post');

// 인증 관련
router.post("/signUp", signUp);
router.post("/id", signUserId);
router.post("/password", signUserPw);
router.post("/signout", signOut)
router.get("/signStatus", signStatus);

module.exports = router;