var AWS = require('aws-sdk');
var config = require('../../config/config')["dev"];
var S3Client = {}
var fs = require('fs');
var path = require('path');

AWS.config.update({
    signatureVersion: 'v4'
})
var s3 = new AWS.S3({ apiVersion: '2006-03-01' });

s3.config.update({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
    region: 'us-east-2'

});

const listObjects = (prefix) => {
    s3.listObjects({
        Bucket: 'stacker-s3-img',
        Delimiter: '',
        Prefix: prefix
    }, function (err, data) {
        console.log("listing objects");
        if (err) {
            console.log("Error on listing objects: " + err);
        } else {
            console.log(data);
        }
    });
}

const listBuckets = () => {
    s3.listBuckets(function (err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Bucket List", data.Buckets);
        }
    });
}

const getObject = (bucket, key) => {
    let bucketName = bucket || "stacker-s3-img"
    let objectKey = key || "images/stacker.png"
    s3.getObject({
        Bucket: bucketName,
        Key: objectKey,
    }, function (err, obj) {
        if (err) console.log(err);
        console.log(obj)
    });
}

const getObjectUrl = (bucket, key) => {
    let params = { Bucket: bucket, Key: key };
    let url = s3.getSignedUrl('getObject', params)
    return url.split("?")[0];
}

const getObjectSignedUrl = (bucket, key) => {
    let params = { Bucket: bucket, Key: key };
    return s3.getSignedUrl('getObject', params);
}

/**
 * @description
 * upload image to S3 Bucket
 * @param filename String - the key for the S3 bucket
 *
 * @example
 * uploadImage('filename: MISC.jpg');
 */
const uploadImage = (fileName) => {
    let dir = path.join(__dirname, '../../public/images', fileName);
    let base64data = fs.readFileSync(dir);

    s3.putObject({
        Bucket: "stacker-s3-img",
        Key: fileName,
        Body: base64data,
        ACL: 'public-read'
    }, function (err, output) {
        if (err) {
            console.log(err);
        } else {
            console.log(output);
        }
    });
}
const downloadImage = (bucket, key) => {
    let dir = path.join(__dirname, '../../public/images', key);
    console.log(dir);
    s3.getObject({
        Bucket: bucket,
        Key: key
    }, function (err, data) {
        if (err) console.log(err);
        fs.writeFileSync(dir, data.Body, { encoding: "binary" });
    });
}

function getImageUrl(bucket, key) {
    return new Promise((resolve, reject) => {
        let params = { Bucket: bucket, Key: key };
        s3.getSignedUrl('getObject', params, (err, url) => {
            if (err) { reject(err); }
            else { resolve(url.split("?")[0]); }
        });
    });
}

S3Client = {
    listObjects,
    listBuckets,
    getObject,
    getObjectUrl,
    getObjectSignedUrl,
    getImageUrl,
    uploadImage,
    downloadImage,
}

module.exports = S3Client;