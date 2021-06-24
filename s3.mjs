import fs from 'fs';

export function uploadFile (file, s3) {
  const fileStream = fs.createReadStream(file.path);
  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Body: fileStream,
    Key: file.filename
  }
  return s3.upload(uploadParams).promise();
}

export function getFileStream (fileKey, s3) {
  const downloadParams = {
    Key: fileKey,
    Bucket: process.env.AWS_BUCKET_NAME,
  }
  return s3.getObject(downloadParams).createReadStream();
}