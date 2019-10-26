
const AWS = require('aws-sdk');
var express = require('express');
var router = express.Router();
var util = require("util");
var fs = require("fs");
var multer = require('multer');
const config = require('./../config.json'); 
const path = require('path');

const readFile = require('fs').readFile;


AWS.config.update({
    accessKeyId: config.AWS_AccessKey,
    secretAccessKey: config.AWS_SecretKey
  });

  var s3 = new AWS.S3();

  




var allfilesfromS3 = []; 





/* GET home page. */
router.get('/', function(req, res, next) {

  var params = 
    {
        Bucket:"readcsvfile",
        Delimiter: '/',
        Prefix: 'csvfiles/'
    };
    
    s3.listObjects(params, function(err, data) {
        allfilesfromS3 = []; 
        if (err) {
            res.send('There was an error viewing your album: ' + err.message)
        }else{
            data.Contents.forEach(function(obj,index){
                
                allfilesfromS3.push(obj.Key); 
                console.log(allfilesfromS3); 

                if((data.Contents.length - 1) == index)
                {
                    res.render("index", {title: "Csv Reader", result : allfilesfromS3});
                }

            })
        }
    }); 



  // res.render('index', { title: 'Express' });
});

module.exports = router;
