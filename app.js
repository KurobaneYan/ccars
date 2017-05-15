let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let fs = require('fs');
let mongoose = require('mongoose');
let multer = require('multer');
let grid = require('gridfs-stream');

let config = require('./config');
let index = require('./routes/index');
let users = require('./routes/users');

let app = express();
let upload = multer({ dest: './uploads' });

mongoose.Promis = global.Promise;
mongoose.connect(config.databaseUrl);
let connection = mongoose.connection;
grid.mongo = mongoose.mongo;

let gfs;

connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function() {
    console.log('Mongoose connected to ' + config.databaseUrl);
    gfs = grid(connection.db);
});


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

app.get('/img', (req, res) => res.render('image'));
app.post('/img', upload.single('image'), function(req, res, next){
    let writestream = gfs.createWriteStream({
        filename: req.file.originalname
    });
    fs.createReadStream('./uploads/' + req.file.filename)
        .on('end', function(){
            fs.unlink('./uploads/'+ req.file.filename, function(err){
                res.send('success')
            })
        })
        .on('err', function(){res.send('Error uploading image')})
        .pipe(writestream);
});


app.get('/img/:filename', (req, res) => {
    let readStream = gfs.createReadStream({ filename: req.params.filename });
    readStream.on('error', (err) => {
        res.send('No image found with that title');
    });
    readStream.pipe(res);
});

app.get('/img/delete/:filename', (req, res) => {
    gfs.exist({ filename: req.params.filename }, (err, found) => {
        if (err) {
            return res.send('Error occured');
        }
        if (found) {
            gfs.remove({ filename: req.params.filename }, (err) => {
                if (err) {
                    return res.send('Error occured');
                }
                res.send('Image deleted!');
            });
        } else {
            res.send('No image found with that title');
        }
    });
});

app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
