const mongoose = require('mongoose');
const bookmarksSchema=new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "book"
    },
    pageNumber:{
        type: Number
    },
})
module.exports =mongoose.model('bookmark',bookmarksSchema);