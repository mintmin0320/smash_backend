const express = require('express');
const router = express.Router();
const { weather } = require('../middleware/widget');

// 인증 관련
router.get("/weather", weather);

module.exports = router;