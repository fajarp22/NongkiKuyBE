const db = require('../models/index.js');

const ItemCategory = db.itemCategory;
const CategoryIndicator = db.categoryIndicator;
const IndicatorChoice = db.indicatorChoice;

module.exports.create = (req, res) => {
  const itemCategory = new ItemCategory({
    categoryName: req.body.categoryName,
    id: req.body.id,
    parentId: req.body.parentId,
    sequence: req.body.sequence,
  });
  itemCategory
    .save(itemCategory)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Terjadi kesalahan pada saat pembuatan kategori.',
      });
    });
};

module.exports.showItemCategory = (req, res) => {
  ItemCategory.find({}, 'categoryName id parentId sequence')
    .lean()
    .then((data) => {
      res.send({ data: [data] });
    });
};

module.exports.showOneItemCategory = (req, res) => {
  const { id } = req.params;
  ItemCategory.find({ id }, 'categoryName id parentId sequence')
    .lean()
    .then((data) => {
      res.send({ data: [data] });
    });
};

module.exports.showDetailItemCategory = (req, res) => {
  const { id } = req.params;
  ItemCategory.find({ id }, 'categoryName id sequence')
    .lean()
    .then((item) => {
      const output = { ...item[0] };
      output.categoryindicators = [];
      CategoryIndicator.find(
        { categoryId: output.id },
        'categoryId id indicatorName'
      )
        .lean()
        .then((category) => {
          output.categoryindicators.push(...category);
          IndicatorChoice.find(
            {},
            'choiceName decrement id indicatorId sequence'
          )
            .lean()
            .then((choice) => {
              output.categoryindicators.forEach((x, i) => {
                output.categoryindicators[i].indicatorchoices = [];
                choice.forEach((y) => {
                  if (x.id === y.indicatorId) {
                    output.categoryindicators[i].indicatorchoices.push(y);
                  }
                });
              });
              res.send({ data: [output] });
            });
        });
    });
};

module.exports.showParentItemCategory = (req, res) => {
  ItemCategory.find({ parentId: 0 }, 'categoryName id')
    .lean()
    .then((data) => {
      res.send(data);
    });
};

module.exports.showSelectedItemCategory = (req, res) => {
  const { id } = req.params;

  ItemCategory.find({ parentId: parseInt(id, 10) }, 'categoryName id')
    .lean()
    .then((data) => {
      res.send(data);
    });
};

module.exports.showChildItemCategory = (req, res) => {
  ItemCategory.aggregate([
    {
      $match: {
        parentId: {
          $ne: 0,
        },
      },
    },
    {
      $sort: {
        categoryName: 1,
      },
    },
    {
      $project: {
        id: 1,
        categoryName: 1,
      },
    },
  ]).then((data) => {
    res.send(data);
  });
};

module.exports.migrate = (req, res, next) => {
  req.body.data.forEach((item) => {
    const itemCategory = new ItemCategory({
      categoryName: item.categoryName,
      id: item.id,
      parentId: item.parentId,
      sequence: item.sequence,
    });
    itemCategory.save(itemCategory).catch((err) => {
      console.log(err);
    });
    next();
  });
  res.send({ message: 'beres' });
};

module.exports.migrateAll = (req, res) => {
  req.body.data.forEach((item) => {
    item.categoryindicators.forEach((indicator) => {
      const categoryIndicator = new CategoryIndicator({
        categoryId: indicator.categoryId,
        id: indicator.id,
        indicatorName: indicator.indicatorName,
        sequence: indicator.sequence,
      });
      categoryIndicator.save(categoryIndicator).catch((err) => {
        console.log(err);
      });
      indicator.indicatorchoices.forEach((choice) => {
        const indicatorChoice = new IndicatorChoice({
          choiceName: choice.choiceName,
          decrement: choice.decrement,
          id: choice.id,
          indicatorId: choice.indicatorId,
          sequence: choice.sequence,
        });
        indicatorChoice.save(indicatorChoice).catch((err) => {
          console.log(err);
        });
      });
    });
  });
  res.send({ message: 'oke beres' });
};

module.exports.updateTreeCategory = (req, res) => {
  CategoryIndicator.find({ categoryId: req.body.itemCategoryId }).then((a) => {
    a.forEach((aa) => {
      CategoryIndicator.deleteOne({ id: aa.id });
      IndicatorChoice.deleteMany({ indicatorId: aa.id });
    });
  });

  CategoryIndicator.find({})
    .sort({ id: -1 })
    .limit(1)
    .lean()
    .then((ciData) => {
      let ciCount = ciData[0].id;
      IndicatorChoice.find({})
        .sort({ id: -1 })
        .limit(1)
        .lean()
        .then((icData) => {
          let icCount = icData[0].id;
          ItemCategory.findOneAndUpdate(
            {
              itemCategoryId: req.body.itemCategoryId,
            },
            {
              categoryName: req.body.categoryName,
              sequence: req.body.sequence,
            }
          );
          req.body.categoryIndicators.forEach((indicator, i) => {
            const categoryIndicator = new CategoryIndicator({
              categoryId: req.body.itemCategoryId,
              // eslint-disable-next-line no-plusplus
              id: ++ciCount,
              indicatorName: indicator.indicatorName,
              sequence: i + 1,
            });
            categoryIndicator.save(categoryIndicator);
            indicator.indicatorChoices.forEach((choice, j) => {
              const indicatorChoice = new IndicatorChoice({
                indicatorId: ciCount,
                // eslint-disable-next-line no-plusplus
                id: ++icCount,
                choiceName: choice.choiceName,
                decrement: choice.decrement,
                sequence: j + 1,
              });
              indicatorChoice.save(indicatorChoice);
            });
          });
        })
        .catch((err) => {
          res.send({ message: err.message });
        });
      res.send({
        data: [],
        message: 'Indikator dan pilihan berhasil dimodifikasi',
        status: 'SUCCESS',
      });
    })
    .catch((err) => {
      res.send({ message: err.message });
    });
};
