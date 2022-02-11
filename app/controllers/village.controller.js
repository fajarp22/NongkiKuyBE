const db = require('../models/index.js');

const Village = db.village;

module.exports.show = (req, res) => {
  Village.find({ id_district: req.body.id_district })
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
  Village.find({ id: req.body.id })
    .lean()
    .then((data) => {
      res.send(data[0]);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Terjadi kesalahan.',
      });
    });
};
