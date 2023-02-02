const express = require('express');
const router = express.Router();
const { uploadFile, writePost, viewPost, searchPost } = require('../middleware/user');

// 게시물 관련
router.post("/user-profile", uploadFile);
// router.post("/write", writePost);
// router.get("/detail/:id", viewPost);
// router.get("/:search", searchPost);

module.exports = router;