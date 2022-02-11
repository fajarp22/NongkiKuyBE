const db = require('../models/index.js');

const IndicatorChoice = db.indicatorChoice;

module.exports.create = (req, res) => {
  const indicatorChoice = new IndicatorChoice({
    choiceName: req.body.choiceName,
    decrement: req.body.decrement,
    id: req.body.id,
    indicatorId: req.body.indicatorId,
    sequence: req.body.sequence,
  });
  indicatorChoice
    .save(indicatorChoice)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Terjadi kesalahan pada saat pembuatan pilihan',
      });
    });
};
