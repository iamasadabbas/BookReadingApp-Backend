const bookmarks=require('../models/bookmarksModel');
// const {ObjectId}= require('mongodb')

const postBookmark = async (req, resp) => {
    let data = new bookmarks(req.body);
    let result = await data.save();
    return resp.send(result)
}
const getBookmark = async (req, resp) => {
    let data= await bookmarks.find({userId:req.params.userId})
    // console.log(data);
    if (!data) {
        return resp.status(404).send('Book not found');
    }else{
        return resp.status(200).send(data)
    }
}

module.exports={postBookmark,getBookmark};