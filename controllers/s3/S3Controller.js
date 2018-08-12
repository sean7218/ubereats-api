var AWS = require('aws-sdk');
var config = require('../../config/config')[process.env.NODE_ENV];
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

const listObjects = (bucket, prefix) => {
    s3.listObjects({
        Bucket: bucket,
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

/**
 * @description
 * upload image to S3 Bucket
 * @param filename String - the key for the S3 bucket
 *
 * @example
 * uploadImage('filename: MISC.jpg');
 */
const uploadImage = (bucket, fileName) => {
    let dir = path.join(__dirname, '../../public/images', fileName);
    let base64data = fs.readFileSync(dir);

    s3.putObject({
        Bucket: bucket,
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
    getImageUrl,
    uploadImage,
    downloadImage,
}

module.exports = S3Client;