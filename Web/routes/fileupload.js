const AWS = require('aws-sdk');
var express = require('express');
var router = express.Router();
var util = require("util");
var fs = require("fs");
var multer = require('multer');
const config = require('./../config.json'); 
const path = require('path');


const readFile = require('fs').readFile;

const lineReader = require('line-reader');

var storage = multer.diskStorage({
    
    destination: function(req, file, cb) {
        cb(null, './uploads/');
     },
    filename: function (req, file, cb) {
        cb(null , file.originalname);
    }
});


AWS.config.update({
    accessKeyId: config.AWS_AccessKey,
    secretAccessKey: config.AWS_SecretKey
  });

  var s3 = new AWS.S3();

  


var upload = multer({ storage: storage })





var filedata = []
var allfilesfromS3 = []; 



router.get('/',function(req,res) {

    var dir = "./uploads/"
    try
    {
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir)
          }

    }
    catch(e)
    {
        console.error(e)

    }
    
    res.render("fileupload", {title: "Csv Reader"});
        
});


router.post('/upload', upload.single('myFile'), (req, res, next) => {
    const file = req.file
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    else
    {
        var params = {
            Bucket: 'readcsvfile',
            Body : fs.createReadStream(req.file.path),
            Key : "csvfiles/"+Date.now()+"_"+path.basename(req.file.path)
          };

        s3.upload(params, function (err, data) {
            //handle error
            if (err) {
              console.log("Error", err);
            }
          
            //success
            if (data) {
              console.log("Uploaded in:", data.Location);
            }
        });

        data = []; 
        console.log("file path" + req.file.path); 


        lineReader.eachLine(req.file.path, function(line, IsLastLine) {

            
            console.log(line); 
            data.push(line); 

            if(IsLastLine)
            {
                res.render("uploadedfile", {result:  data});
            }

            
        });


    }
        
    
    }); 

  


module.exports = router;