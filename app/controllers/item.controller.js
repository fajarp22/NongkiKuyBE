const moment = require('moment-timezone');
const mongoose = require('mongoose');
const db = require('../models/index.js');

const Item = db.item;
moment.locale('id');
const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};

const aggregate = (filter) =>
  Item.aggregate([
    {
      $lookup: {
        from: 'itemcategories',
        localField: 'itemCategoryId',
        foreignField: 'id',
        as: 'itemcategory',
      },
    },
    { $unwind: '$itemcategory' },
    {
      $match: {
        $and: [
          {
            $or: [
              {
                isDeleted: { $exists: false },
              },
              {
                isDeleted: false,
              },
            ],
          },
          {
            $or: [
              {
                itemName: {
                  $regex: filter.searchText.replace(
                    /[.*+?^${}()|[\]\\]/g,
                    '\\$&'
                  ),
                  $options: 'i',
                },
              },
              {
                itemCode: {
                  $regex: filter.searchText.replace(
                    /[.*+?^${}()|[\]\\]/g,
                    '\\$&'
                  ),
                  $options: 'i',
                },
              },
              {
                'itemcategory.categoryName': {
                  $regex: filter.searchText.replace(
                    /[.*+?^${}()|[\]\\]/g,
                    '\\$&'
                  ),
                  $options: 'i',
                },
              },
              {
                itemPrice: {
                  $regex: filter.searchText.replace(
                    /[.*+?^${}()|[\]\\]/g,
                    '\\$&'
                  ),
                  $options: 'i',
                },
              },
            ],
          },
          {
            'itemcategory.categoryName': {
              $regex: filter.category.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
              $options: 'i',
            },
          },
        ],
      },
    },
    {
      $addFields: {
        itemCode: { $toInt: '$itemCode' },
        itemPrice: { $toInt: '$itemPrice' },
      },
    },
  ]);

module.exports.create = (req, res) => {
  console.log(req.body);
  Item.find({})
    .sort({ id: -1 })
    .limit(1)
    .lean()
    .then((data) => {
      // const id = parseInt(data[0].itemCode, 10) + 1;
      const x = new Item(
        // {
        // id,
        // itemCategoryId: req.body.itemCategoryId,
        // itemCode: req.body.itemCode,
        // itemName: req.body.itemName,
        // itemPrice: req.body.itemPrice,
        // modifiedBy: req.body.modifiedBy,
        // modifiedAt: Date.now(),
        // }
        req.body
      );
      x.save(x)
        .then((result) => {
          res.send(result);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || 'Terjadi kesalahan pada saat pembuatan barang.',
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Terjadi kesalahan pada saat pembuatan barang.',
      });
    });
};

module.exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Data barang tidak boleh kosong!',
    });
  }
  const { id } = req.params;
  const x = {
    itemName: req.body.itemName,
    itemPrice: req.body.itemPrice,
    modifiedBy: req.body.modifiedBy,
    modifiedAt: Date.now(),
  };
  Item.findByIdAndUpdate(id, x, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: 'Data barang tidak dapat ditemukan.',
        });
      } else res.send({ message: 'Data barang sukses diperbarui.' });
    })
    .catch(() => {
      res.status(500).send({
        message: 'Terjadi kesalahan saat memperbarui data barang.',
      });
    });
};

module.exports.delete = (req, res) => {
  const { id } = req.params;
  Item.findByIdAndUpdate(id, { isDeleted: true }, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: 'Data barang tidak dapat ditemukan.',
        });
      } else {
        res.send({
          message: 'Data barang sukses dihapus.',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Terjadi kesalahan saat menghapus data barang.',
      });
    });
};

module.exports.findAll = (req, res) => {
  const { limit, offset } = getPagination(
    req.body.pageNumber - 1,
    req.body.pageSize
  );

  Item.aggregatePaginate(aggregate(req.body.filter), {
    sort: { [req.body.sortField]: req.body.sortOrder },
    lean: true,
    limit,
    offset,
  })
    .then((data) => {
      const formattedData = data;
      formattedData.docs.forEach((x, i) => {
        // eslint-disable-next-line no-underscore-dangle
        formattedData.docs[i].id = x._id;
      });

      res.send({
        entities: formattedData.docs,
        totalCount: formattedData.totalDocs,
        errorMessage: '',
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Terjadi kesalahan pada saat menampilkan data barang.',
      });
    });
};

module.exports.findAll2 = (req, res) => {
  Item.aggregate([
    {
      $lookup: {
        from: 'itemcategories',
        localField: 'itemCategoryId',
        foreignField: 'id',
        as: 'itemcategory',
      },
    },
    { $unwind: '$itemcategory' },
    {
      $addFields: {
        itemCode: { $toInt: '$itemCode' },
        itemPrice: { $toInt: '$itemPrice' },
      },
    },
    {
      $project: {
        // id: 1,
        itemCategoryId: 1,
        itemCode: 1,
        itemName: 1,
        itemPrice: 1,
        // "itemcategory.categoryName": 1,
        // "itemcategory.id": 1,
        // "itemcategory.parentId": 1,
        // "itemcategory.sequence": 1,
        category: '$itemcategory.categoryName',
      },
    },
  ]).then((data) => res.send(data));
};

