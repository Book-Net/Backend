const path = require('path');

const file_u = (req,res) => {
    const id = req.params.id;
    res.sendFile(filePath);
};

module.exports = file_u;