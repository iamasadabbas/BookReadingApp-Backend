const multer=require('multer');

function uploadImage(folderName,file){

    return multer({
        storage:multer.diskStorage({
            destination: function(req,file,cb){
                cb(null,folderName);
            },
            filename: function(req,file,cb){
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
            }
        })
    }).fields([
        {name:'coverImage',maxCount:1},
        {name:'bookFile',maxCount:1}
])
}

module.exports =uploadImage;