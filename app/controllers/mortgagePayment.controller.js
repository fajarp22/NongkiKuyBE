const _ = require('lodash');
const moment = require('moment-timezone');
const db = require('../models/index.js');
require('moment/locale/id');

const MortgagePayment = db.mortgagePayment;
const Mortgage = db.mortgage;

module.exports.create = (req, res) => {
  const mortgagePayment = new MortgagePayment({
    ...req.body,
  });
  mortgagePayment
    .save(mortgagePayment)
    .then((data) => {
      const { id } = req.body;
      Mortgage.findByIdAndUpdate(
        id,
        // eslint-disable-next-line no-underscore-dangle
        { latestPaymentMortgage: data._id },
        { useFindAndModify: false }
      )
        .then(() => {
          res.send({
            // eslint-disable-next-line no-underscore-dangle
            data: data._id,
            status: 'success',
            message: 'Data pembayaran SBG sukses dibuat.',
          });
        })
        .catch((err) => {
          res.status(500).send({
            status: 'error',
            message: `Data pembayaran SBG gagal dibuat. Error: ${err.message}`,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        status: 'error',
        message: `Data pembayaran SBG gagal dibuat. Error: ${err.message}`,
      });
    });
};

module.exports.findPaymentByCode = (req, res) => {
  const { code } = req.params;
  MortgagePayment.find({ mortgageCode: code })
    .lean()
    .then((data) => {
      if (_.isEmpty(data)) {
        res.status(500).send({
          data,
          status: 'error',
          message: 'Data pembayaran SBG tidak ditemukan.',
        });
      } else {
        res.send({
          data,
          status: 'success',
          message: 'Data pembayaran SBG ditemukan.',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 'error',
        message: `Data pembayaran SBG tidak ditemukan. Error: ${err.message}`,
      });
    });
};

module.exports.scanMortgaged = async () => {
  MortgagePayment.find({
    paymentStatus: { $nin: ['Mortgaged', 'Completed'] },
  }).then((data) => {
    moment
      .tz('Asia/Jakarta')
      .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
      .diff(moment.tz(data.createdAt, 'Asia/Jakarta'), 'days');
  });
};
