/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const _ = require('lodash');
const db = require('../models/index.js');

const MortgageAppraisal = db.mortgageAppraisal;

module.exports.create = (req, res, next) => {
  const { appraisal } = req.body;
  for (const key in appraisal) {
    const mortgageAppraisal = new MortgageAppraisal({
      choiceName: req.body.appraisal[key].choiceName,
      decrement: req.body.appraisal[key].decrement,
      indicatorName: req.body.appraisal[key].indicatorName,
      mortgageCode: req.body.mortgageCode,
    });
    mortgageAppraisal.save(mortgageAppraisal).catch((err) => {
      console.log({
        status: 'error',
        message: `Data appraisal SBG gagal dibuat. Error: ${err.message}`,
      });
      next();
    });
  }
  res.send({
    status: 'success',
    message: 'Data appraisal SBG sukses dibuat.',
  });
};

module.exports.findAppraisalByCode = (req, res) => {
  const { code } = req.params;
  MortgageAppraisal.find({ mortgageCode: code })
    .lean()
    .then((data) => {
      if (_.isEmpty(data)) {
        res.status(500).send({
          data,
          status: 'error',
          message: 'Data appraisal SBG tidak ditemukan.',
        });
      } else {
        res.send({
          data,
          status: 'success',
          message: 'Data appraisal SBG barang ditemukan.',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 'error',
        message: `Data appraisal SBG tidak ditemukan. Error: ${err.message}`,
      });
    });
};

// module.exports.findAppraisalById = (req, res) => {};
