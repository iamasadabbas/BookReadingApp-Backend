const category = require('../models/categoryModel');

const postCategory = async (req, resp) => {
    let data = new category(req.body);
    let result = await data.save();
    return resp.send(result)
}
module.exports={postCategory}
