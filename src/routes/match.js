const express = require('express');
const router = express.Router();
const { groupList, recruitGroup, searchGroup, detailView, classificationGroup } = require('../middleware/match');

// 게시물 관련
router.get("/list", groupList);
router.post("/recruit", recruitGroup);
router.get("/search/:keyword", searchGroup);
router.get("/detail/:id", detailView);
router.get("/classification/:category", classificationGroup);

module.exports = router;