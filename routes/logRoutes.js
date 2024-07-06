const express = require('express');
const { logTime } = require('../controllers/logController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/log', protect, logTime);

module.exports = router;
