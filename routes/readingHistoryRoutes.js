const express = require('express');

const router = express.Router();

const readingHistoryController = require('../controllers/readingHistoryControllers')
router.post('/postreadinghistory', readingHistoryController.postReadingHistory);

module.exports = router;