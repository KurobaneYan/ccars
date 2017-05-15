var express = require('express');
let fs = require('fs');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
router.post('/api/photo', function(req, res, next) {
    let newItem = new Item();
    newItem.img.data = fs.readFileSync(req.files.userPhoto.path);
    newItem.save();
});

module.exports = router;
