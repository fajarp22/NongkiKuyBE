const db = require('../models/index.js');

const District = db.district;

module.exports.show = (req, res) => {
  District.find({ id_regency: req.body.id_regency })
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
  District.find({ id: req.body.id })
    .lean()
    .then((data) => res.send(data[0]))
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Terjadi kesalahan.',
      });
    });
};
