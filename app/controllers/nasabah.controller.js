const moment = require('moment-timezone');
const mongoose = require('mongoose');
const db = require('../models/index.js');

moment.locale('id');
const Nasabah = db.nasabah;
const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};

module.exports.create = (req, res) => {
  const nasabah = new Nasabah({
    ...req.body,
    modifiedBy: req.body.modifiedBy,
    modifiedAt: Date.now(),
  });
  nasabah
    .save(nasabah)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({
        message: err.message || 'Terjadi masalah saat pembuatan data nasabah',
      });
    });
};

const aggregate = (filter) =>
  Nasabah.aggregate([
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
                identitasKtp: {
                  $regex: filter.filter,
                  $options: 'i',
                },
              },
              {
                identitasSim: {
                  $regex: filter.filter,
                  $options: 'i',
                },
              },
              {
                identitasNpwp: {
                  $regex: filter.filter,
                  $options: 'i',
                },
              },
              {
                nama_nasabah: {
                  $regex: filter.filter,
                  $options: 'i',
                },
              },
              {
                nomor_hp: {
                  $regex: filter.filter,
                  $options: 'i',
                },
              },
            ],
          },
        ],
      },
    },
    {
      $project: {
        createdAt: 1,
        // tipe_identitas: 1,
        // nomor_identitas: 1,
        identitasKtp: 1,
        identitasSim: 1,
        identitasNpwp: 1,
        nama_nasabah: 1,
        nomor_hp: 1,
        nomor_hp_darurat: 1,
        alamat_sekarang: 1,
        provinsi_sekarang: 1,
        status_hubungan: 1,
      },
    },
    // {
    //   $addFields: {
    //     identitas: {
    //       // $concat: ["$identitasKtp", "$identitasSim", "$identitasNpwp"],
    //       $concat: [
    //         "KTP: ",
    //         { $ifNull: ["$identitasKtp", ""] },
    //         "\nSIM: ",
    //         { $ifNull: ["$identitasSim", ""] },
    //         "\nNPWP: ",
    //         { $ifNull: ["$identitasNpwp", ""] },
    //       ],
    //     },
    //   },
    // },
  ]);

module.exports.findAll = (req, res) => {
  const { limit, offset } = getPagination(
    req.body.pageNumber - 1,
    req.body.pageSize
  );
  Nasabah.aggregatePaginate(aggregate(req.body), {
    sort: { [req.body.sortField]: req.body.sortOrder },
    lean: true,
    limit,
    offset,
  })
    .then((data) => {
      const formattedData = data;
      formattedData.docs.forEach((x, i) => {
        const date = moment.tz(x.createdAt, 'Asia/Jakarta').format('lll');
        formattedData.docs[i].createdAt = date;
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
          err.message ||
          'Terjadi kesalahan pada saat menampilkan data nasabah.',
      });
    });
};

module.exports.findOne = (req, res) => {
  Nasabah.aggregate([
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
          { _id: mongoose.Types.ObjectId(req.params.id) },
        ],
      },
    },
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
        identitas: {
          $concat: ['$tipe_identitas', ' ', '$nomor_identitas'],
        },
      },
    },
    {
      $project: {
        'modifiedBy.username': 0,
        'modifiedBy.password': 0,
        'modifiedBy.peran_user': 0,
        'modifiedBy.status_user': 0,
        'modifiedBy.kode_cabang': 0,
        'modifiedBy.createdAt': 0,
        'modifiedBy.updatedAt': 0,
      },
    },
  ])
    // Nasabah.find({ _id: mongoose.Types.ObjectId(req.params.id) })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: 'Data nasabah tidak ditemukan.',
        });
      } else {
        res.send(data[0]);
      }
    })
    .catch(() => {
      res.status(500).send({
        message: 'Terjadi kesalahan pada pencarian data nasabah.',
      });
    });
};

module.exports.findByIdentity = (req, res) => {
  // Nasabah.find({
  //   $or: [
  //     { identitasKtp: req.body.nomor_identitas },
  //     { identitasSim: req.body.nomor_identitas },
  //     { identitasNpwp: req.body.nomor_identitas },
  //   ],
  // })
  //   .then((data) => {
  //     res.send(data);
  //   })
  //   .catch((err) => {
  //     res.status(500).send({ message: err.message });
  //   });
  switch (req.body.typeIdentity) {
    case 'KTP':
      Nasabah.find({
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
          { identitasKtp: req.body.noIdentity },
        ],
      })
        .lean()
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message,
          });
        });
      break;
    case 'SIM':
      Nasabah.find({
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
          { identitasSim: req.body.noIdentity },
        ],
      })
        .lean()
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message,
          });
        });
      break;
    case 'NPWP':
      Nasabah.find({
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
          { identitasNpwp: req.body.noIdentity },
        ],
      })
        .lean()
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message,
          });
        });
      break;
    default:
      res.status(500).send({});
      break;
  }
};

module.exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Data nasabah tidak boleh kosong!',
    });
  } else {
    const { id } = req.params;
    Nasabah.findByIdAndUpdate(
      id,
      {
        ...req.body,
        modifiedAt: Date.now(),
      },
      { useFindAndModify: false }
    )
      .lean()
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: 'Data nasabah tidak dapat diperbarui.',
          });
        } else {
          res.send({
            ...data,
            message: 'Data nasabah sukses diperbarui.',
          });
        }
      })
      .catch(() => {
        res.status(500).send({
          message: 'Terjadi kesalahan saat memperbarui data nasabah.',
        });
      });
  }
};

