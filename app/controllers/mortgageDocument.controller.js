const _ = require('lodash');
const db = require('../models/index.js');
const uploadFile = require('../middlewares/upload.js');

const MortgageDocument = db.mortgageDocument;

module.exports.create = async (req, res, next) => {
  try {
    await uploadFile(req, res);
    req.files.forEach((file) => {
      const mortgagedocument = new MortgageDocument({
        ...req.body,
        documentPath: file.location,
      });
      mortgagedocument.save(mortgagedocument).catch((err) => {
        console.log(`Error: ${err.message}`);
        next();
      });
    });
    res.status(200).send({
      status: 'success',
      message: 'Data dokumen SBG sukses dibuat.',
    });
  } catch (err) {
    res.status(500).send({
      status: 'error',
      message: `Data dokumen SBG gagal dibuat. Error: ${err.message}`,
    });
  }
};

module.exports.findDocumentByCode = (req, res) => {
  const { code } = req.params;
  MortgageDocument.find({ mortgageCode: code })
    .lean()
    .then((data) => {
      if (_.isEmpty(data)) {
        res.status(500).send({
          data,
          status: 'error',
          message: 'Data dokumen SBG tidak ditemukan',
        });
      } else {
        res.send({
          data,
          status: 'success',
          message: 'Data dokumen SBG ditemukan.',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

module.exports.downloadDocument = (req, res) => {
  const fileName = req.params.filename;
  // eslint-disable-next-line no-undef
  const directoryPath = `${__basedir}/resources/static/assets/uploads/`;
  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        status: 'error',
        message: `Data dokumen SBG tidak dapat diunduh. Error: ${err.message}`,
      });
    }
  });
};
