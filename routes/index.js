const router = require('express').Router();
// const User = require('../schemas/user');

router.get('/in', (req, res) => {
  res.send('index page!!');
});

module.exports = router;