module.exports.delete = (req, res) => {
  const { id } = req.params;

  Nasabah.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { useFindAndModify: false }
  )
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: 'Data nasabah tidak dapat dihapus.',
        });
      } else {
        res.send({
          message: 'Data nasabah sukses dihapus.',
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: 'Terjadi kesalahan saat menghapus data nasabah.',
      });
    });
};

module.exports.migrateNasabah = (req, res, next) => {
  // let ktp = undefined,
  //   sim = undefined,
  //   npwp = undefined;
  // item.customeridentities.forEach((identity) => {
  //   if (identity.identityType === "KTP") {
  //     ktp = identity.identityCode;
  //   } else if (identity.identityType === "SIM") {
  //     sim = identity.identityCode;
  //   } else if (identity.identityType === "NPWP") {
  //     npwp = identity.identityCode;
  //   }
  // });
  req.body.forEach((item) => {
    const nasabah = new Nasabah({
      // nomor_telepon_rumah: item.homePhone,
      // nama_nasabah: item.customerName,
      // // tipe_identitas: item.customeridentities[0].identityType,
      // // nomor_identitas: item.customeridentities[0].identityCode,
      // identitasKtp: ktp,
      // identitasSim: sim,
      // identitasNpwp: npwp,
      // // identitas: {
      // //   ktp: ktp,
      // //   sim: sim,
      // //   npwp: npwp,
      // // },
      // tempat_lahir: item.birthPlace,
      // nomor_hp: item.phoneNumber,
      // nama_ibu_kandung: item.motherVirginName,
      // nama_darurat: item.urgentName,
      // nomor_hp_darurat: item.urgentPhone,
      // status_hubungan: item.urgentRelationship,
      // alamat_ktp: item.address1,
      // provinsi_ktp: item.regency1.slice(0, 2),
      // kota_ktp: item.regency1,
      // kecamatan_ktp: item.district1,
      // kelurahan_ktp: item.village1,
      // alamat_sekarang: item.address2,
      // provinsi_sekarang: item.regency2.slice(0, 2),
      // kota_sekarang: item.regency2,
      // kecamatan_sekarang: item.district2,
      // kelurahan_sekarang: item.village2,
      // modifiedBy: mongoose.Types.ObjectId("6130647b45490182c153711c"),
      // tanggal_lahir: new Date(item.birthDate),
      // modifiedAt: Date.now(),
      // createdAt: Date.now(),

      nomor_telepon_rumah: item.nomor_telepon_rumah,
      nama_nasabah: item.nama_nasabah,
      identitasKtp: item.identitasKtp,
      identitasSim: item.identitasSim,
      identitasNpwp: item.identitasNpwp,
      tempat_lahir: item.tempat_lahir,
      nomor_hp: item.nomor_hp,
      nama_ibu_kandung: item.nama_ibu_kandung,
      nama_darurat: item.nama_darurat,
      nomor_hp_darurat: item.nomor_hp_darurat,
      status_hubungan: item.status_hubungan,
      alamat_ktp: item.alamat_ktp,
      provinsi_ktp: item.provinsi_ktp,
      kota_ktp: item.kota_ktp,
      kecamatan_ktp: item.kecamatan_ktp,
      kelurahan_ktp: item.kelurahan_ktp,
      alamat_sekarang: item.alamat_sekarang,
      provinsi_sekarang: item.provinsi_sekarang,
      kota_sekarang: item.kota_sekarang,
      kecamatan_sekarang: item.kecamatan_sekarang,
      kelurahan_sekarang: item.kelurahan_sekarang,
      modifiedBy: mongoose.Types.ObjectId('6130647b45490182c153711c'),
      tanggal_lahir: new Date(item.tanggal_lahir),
      modifiedAt: Date.now(),
      createdAt: Date.now(),
    });

    nasabah.save(nasabah).catch((err) => {
      console.log(err.message);
      next();
    });
  });
  res.send('oke');
};

module.exports.fixNasabah = (req, res) => {
  Nasabah.find({})
    .then((items) => {
      items.forEach((item) => {
        if (typeof item.identitasKtp === 'undefined') {
          Nasabah.findOneAndUpdate(
            // eslint-disable-next-line no-underscore-dangle
            { _id: mongoose.Types.ObjectId(item._id) },
            {
              identitasKtp: '-',
            },
            { useFindAndModify: false }
          )
            .then(() => {})
            .catch((err) => {
              console.log(err.message);
            });
        }
        if (typeof item.identitasSim === 'undefined') {
          Nasabah.findOneAndUpdate(
            // eslint-disable-next-line no-underscore-dangle
            { _id: mongoose.Types.ObjectId(item._id) },
            {
              identitasSim: '-',
            },
            { useFindAndModify: false }
          )
            .then(() => {})
            .catch((err) => {
              console.log(err.message);
            });
        }
        if (typeof item.identitasNpwp === 'undefined') {
          Nasabah.findOneAndUpdate(
            // eslint-disable-next-line no-underscore-dangle
            { _id: mongoose.Types.ObjectId(item._id) },
            {
              identitasNpwp: '-',
            },
            { useFindAndModify: false }
          )
            .then(() => {})
            .catch((err) => {
              console.log(err.message);
            });
        }
      });
      res.send('oke beres');
    })
    .catch(() => {});
};
