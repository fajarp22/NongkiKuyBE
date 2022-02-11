const db = require('../models/index.js');

const Regency = db.regency;

module.exports.show = (req, res) => {
  Regency.find({ id_province: req.body.id_province })
    .lean()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Terjadi kesalahan.',
      });
    });
};

module.exports.getName = (req, res) => {
  Regency.find({ id: req.body.id })
    .lean()
    .then((data) => res.send(data[0]))
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Terjadi kesalahan.',
      });
    });
};
