const multer = require("multer");

const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + " " + Date.now())
    }
})

const upload = multer({ storage: Storage }).fields([
    {name:"image"},
    {name:"image"},
    {name:"image"},
    {name:"image"},
]);
module.exports = upload