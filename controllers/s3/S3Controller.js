var AWS = require("aws-sdk");
var config = require("../../config/config")[process.env.NODE_ENV];
var S3Client = {};
var fs = require("fs");
var path = require("path");

AWS.config.update({
  signatureVersion: "v4"
});
var s3 = new AWS.S3({ apiVersion: "2006-03-01" });

s3.config.update({
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey,
  region: "us-east-2"

});

const listObjects = (req, res) => {
  let bucket = req.body.bucket;
  let prefix = req.body.prefix;
  s3.listObjects({
    Bucket: bucket,
    Delimiter: "",
    Prefix: prefix
  }, function (err, data) {
    console.log("listing objects");
    if (err) {
      console.log("Error on listing objects: " + err);
      res.send(err);
    } else {
      console.log(data);
      res.send(data);
    }
  });
};

/**
 * @description
 * upload image to S3 Bucket
 * @param key String - the key for the S3 bucket
 *
 * @example
 * uploadImage('key: MISC.jpg');
 */
const uploadImage = (req, res) => {
  let bucket = req.body.bucket;
  let key = req.body.key;
  let dir = path.join(__dirname, "../../public/images", key);
  let base64data = fs.readFileSync(dir);

  s3.putObject({
    Bucket: bucket,
    Key: key,
    Body: base64data,
    ACL: "public-read"
  }, function (err, output) {
    if (err) {
      console.log(err);
      return res.send(err);
    } else {
      console.log(output);
      return res.send(output);
    }
  });
};

const downloadImage = (req, res) => {
  let bucket = req.body.bucket;
  let key = req.body.key;
  let dir = path.join(__dirname, "../../public/images", key);
  console.log(dir);
  s3.getObject({
    Bucket: bucket,
    Key: key
  }, function (err, data) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      fs.writeFileSync(dir, data.Body, { encoding: "binary" });
      res.send("downloaded image");
    }
  });
};

function getImageUrl (bucket, key) {
  return new Promise((resolve, reject) => {
    let params = { Bucket: bucket, Key: key };
    s3.getObject(params, (err, obj) => {
      if (err || !obj) {
        reject(err);
      } else {
        s3.getSignedUrl("getObject", params, (err, url) => {
          if (err) {
            reject(err);
          } else {
            resolve(url.split("?")[0]);
          }
        }); // getSignedUrl
      }
    }); // getObject
  });
}

S3Client = {
  listObjects,
  getImageUrl,
  uploadImage,
  downloadImage
};

module.exports = S3Client;
