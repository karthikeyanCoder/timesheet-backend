const express = require('express');
const { getDailyReport } = require('../controllers/reportController');
const { protect, isHR } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/daily', protect, isHR, getDailyReport);

module.exports = router;
