const multer = require('multer');
const path = require('path');
const imgmdl = require('../models/testing');


const testk = async (req,res) => {
    const storage =multer.diskStorage({
        destination: (req, file, cb) =>{
            cb(null, 'D:/booknet_v001/backend/Backend/server/src/img')
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
        
        imgmdl.create({ file: req.file.filename })
        .then(result => res.json(result))
        .catch(err => res.status(500).json({ message: 'Error saving file to database', error: err }));
    });
}

module.exports = testk;