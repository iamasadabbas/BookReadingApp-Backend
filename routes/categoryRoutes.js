const express = require('express');

const router = express.Router();
const categoryController = require('../controllers/categoriesControllers')
router.post('/postcategory', categoryController.postCategory);

module.exports = router;