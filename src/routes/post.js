const express = require('express');
const router = express.Router();
const path = require('path');
const { postList, writePost, viewPost, searchPost, deletePost } = require('../middleware/post');

// 게시물 관련
router.get("/list", postList);
router.delete("/delete", deletePost);
router.post("/write", writePost);
router.get("/detail/:id", viewPost);
router.get("/:search", searchPost);

module.exports = router;