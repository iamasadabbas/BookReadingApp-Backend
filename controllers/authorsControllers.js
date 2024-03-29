const authors=require('../models/authorsModel');


     const postAuthor=async (req,resp)=> {
        let data = new authors({
            name: req.body.name,
            biography: req.body.biography,
            photo:req.file.filename,
        });
        let result = await data.save();
        return resp.send(result)
    }
    module.exports={postAuthor};
