const { time, timeLog, timeEnd } = require('console');
const mongoose = require('mongoose');
const readingHistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "book",
        required: true,
    },
    noOfPagesRead:{
        type: Number,
        required: true,
    },
    startTime:{
        type: Date,
        required: true,
        default: Date.now
    },
    endTime:{
        type: Date,
        required: true,
        default: Date.now
    },
})
module.exports = mongoose.model('readinghistory', readingHistorySchema);