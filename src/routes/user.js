const express = require('express');
const router = express.Router();
const { uploadFile, downloadFile, getProfileData } = require('../middleware/user');

// 게시물 관련
router.post("/profile-upload/:userId", uploadFile);
router.post("/profile-download/:userId", downloadFile);
router.get("/info/:userId", getProfileData);
// router.get("/detail/:id", viewPost);
// router.get("/:search", searchPost);

module.exports = router;