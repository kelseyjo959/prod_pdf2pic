var express = require('express');
var gm = require('gm');
var PDF2Pic = require('pdf2pic').default
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var converter = new PDF2Pic({
  density: 100, // output pixels per inch
  savename: 'graybar',  // output file name, will add incrementing numbers for multiple pages, starting with 1
  savedir: './public/pdf/converted_pdf', //output file location
  format: 'png',  // output file format
  size: 800 // output size in pixels
})

// input: file location of pdf to be converted, second argument denotes that ALL pages of pdf will be converted
converter.convertBulk("./public/pdf/2017.11.28-ElecCableTrayBOM_Add1.pdf", -1)
  .then(resolve => {
    console.log('pdf converted');
})


module.exports = router;
