const express = require('express');
const router = express.Router();
const { getPost, writePost } = require('../middleware/post');

// 게시물 관련
router.get("/list", getPost);
router.post("/write", writePost);

module.exports = router;