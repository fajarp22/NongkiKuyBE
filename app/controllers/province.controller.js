const db = require('../models/index.js');

const Province = db.province;

module.exports.show = (req, res) => {
  Province.find({})
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
  Province.find({ id: req.body.id })
    .lean()
    .then((data) => res.send(data[0]))
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Terjadi kesalahan.',
      });
    });
};
