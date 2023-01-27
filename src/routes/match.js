const express = require('express');
const router = express.Router();
const { groupList, recruitGroup, searchGroup, detailView } = require('../middleware/match');

// 게시물 관련
router.get("/list", groupList);
router.post("/recruit", recruitGroup);
router.get("/:search", searchGroup);
router.get("/detail/:id", detailView);

module.exports = router;