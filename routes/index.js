var express = require('express');
var gm = require('gm');
var PDF2Pic = require('pdf2pic').default
var multer = require('multer');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// multer storage process
// place file uploaded from browser in the public/pdf folder
// keep the original file name 
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/pdf');
  }, 
  filename: function(req, file, cb) {
    cb(null, file.originalname); 
  }
})

// create upload variable 
var upload = multer({ storage: storage }).single('pdf');

router.post('/', upload, function(req, res, next) {
  // console.log(req.file);
  // console.log(req.file.originalname);
  var file_name = req.file.originalname;
  
  var converter = new PDF2Pic({
    density: 100, // output pixels per inch
    savename: file_name,  // output file name, will add incrementing numbers for multiple pages, starting with 1
    savedir: './public/pdf/converted_pdf', //output file location
    format: 'png',  // output file format
    size: 800 // output size in pixels
  })

  converter.convertBulk("./public/pdf/" + file_name, -1)
    .then(resolve => {
      console.log('pdf converted');
  })
})




module.exports = router;
