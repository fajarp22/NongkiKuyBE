const db = require('../models/index.js');

const CategoryIndicator = db.categoryIndicator;

module.exports.create = (req, res) => {
  const categoryIndicator = new CategoryIndicator({
    categoryId: req.body.categoryId,
    id: req.body.id,
    indicatorName: req.body.indicatorName,
    sequence: req.body.sequence,
  });
  categoryIndicator
    .save(categoryIndicator)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Terjadi kesalahan pada saat pembuatan indikator.',
      });
    });
};
