const express = require('express');
const router = express.Router();
const { getPost, writePost, viewPost } = require('../middleware/post');

// 게시물 관련
router.get("/list", getPost);
router.post("/write", writePost);
router.get("/detail/:id", viewPost);

module.exports = router;