const multer = require('multer');
const path = require('path');



const testk = async (req,res) => {
    const storage =multer.diskStorage({
        destination: (req, file, cb) =>{
            cb(null, '../src/img')
        },
        filename: (req, file, cb) =>{
            cb(null,file.fieldname + "_" + Date.now()+ path.extname(file.originalname))
        }
    })

    const upload=multer({
        storage:storage
    }).single('file');
    // res.json({ message: 'Image uploaded successfully!' });
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: 'Error uploading file', error: err });
        }
        
        return res.status(200).json({ message: 'File uploaded successfully!' });
    });
}

module.exports = testk;