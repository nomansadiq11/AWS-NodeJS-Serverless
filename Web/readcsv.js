
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const config = require('./config.json'); 

//configuring the AWS environment
AWS.config.update({
    accessKeyId: config.AWS_AccessKey,
    secretAccessKey: config.AWS_SecretKey
  });

var s3 = new AWS.S3();
var filePath = "./uploads/soh.csv";


var params = {
    Bucket:"readcsvfile",
    Delimiter: '/',
    Prefix: 'csvfiles/'
    };
    
    s3.listObjects(params, function(err, data) {
                if (err) {
                    return 'There was an error viewing your album: ' + err.message
                }else{
                    console.log(data.Contents,"<<<all content");
    
                    data.Contents.forEach(function(obj,index){
                        console.log(obj.Key,"<<<file path")
                        
                        if((data.Contents.length - 1) == index)
                        {
                            console.log("this is last index" + index); 
                        }
                    })
                }
            }); 



// //configuring parameters
// var params = {
//   Bucket: 'readcsvfile',
//   Body : fs.createReadStream(filePath),
//   Key : "csvfiles/"+Date.now()+"_"+path.basename(filePath)
// };

// s3.upload(params, function (err, data) {
//   //handle error
//   if (err) {
//     console.log("Error", err);
//   }

//   //success
//   if (data) {
//     console.log("Uploaded in:", data.Location);
//   }
// });