let multer = require("multer");
let upload = multer({dest: "../uploads"});
let mongoose = require("mongoose");
let fs = require('fs');
let router = express.Router();

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
router.post('/', function(req, res, next) {
    let newItem = new Item();
    newItem.img.data = fs.readFileSync(req.files.userPhoto.path);
    newItem.save();
});

module.exports = router;
