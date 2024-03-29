const mongoose = require('mongoose');
const booksSchema = new mongoose.Schema({
    title: {
        type:String,
        require:true,
    },
    description: {
        type:String,
        require:true,
    },
    coverImage: {
        type:String,
        require:true,
    },
    bookFile: {
        type:String,
        require:true,
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "author"
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    }
})
module.exports = mongoose.model('book', booksSchema);