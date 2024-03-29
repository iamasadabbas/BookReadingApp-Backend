const fs = require('fs');
const path = require('path');
const books = require('../models/booksModel');
const postBook = async (req, resp,next) => {
    let data = new books({

        title: req.body.title,
        description: req.body.description,
        coverImage: req.files['coverImage'][0].filename,
        bookFile:req.files['bookFile'][0].filename,
        authorId: req.body.authorId,
        categoryId: req.body.categoryId

    });
    let result = await data.save();
    return resp.send(result)
}

const deleteBook = async (req, resp) => {
    let result = await books.deleteOne(req.params._id);
    return resp.send(result)
}

const updateBook = async (req, resp) => {
    try {
        let newData = req.body;
        console.log(newData.title);
        if (req.file) {
            newData.coverImage = req.file.filename;
        }
        let data = await books.findOneAndUpdate({ _id: req.params.id }, newData, { new: true });
      
        return resp.send(data);
        
    } catch (error) {
        console.log(error.message);
        return resp.status(500).send("Internal Server Error");
    }
}


const getBookByBookFile = async (req, resp) => {
    try {
        let data = await books.findOne({ bookFile: req.params.bookFile });

        if (!data) {
            return resp.status(404).send('Book not found');
        }
        const pathDirectory='C:/Users/Asad/Desktop/Project1/server/uploads/bookCoverImage'
        const filePath=path.join(pathDirectory,data.bookFile)
        // Read the PDF file from the server


        
        fs.readFile(filePath, (err, fileData) => {
            if (err) {
                console.error('Error reading PDF file:', err);
                return resp.status(500).send('Internal Server Error');
            }

            // Set Content-Type header to indicate that the response contains a PDF file
            resp.setHeader('Content-Type', 'application/pdf');

            // Send the PDF file contents as the response
            return resp.send(fileData);
        });
    } catch (error) {
        console.error('Error fetching book by file:', error);
        return resp.status(500).send('Internal Server Error');
    }
}


const getBookByTitle = async (req, resp) => {
    let result = await books.findOne({ title: req.body.title });
    return resp.send(result)
}

const getBookByAuthorId = async (req, resp) => {
    let result = await books.find({ authorId: req.body.authorId }).populate('categoryId').populate('authorId');
    return resp.send(result)
}
const getAllBook = async (req, resp) => {
    let result = await books.find({});
    return resp.send(result)
}

const getBookByCategoryId = async (req, resp) => {
    let result = await books.findOne({ categoryId: req.body.categoryId });
    return resp.send(result)
}

const getBookByCategoryName = async (req, resp) => {
    let result = await books.find({}).populate({
        path: "categoryId",
        match: { name: req.body.name }
    });
    return resp.send(result)
}
module.exports={postBook,getBookByBookFile,updateBook,deleteBook,getAllBook,getBookByTitle,getBookByAuthorId,getBookByCategoryId,getBookByCategoryName}