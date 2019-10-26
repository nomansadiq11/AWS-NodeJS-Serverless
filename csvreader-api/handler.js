'use strict';

const AWS = require('aws-sdk');

// AWS.config.update({
//   accessKeyId: config.AWS_AccessKey,
//   secretAccessKey: config.AWS_SecretKey
// });

var s3 = new AWS.S3();
var allfilesfromS3 = []; 


module.exports.hello = async event => {

  var params = {
        Bucket:"readcsvfile",
        Delimiter: '/',
        Prefix: 'csvfiles/'
    };

    s3.listObjects(params, function(err, data) {
      allfilesfromS3 = []; 
      if (err) {
        allfilesfromS3.push('There was an error reading S3 files: ' + err.message)
      }else{
          data.Contents.forEach(function(obj,index){
              
              allfilesfromS3.push(obj.Key); 
              console.log(allfilesfromS3); 
          })
      }
  }); 


    

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        AllFileList: allfilesfromS3
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
