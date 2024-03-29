const express=require('express');
const router= express.Router();
const bookController= require('../controllers/booksControllers');
const uploadImage = require('../middleware/multer');
const verifyToken= require('../utils/verifyToken')
let folderName='./uploads/bookCoverImage';
let fileName='coverImage'
const upload=uploadImage(folderName,fileName);


router.post('/postbook',upload, bookController.postBook);
router.delete('/deletebook/:id', bookController.deleteBook);
router.put('/updatebook/:id', bookController.updateBook);
router.get('/getbookbybookfile/:bookFile', bookController.getBookByBookFile);
router.get('/getbookbytitle', bookController.getBookByTitle);
router.get('/getallbook',verifyToken, bookController.getAllBook)
router.get('/getbookbyauthorid', bookController.getBookByAuthorId);
router.get('/getbookbycategoryid', bookController.getBookByCategoryId);
router.get('/getbookbycategoryname', bookController.getBookByCategoryName);
module.exports = router;