const express = require('express');
const router = express.Router();
const { groupList, createGroup, searchGroup, detailView } = require('../middleware/match');

// 게시물 관련
router.get("/list", groupList);
router.post("/create", createGroup);
router.get("/:search", searchGroup);
router.get("/detail/:id", detailView);

module.exports = router;