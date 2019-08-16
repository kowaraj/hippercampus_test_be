var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var test_be_router = require("./routes/test_be");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/test_be", test_be_router);

// UPLOADING //
const fileUpload = require('express-fileupload');
app.use(fileUpload());
app.use('/form', express.static(__dirname + '/form_upload.html'))
app.post('/upload', function(req, res) {
  let sampleFile;
  let uploadPath;
  if (Object.keys(req.files).length == 0) {
    res.status(400).send('No files were uploaded.');
    return;
  }

  console.log('req.files >>>', req.files); // eslint-disable-line
  sampleFile = req.files.sampleFile;
  uploadPath = __dirname + '/uploads/' + sampleFile.name;
  sampleFile.mv(uploadPath, function(err) {
    if (err) {
      return res.status(500).send(err);
    }

    // The URL of the client
    let backURL = req.header('Referer') || '/';
    console.log(backURL);

    res.redirect(302, 'back');
    //res.send('File uploaded to ' + uploadPath);
  });
});

// FILE ACCESS //
app.get('/uploads/*', (req,res) =>{
  console.log(req.path)
  
  res.sendFile(path.join(__dirname + req.path)); 
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
