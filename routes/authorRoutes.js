const express=require('express');
const postAuthor=require('../controllers/authorsControllers');
const uploadImage = require('../middleware/multer');
let folderName='authorPhoto';
let fileName='photo'
const upload=uploadImage(folderName,fileName)

const router= express.Router();
router.post('/postauthor',upload, postAuthor.postAuthor);
module.exports = router;