module.exports.findOne = (req, res) => {
  const { id } = req.params;
  Item.aggregate([
    {
      $match: { id: parseInt(id, 10) },
    },
    {
      $lookup: {
        from: 'itemcategories',
        localField: 'itemCategoryId',
        foreignField: 'id',
        as: 'itemcategory',
      },
    },
    { $unwind: '$itemcategory' },
    {
      $addFields: {
        itemCode: { $toInt: '$itemCode' },
        itemPrice: { $toInt: '$itemPrice' },
      },
    },
    {
      $project: {
        id: 1,
        itemCategoryId: 1,
        itemCode: 1,
        itemName: 1,
        itemPrice: 1,
        createdAt: 1,
        'itemcategory.categoryName': 1,
        'itemcategory.id': 1,
        'itemcategory.parentId': 1,
        'itemcategory.sequence': 1,
      },
    },
    {
      $addFields: {
        itemParentId: '$itemcategory.parentId',
      },
    },
  ]).then((data) => {
    res.send({
      data,
    });
  });
};

module.exports.findOneById = (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id);
  Item.aggregate([
    {
      $match: { _id: id },
    },
    {
      $lookup: {
        from: 'itemcategories',
        localField: 'itemCategoryId',
        foreignField: 'id',
        as: 'itemcategory',
      },
    },
    { $unwind: '$itemcategory' },
    {
      $lookup: {
        from: 'users',
        localField: 'modifiedBy',
        foreignField: '_id',
        as: 'modifiedBy',
      },
    },
    { $unwind: '$modifiedBy' },
    {
      $addFields: {
        itemCode: { $toInt: '$itemCode' },
        itemPrice: { $toInt: '$itemPrice' },
      },
    },
    {
      $project: {
        id: 1,
        itemCategoryId: 1,
        itemCode: 1,
        itemName: 1,
        itemPrice: 1,
        createdAt: 1,
        editedAt: 1,
        'itemcategory.categoryName': 1,
        'itemcategory.parentId': 1,
        'modifiedBy.nama_user': 1,
        modifiedAt: 1,
      },
    },
    {
      $addFields: {
        modifierName: '$modifiedBy.nama_user',
        itemParentId: '$itemcategory.parentId',
      },
    },
  ]).then((data) => res.send(data[0]));
};

module.exports.findByCategory = (req, res) => {
  const { id } = req.params;
  Item.aggregate([
    {
      $match: {
        $and: [
          {
            $or: [
              {
                isDeleted: { $exists: false },
              },
              {
                isDeleted: false,
              },
            ],
          },
          { itemCategoryId: parseInt(id, 10) },
        ],
      },
    },
    {
      $lookup: {
        from: 'itemcategories',
        localField: 'itemCategoryId',
        foreignField: 'id',
        as: 'itemcategory',
      },
    },
    { $unwind: '$itemcategory' },
    {
      $addFields: {
        itemCode: { $toInt: '$itemCode' },
        itemPrice: { $toInt: '$itemPrice' },
      },
    },
    {
      $project: {
        id: 1,
        // itemCategoryId: 1,
        itemCode: 1,
        itemName: 1,
        itemPrice: 1,
        // "itemcategory.categoryName": 1,
        // "itemcategory.id": 1,
        // "itemcategory.parentId": 1,
        // "itemcategory.sequence": 1,
      },
    },
  ]).then((data) =>
    res.send({
      data: [data],
    })
  );
};

module.exports.generateItemCode = (req, res) => {
  const { id } = req.params;

  Item.find({ itemCategoryId: id })
    .sort({ itemCode: -1 })
    .limit(1)
    .lean()
    .then((data) => res.send({ data: [parseInt(data[0].itemCode, 10) + 1] }));
};

module.exports.generateItemId = (req, res) => {
  Item.find({})
    .sort({ id: -1 })
    .limit(1)
    .lean()
    .then((data) => res.send({ data: [parseInt(data[0].id, 10) + 1] }));
};

module.exports.migrateItems = (req, res, next) => {
  req.body.data.forEach((item) => {
    const x = new Item({
      id: item.id,
      itemCategoryId: item.itemCategoryId,
      itemCode: item.itemCode,
      itemName: item.itemName,
      itemPrice: item.itemPrice,
    });
    x.save(x);
    next();
  });
  res.send({ message: 'oke beres' });
};

module.exports.addInfoMigrate = (req, res) => {
  Item.find({}).then((items) => {
    items.forEach((item) => {
      Item.findOneAndUpdate(
        // eslint-disable-next-line no-underscore-dangle
        { _id: mongoose.Types.ObjectId(item._id) },
        {
          modifiedBy: mongoose.Types.ObjectId('6130647b45490182c153711c'),
        },
        { useFindAndModify: false }
      );
    });
  });
  res.send('oke beres');
};
