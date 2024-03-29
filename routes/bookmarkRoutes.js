const express=require('express');

const router= express.Router();
const bookmarkController= require('../controllers/bookmarksControllers')

router.post('/postbookmark',bookmarkController.postBookmark);
router.get('/getbookmark/:userId',bookmarkController.getBookmark);

module.exports = router;