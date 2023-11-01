const path = require('path');

const file_u = (req,res) => {
    const name = req.params.name;
    const filePath = path.join(__dirname, `../src/img/${name}`);
    res.sendFile(filePath);
};

module.exports = file_u;