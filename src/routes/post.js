const express = require('express');
const router = express.Router();
const { postList, writePost, viewPost, searchPost } = require('../middleware/post');

// 게시물 관련
router.get("/list", postList);
router.post("/write", writePost);
router.get("/detail/:id", viewPost);
router.get("/:search", searchPost);

module.exports = router;