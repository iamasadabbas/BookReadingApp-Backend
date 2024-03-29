const readinghistory = require('../models/readingHistoryModel');



const postReadingHistory = async (req, resp) => {
    let data = await readinghistory(req.body);
    let result = await data.save();
    return resp.send(result)
}
module.exports = { postReadingHistory }