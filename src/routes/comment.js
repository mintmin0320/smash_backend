const express = require('express');
const router = express.Router();
const { writeComment, commentList, deleteComment } = require('../middleware/comment');

// 게시물 관련
router.post("/write", writeComment);
router.delete("/delete", deleteComment);
router.get("/list/:id", commentList);

module.exports = router;