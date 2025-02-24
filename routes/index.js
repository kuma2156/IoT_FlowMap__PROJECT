const express = require('express');
const router = express.Router();

// 홈 페이지 라우터
router.get('/', (req, res) => {
  res.send('홈 페이지');
});

module.exports = router;
