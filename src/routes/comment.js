const express = require('express');
const router = express.Router();
const { writeComment, commentList } = require('../middleware/comment');

// 게시물 관련
router.post("/write", writeComment);
router.get("/list", commentList);

module.exports = router;