const util = require('util');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const aws = require('aws-sdk');

aws.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_ACCESS_SECRET,
});

const s3 = new aws.S3();

const storageS3 = multerS3({
  s3,
  bucket: 'rumahgadai',
  key(req, file, cb) {
    cb(
      null,
      `${req.body.mortgageCode}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    req.fileValidationError = 'Ekstensi file bukan image.';
    cb(null, false, new Error('Ekstensi file bukan image.'));
  }
};

const uploadFile = multer({
  storage: storageS3,
  fileFilter: multerFilter,
}).array('image', 50);

const uploadFileMiddleware = util.promisify(uploadFile);

module.exports = uploadFileMiddleware;
