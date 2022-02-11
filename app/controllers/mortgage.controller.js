/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
// library import
const mongoose = require('mongoose');
const moment = require('moment-timezone');
const _ = require('lodash');
const fastcsv = require('fast-csv');
const angkaTerbilang = require('@develoka/angka-terbilang-js');
const db = require('../models/index.js');
const print = require('../../resources/dynamic/assets/printMortgage.js');
const printSBPer = require('../../resources/dynamic/assets/printSBPer.js');
const printSBPel = require('../../resources/dynamic/assets/printSBPel.js');

const Mortgage = db.mortgage;
const MortgagePayment = db.mortgagePayment;
const User = db.user;
moment.locale('id');

// function definition
const thousandSeparator = (str) =>
  str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

const capSentence = (text) => {
  const wordsArray = text.toLowerCase().split(' ');
  const capsArray = wordsArray.map((word) => {
    return word[0].toUpperCase() + word.slice(1);
  });
  return capsArray.join(' ');
};

const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};

const customAggregate = () => [
  {
    // branch
    $lookup: {
      from: 'cabangkantors',
      localField: 'branch',
      foreignField: '_id',
      as: 'branch',
    },
  },
  { $unwind: '$branch' },
  {
    // user
    $lookup: {
      from: 'users',
      localField: 'createdBy',
      foreignField: '_id',
      as: 'createdBy',
    },
  },
  { $unwind: '$createdBy' },
  {
    // costumer
    $lookup: {
      from: 'nasabahs',
      localField: 'mortgageCustomer',
      foreignField: '_id',
      as: 'mortgageCustomer',
    },
  },
  { $unwind: '$mortgageCustomer' },
  {
    // item
    $lookup: {
      from: 'items',
      localField: 'item',
      foreignField: '_id',
      as: 'item',
    },
  },
  { $unwind: '$item' },
  {
    // village
    $lookup: {
      from: 'villages',
      localField: 'mortgageCustomer.kelurahan_sekarang',
      foreignField: 'id',
      as: 'mortgageCustomer.village',
    },
  },
  { $unwind: '$mortgageCustomer.village' },
  {
    // disctrict
    $lookup: {
      from: 'districts',
      localField: 'mortgageCustomer.kecamatan_sekarang',
      foreignField: 'id',
      as: 'mortgageCustomer.district',
    },
  },
  { $unwind: '$mortgageCustomer.district' },
  {
    // regency
    $lookup: {
      from: 'regencies',
      localField: 'mortgageCustomer.kota_sekarang',
      foreignField: 'id',
      as: 'mortgageCustomer.regency',
    },
  },
  { $unwind: '$mortgageCustomer.regency' },
  {
    // province
    $lookup: {
      from: 'provinces',
      localField: 'mortgageCustomer.provinsi_sekarang',
      foreignField: 'id',
      as: 'mortgageCustomer.province',
    },
  },
  { $unwind: '$mortgageCustomer.province' },
  // itemCategory
  {
    $lookup: {
      from: 'itemcategories',
      localField: 'item.itemCategoryId',
      foreignField: 'id',
      as: 'itemcategory',
    },
  },
  { $unwind: '$itemcategory' },
  // latestPaymentMortgage
  {
    $lookup: {
      from: 'mortgagepayments',
      localField: 'latestPaymentMortgage',
      foreignField: '_id',
      as: 'latestPaymentMortgage',
    },
  },
  { $unwind: '$latestPaymentMortgage' },
];

// module exports
module.exports.generateCode = (req, res) => {
  const branchCode = req.params.branchcode;
  const timestamp = moment
    .tz(new Date().toISOString(), 'Asia/Jakarta')
    .format('YYYYMMDD');
  Mortgage.find({ createdAt: { $gte: '2021-12-31T17:01:00.000Z' } })
    .countDocuments()
    .then((data) => {
      const order = (data + 1).toLocaleString('en-US', {
        minimumIntegerDigits: 5,
        useGrouping: false,
      });
      const mortgageCode = `${branchCode}-${timestamp}-${order}`;
      res.send({
        data: mortgageCode,
        status: 'success',
        message: 'Data kode SBG sukses dibuat.',
      });
    })
    .catch((err) => {
      res.send({
        status: 'error',
        message: `Data kode SBG gagal dibuat. Error: ${err.message}`,
      });
    });
};

module.exports.create = (req, res) => {
  const mortgage = new Mortgage({
    ...req.body,
  });
  mortgage
    .save(mortgage)
    .then((data) => {
      res.send({
        data,
        status: 'success',
        message: 'Data SBG sukses dibuat.',
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 'error',
        message: `Data SBG gagal dibuat. Error: ${err.message}`,
      });
    });
};

module.exports.findMortgageByCode = () => {
  // message: not used
};

module.exports.findMortgageById = async (req, res) => {
  const mortgageData = await Mortgage.findById(req.params.id).exec();
  let pipeline;
  if (mortgageData.mortgageOriginCode) {
    pipeline = [
      {
        $lookup: {
          from: 'mortgageappraisals',
          localField: 'mortgageOriginCode',
          foreignField: 'mortgageCode',
          as: 'mortgageappraisals',
        },
      },
      {
        $lookup: {
          from: 'mortgagedocuments',
          localField: 'mortgageOriginCode',
          foreignField: 'mortgageCode',
          as: 'mortgagedocuments',
        },
      },
    ];
  } else {
    pipeline = [
      {
        $lookup: {
          from: 'mortgageappraisals',
          localField: 'mortgageCode',
          foreignField: 'mortgageCode',
          as: 'mortgageappraisals',
        },
      },
      {
        $lookup: {
          from: 'mortgagedocuments',
          localField: 'mortgageCode',
          foreignField: 'mortgageCode',
          as: 'mortgagedocuments',
        },
      },
    ];
  }
  Mortgage.aggregate([
    {
      $match: { _id: mongoose.Types.ObjectId(req.params.id) },
    },
    ...customAggregate(),
    ...pipeline,
    {
      $lookup: {
        from: 'mortgagepayments',
        localField: 'mortgageCode',
        foreignField: 'mortgageCode',
        as: 'listPayment',
      },
    },
    {
      $project: {
        mortgageCode: 1,
        createdAt: 1,
        serialNo: 1,
        'mortgageCustomer._id': 1,
        'mortgageCustomer.nama_nasabah': 1,
        'mortgageCustomer.tanggal_lahir': 1,
        'mortgageCustomer.identitasKtp': 1,
        'mortgageCustomer.identitasSim': 1,
        'mortgageCustomer.identitasNpwp': 1,
        'mortgageCustomer.alamat_sekarang': 1,
        'mortgageCustomer.nomor_hp': 1,
        'itemcategory.categoryName': 1,
        'item.itemName': 1,
        'item._id': 1,
        productionYear: 1,
        description: 1,
        serviceReceived: 1,
        serviceInterest: 1,
        serviceLimit: 1,
        serviceOriginValue: 1,
        'mortgageappraisals.indicatorName': 1,
        'mortgageappraisals.choiceName': 1,
        listPayment: 1,
        'mortgagedocuments.documentPath': 1,
        latestPaymentMortgage: 1,
        'branch._id': 1,
        mortgageOriginCode: 1,
        logMortgageCode: 1,
      },
    },
  ])
    .then((data) => {
      res.send({
        length: data.length,
        data,
        status: 'success',
        message: 'Data kode SBG sukses ditemukan.',
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 'error',
        message: `Data kode SBG gagal ditemukan. Error: ${err.message}`,
      });
    });
};

module.exports.findAll = async (req, res) => {
  const loggedUser = await User.findById(req.userId)
    .lean()
    .populate('peran_user')
    .populate('kode_cabang')
    .select('kode_cabang nama_user peran_user');

  const { limit, offset } = getPagination(
    req.body.pageNumber - 1,
    req.body.pageSize
  );

  const pipeline = [];
  pipeline.push(
    {
      // branch
      $lookup: {
        from: 'cabangkantors',
        localField: 'branch',
        foreignField: '_id',
        as: 'branch',
      },
    },
    { $unwind: '$branch' },
    {
      // costumer
      $lookup: {
        from: 'nasabahs',
        localField: 'mortgageCustomer',
        foreignField: '_id',
        as: 'mortgageCustomer',
      },
    },
    { $unwind: '$mortgageCustomer' },
    {
      // item
      $lookup: {
        from: 'items',
        localField: 'item',
        foreignField: '_id',
        as: 'item',
      },
    },
    { $unwind: '$item' },
    {
      $lookup: {
        from: 'itemcategories',
        localField: 'item.itemCategoryId',
        foreignField: 'id',
        as: 'itemcategory',
      },
    },
    { $unwind: '$itemcategory' },
    {
      $lookup: {
        from: 'mortgagepayments',
        localField: 'latestPaymentMortgage',
        foreignField: '_id',
        as: 'latestPaymentMortgage',
      },
    },
    { $unwind: '$latestPaymentMortgage' }
  );

  if (loggedUser.kode_cabang.kode_cabang === 'PUSAT') {
    pipeline.push({
      $match: {
        $or: [
          {
            'mortgageCustomer.nama_nasabah': {
              $regex: req.body.filter.searchText.replace(
                /[.*+?^${}()|[\]\\]/g,
                '\\$&'
              ),
              $options: 'i',
            },
          },
          {
            mortgageCode: {
              $regex: req.body.filter.searchText.replace(
                /[.*+?^${}()|[\]\\]/g,
                '\\$&'
              ),
              $options: 'i',
            },
          },
        ],
      },
    });
  } else {
    pipeline.push({
      $match: {
        'branch._id': loggedUser.kode_cabang._id,
        $or: [
          {
            'mortgageCustomer.nama_nasabah': {
              $regex: req.body.filter.searchText.replace(
                /[.*+?^${}()|[\]\\]/g,
                '\\$&'
              ),
              $options: 'i',
            },
          },
          {
            mortgageCode: {
              $regex: req.body.filter.searchText.replace(
                /[.*+?^${}()|[\]\\]/g,
                '\\$&'
              ),
              $options: 'i',
            },
          },
        ],
      },
    });
  }

  Mortgage.aggregatePaginate(
    Mortgage.aggregate([
      ...pipeline,
      {
        $project: {
          'branch.kode_cabang': 1,
          mortgageCode: 1,
          'mortgageCustomer.nama_nasabah': 1,
          'mortgageCustomer.nomor_hp': 1,
          'mortgageCustomer.identitasSim': 1,
          'mortgageCustomer.identitasKtp': 1,
          'mortgageCustomer.identitasNpwp': 1,
          'itemcategory.categoryName': 1,
          'item.itemName': 1,
          serviceReceived: 1,
          'latestPaymentMortgage.updatedAt': 1,
          'latestPaymentMortgage.paymentStatus': 1,
        },
      },
    ]),
    {
      sort: { [req.body.sortField]: req.body.sortOrder },
      lean: true,
      limit,
      offset,
    }
  )
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

module.exports.printByCode = async (req, res) => {
  const loggedUser = await User.findById(req.userId).exec();
  const { code } = req.params;
  try {
    const [mortgageData] = await Mortgage.find({ mortgageCode: code })
      .select('mortgageCode mortgageOriginCode')
      .exec();
    let addedPipeline;
    if (mortgageData.mortgageOriginCode) {
      addedPipeline = [
        {
          $lookup: {
            from: 'mortgageappraisals',
            localField: 'mortgageOriginCode',
            foreignField: 'mortgageCode',
            as: 'mortgageappraisals',
          },
        },
      ];
    } else {
      addedPipeline = [
        {
          $lookup: {
            from: 'mortgageappraisals',
            localField: 'mortgageCode',
            foreignField: 'mortgageCode',
            as: 'mortgageappraisals',
          },
        },
      ];
    }
    const [mortgage] = await Mortgage.aggregate([
      {
        $match: { mortgageCode: code },
      },
      ...addedPipeline,
      ...customAggregate(),
      {
        $project: {
          'createdBy.nama_user': 1,
          mortgageCode: 1,
          'branch.nama_cabang': 1,
          'mortgageCustomer.nama_nasabah': 1,
          'mortgageCustomer.identitasKtp': 1,
          'mortgageCustomer.identitasSim': 1,
          'mortgageCustomer.identitasNpwp': 1,
          'mortgageCustomer.alamat_sekarang': 1,
          'mortgageCustomer.village.village': 1,
          'mortgageCustomer.district.district': 1,
          'mortgageCustomer.regency.regency': 1,
          'mortgageCustomer.province.province': 1,
          'mortgageCustomer.nomor_telepon_rumah': 1,
          'mortgageCustomer.nomor_hp': 1,
          'itemcategory.categoryName': 1,
          'item.itemName': 1,
          productionYear: 1,
          serialNo: 1,
          description: 1,
          servicePercentage: 1,
          createdAt: 1,
          serviceReceived: 1,
          serviceInterest: 1,
          serviceLimit: 1,
          'mortgageappraisals.indicatorName': 1,
          'mortgageappraisals.choiceName': 1,
        },
      },
    ]).exec();
    let appraisal = '';
    if (_.isArray(mortgage.mortgageappraisals)) {
      mortgage.mortgageappraisals.forEach((indicator, idx) => {
        appraisal += `${indicator.indicatorName} (${indicator.choiceName})${
          idx === mortgage.mortgageappraisals.length - 1 ? '.' : ','
        } `;
      });
    }
    const data = {
      appraisal,
      logo_ojk:
        'https://rumahgadai.s3.ap-southeast-1.amazonaws.com/logo-ojk-min.png',
      logo_rg:
        'https://rumahgadai.s3.ap-southeast-1.amazonaws.com/logo-rg-min.jpeg',
      staffName: loggedUser?.nama_user,
      mortgageCode: mortgage.mortgageCode,
      branchName: mortgage.branch.nama_cabang,
      dateHour: moment.tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm'),
      customerName: mortgage.mortgageCustomer.nama_nasabah,
      customerIdentity: `${mortgage.mortgageCustomer.identitasKtp} / ${mortgage.mortgageCustomer.identitasSim} / ${mortgage.mortgageCustomer.identitasNpwp}`,
      currentAddress: mortgage.mortgageCustomer.alamat_sekarang,
      currentVillage: mortgage.mortgageCustomer.village.village,
      currentDistrict: mortgage.mortgageCustomer.district.district,
      currentRegency: mortgage.mortgageCustomer.regency.regency,
      currentProvince: mortgage.mortgageCustomer.province.province,
      noTelp: mortgage.mortgageCustomer.nomor_telepon_rumah,
      noPhone: mortgage.mortgageCustomer.nomor_hp,
      itemCategory: mortgage.itemcategory.categoryName,
      itemName: mortgage.item.itemName,
      productionYear: mortgage.productionYear,
      serialNo: mortgage.serialNo,
      description: mortgage.description,
      servicePercentage: `${mortgage.servicePercentage}%`,
      dueDate: moment
        .tz(mortgage.createdAt, 'Asia/Jakarta')
        .add(29, 'days')
        .format('DD-MM-YYYY'),
      dateOnly: moment().format('DD-MM-YYYY'),
      serviceReceived: `Rp. ${thousandSeparator(
        mortgage.serviceReceived
      )} (${capSentence(angkaTerbilang(mortgage.serviceReceived))} Rupiah)`,
      serviceInterest: `Rp. ${thousandSeparator(
        mortgage.serviceInterest
      )} (${capSentence(angkaTerbilang(mortgage.serviceInterest))} Rupiah)`,
      serviceLimit: `Rp. ${thousandSeparator(
        mortgage.serviceLimit
      )} (${capSentence(angkaTerbilang(mortgage.serviceLimit))} Rupiah)`,
    };
    res.send(print(data));
  } catch (error) {
    res.status(500).send({
      status: 'error',
      message: `Data appraisal SBG tidak ditemukan. Error: ${error.message}`,
    });
  }
};

module.exports.printById = () => {
  // message: not used
};

module.exports.printSBPer = async (req, res) => {
  try {
    const loggedUser = await User.findById(req.userId).exec();
    const [mortgagePayment] = await MortgagePayment.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId(req.params.id) },
      },
      {
        $lookup: {
          from: 'mortgages',
          localField: 'mortgageCode',
          foreignField: 'mortgageCode',
          as: 'mortgage',
        },
      },
      { $unwind: '$mortgage' },
      {
        $lookup: {
          from: 'cabangkantors',
          localField: 'mortgage.branch',
          foreignField: '_id',
          as: 'branch',
        },
      },
      { $unwind: '$branch' },
      {
        $lookup: {
          from: 'users',
          localField: 'mortgage.createdBy',
          foreignField: '_id',
          as: 'createdBy',
        },
      },
      { $unwind: '$createdBy' },
      {
        $lookup: {
          from: 'nasabahs',
          localField: 'mortgage.mortgageCustomer',
          foreignField: '_id',
          as: 'mortgageCustomer',
        },
      },
      { $unwind: '$mortgageCustomer' },
      {
        $lookup: {
          from: 'items',
          localField: 'mortgage.item',
          foreignField: '_id',
          as: 'item',
        },
      },
      { $unwind: '$item' },
      {
        $project: {
          'createdBy.nama_user': 1,
          mortgageCode: 1,
          'branch.nama_cabang': 1,
          'mortgageCustomer.nama_nasabah': 1,
          'item.itemName': 1,
          paymentLeft: 1,
          interestValue: 1,
          createdAt: 1,
        },
      },
    ]).exec();
    const data = {
      logo_ojk:
        'https://rumahgadai.s3.ap-southeast-1.amazonaws.com/logo-ojk-min.png',
      logo_rg:
        'https://rumahgadai.s3.ap-southeast-1.amazonaws.com/logo-rg-min.jpeg',
      mortgageCode: mortgagePayment.mortgageCode,
      branchName: mortgagePayment.branch.nama_cabang,
      serviceReceived: `Rp. ${thousandSeparator(
        mortgagePayment.paymentLeft
      )} (${capSentence(angkaTerbilang(mortgagePayment.paymentLeft))} Rupiah)`,
      serviceInterest: `Rp. ${thousandSeparator(
        mortgagePayment.interestValue
      )} (${capSentence(
        angkaTerbilang(mortgagePayment.interestValue)
      )} Rupiah)`,
      customerName: mortgagePayment.mortgageCustomer.nama_nasabah,
      staffName: loggedUser.nama_user,
      itemName: mortgagePayment.item.itemName,
      dateHour: moment.tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm'),
      dueDate: moment
        .tz(mortgagePayment.createdAt, 'Asia/Jakarta')
        .add(29, 'days')
        .format('DD-MM-YYYY'),
    };
    res.send(printSBPer(data));
  } catch (error) {
    res.status(500).send({
      status: 'error',
      message: `Data kode SBG gagal ditemukan. Error: ${error.message}`,
    });
  }
};

module.exports.printSBPel = async (req, res) => {
  try {
    const loggedUser = await User.findById(req.userId).exec();
    const [mortgagePayment] = await MortgagePayment.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId(req.params.id) },
      },
      {
        $lookup: {
          from: 'mortgages',
          localField: 'mortgageCode',
          foreignField: 'mortgageCode',
          as: 'mortgage',
        },
      },
      { $unwind: '$mortgage' },
      {
        $lookup: {
          from: 'cabangkantors',
          localField: 'mortgage.branch',
          foreignField: '_id',
          as: 'branch',
        },
      },
      { $unwind: '$branch' },
      {
        $lookup: {
          from: 'users',
          localField: 'mortgage.createdBy',
          foreignField: '_id',
          as: 'createdBy',
        },
      },
      { $unwind: '$createdBy' },
      {
        $lookup: {
          from: 'nasabahs',
          localField: 'mortgage.mortgageCustomer',
          foreignField: '_id',
          as: 'mortgageCustomer',
        },
      },
      { $unwind: '$mortgageCustomer' },
      {
        $lookup: {
          from: 'items',
          localField: 'mortgage.item',
          foreignField: '_id',
          as: 'item',
        },
      },
      { $unwind: '$item' },
      {
        $project: {
          'createdBy.nama_user': 1,
          mortgageCode: 1,
          'branch.nama_cabang': 1,
          'mortgageCustomer.nama_nasabah': 1,
          'item.itemName': 1,
          paymentLeft: 1,
          interestValue: 1,
          createdAt: 1,
          paymentStatus: 1,
          paymentValue: 1,
        },
      },
    ]).exec();
    const data = {
      status: mortgagePayment.paymentStatus === 'Repayment' ? 'SEBAGIAN' : '',
      logo_ojk:
        'https://rumahgadai.s3.ap-southeast-1.amazonaws.com/logo-ojk-min.png',
      logo_rg:
        'https://rumahgadai.s3.ap-southeast-1.amazonaws.com/logo-rg-min.jpeg',
      mortgageCode: mortgagePayment.mortgageCode,
      branchName: mortgagePayment.branch.nama_cabang,
      serviceReceived: `Rp. ${thousandSeparator(
        mortgagePayment.paymentLeft
      )} (${capSentence(angkaTerbilang(mortgagePayment.paymentLeft))} Rupiah)`,
      serviceInterest: `Rp. ${thousandSeparator(
        mortgagePayment.interestValue
      )} (${capSentence(
        angkaTerbilang(mortgagePayment.interestValue)
      )} Rupiah)`,
      customerName: mortgagePayment.mortgageCustomer.nama_nasabah,
      staffName: loggedUser.nama_user,
      itemName: mortgagePayment.item.itemName,
      dateHour: moment.tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm'),
      dueDate: moment
        .tz(mortgagePayment.createdAt, 'Asia/Jakarta')
        .add(29, 'days')
        .format('DD-MM-YYYY'),
      paymentValue: `Rp. ${thousandSeparator(
        parseInt(mortgagePayment.paymentValue, 10) +
          parseInt(mortgagePayment.interestValue, 10)
      )} (${capSentence(
        angkaTerbilang(
          parseInt(mortgagePayment.paymentValue, 10) +
            parseInt(mortgagePayment.interestValue, 10)
        )
      )} Rupiah)`,
      paymentLatest: `Rp. ${thousandSeparator(
        parseInt(mortgagePayment.paymentValue, 10) +
          parseInt(mortgagePayment.paymentLeft, 10)
      )} (${capSentence(
        angkaTerbilang(
          parseInt(mortgagePayment.paymentValue, 10) +
            parseInt(mortgagePayment.paymentLeft, 10)
        )
      )} Rupiah)`,
    };
    res.send(printSBPel(data));
  } catch (error) {
    res.status(500).send({
      status: 'error',
      message: `Data kode SBG gagal ditemukan. Error: ${error.message}`,
    });
  }
};

module.exports.checkIdentityMortgage = (req, res) => {
  const mortgageCustomer = req.params.id;
  Mortgage.find({ mortgageCustomer })
    .populate('item')
    .populate('latestPaymentMortgage')
    .lean()
    .then((data) => {
      const filteredData = data.filter(
        (x) =>
          x.latestPaymentMortgage.paymentStatus !== 'Completed' &&
          x.latestPaymentMortgage.paymentStatus !== 'Mortgaged' &&
          x.latestPaymentMortgage.paymentStatus !== 'Repayment' &&
          x.latestPaymentMortgage.paymentStatus !== 'Overdue'
      );
      let status = 'success';
      let message = 'Data nasabah dapat digunakan.';
      if (
        req.params.itemCategoryId === '7' &&
        filteredData.filter((x) => x.item.itemCategoryId === 7).length >= 2
      ) {
        status = 'error';
        message =
          'Nasabah mempunyai dua transaksi dengan kategori Laptop yang sedang berjalan.';
      } else if (
        req.params.itemCategoryId === '6' &&
        filteredData.filter((x) => x.item.itemCategoryId === 6).length >= 2
      ) {
        status = 'error';
        message =
          'Nasabah mempunyai dua transaksi dengan kategori Handphone/Ipad/Tab yang sedang berjalan.';
      } else if (filteredData.length >= 5) {
        status = 'error';
        message = 'Nasabah mempunyai lima transaksi yang sedang berjalan.';
      } else if (
        req.params.itemCategoryId !== '7' &&
        req.params.itemCategoryId !== '6' &&
        filteredData.filter(
          (x) => x.item.itemCategoryId !== 6 && x.item.itemCategoryId !== 7
        ).length >= 1
      ) {
        status = 'error';
        message =
          'Nasabah mempunyai satu transaksi dengan kategori barang lainnya yang sedang berjalan.';
      }
      res.send({
        status,
        message,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 'error',
        message: `Data nasabah gagal ditemukan. Error: ${err.message}`,
      });
    });
};

module.exports.checkExtend = (req, res) => {
  const mortgageCode = req.params.mortgagecode;
  MortgagePayment.find({ mortgageCode }).then((data) => {
    let countExtend = 0;
    data.forEach((mortgage) => {
      if (mortgage.paymentStatus === 'Extend') {
        countExtend += 1;
      } else {
        countExtend = 0;
      }
    });
    if (countExtend < 3) {
      res.send({
        status: 'success',
        message: 'Data Gadai belum melebihi tiga kali perpanjangan',
      });
    } else {
      res.send({
        status: 'error',
        message: 'Data Gadai sudah melebihi tiga kali perpanjangan',
      });
    }
  });
};

module.exports.generateStockOpname = (req, res) => {
  const { code } = req.params;
  Mortgage.aggregate([
    {
      $match: {
        mortgageCode: {
          $regex: code.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
          $options: 'i',
        },
        isDeleted: false,
      },
    },
    {
      // branch
      $lookup: {
        from: 'cabangkantors',
        localField: 'branch',
        foreignField: '_id',
        as: 'branch',
      },
    },
    { $unwind: '$branch' },
    {
      // costumer
      $lookup: {
        from: 'nasabahs',
        localField: 'mortgageCustomer',
        foreignField: '_id',
        as: 'mortgageCustomer',
      },
    },
    { $unwind: '$mortgageCustomer' },
    {
      // item
      $lookup: {
        from: 'items',
        localField: 'item',
        foreignField: '_id',
        as: 'item',
      },
    },
    { $unwind: '$item' },
    // itemCategory
    {
      $lookup: {
        from: 'itemcategories',
        localField: 'item.itemCategoryId',
        foreignField: 'id',
        as: 'itemcategory',
      },
    },
    { $unwind: '$itemcategory' },
    // latestPaymentMortgage
    {
      $lookup: {
        from: 'mortgagepayments',
        localField: 'latestPaymentMortgage',
        foreignField: '_id',
        as: 'latestPaymentMortgage',
      },
    },
    { $unwind: '$latestPaymentMortgage' },
    {
      $project: {
        _id: 0,
        No: '0',
        'No SBG': '$mortgageCode',
        Cabang: '$branch.nama_cabang',
        'Nama Nasabah': '$mortgageCustomer.nama_nasabah',
        'Kategori Barang': '$itemcategory.categoryName',
        'Nama Barang': '$item.itemName',
        'Nilai Pencairan': '$serviceReceived',
        'Tanggal Jatuh Tempo Terbaru': '$latestPaymentMortgage.paymentDate',
        'Status Barang': '$latestPaymentMortgage.paymentStatus',
      },
    },
  ]).then((mortgage) => {
    const mortgageUncomplete = mortgage.filter((data) => {
      return data['Status Barang'] !== 'Completed';
    });
    mortgageUncomplete.forEach((data, i) => {
      data.No = i + 1;
      const temp = data['Tanggal Jatuh Tempo Terbaru'];
      data['Tanggal Jatuh Tempo Terbaru'] = moment
        .tz(data['Tanggal Jatuh Tempo Terbaru'], 'Asia/Jakarta')
        .format('ll');
      data['Tanggal Sekarang'] = moment.tz('Asia/Jakarta').format('ll');
      data['Lewat Hari'] = moment
        .tz('Asia/Jakarta')
        .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
        .diff(
          moment
            .tz(temp, 'Asia/Jakarta')
            .set({ hour: 0, minute: 0, second: 0, millisecond: 0 }),
          'days'
        );
    });
    res.writeHead(200, {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename=SO ${code} (${moment
        .tz('Asia/Jakarta')
        .format('lll')}).csv`,
    });
    fastcsv
      .write(mortgageUncomplete, {
        headers: [
          'No',
          'No SBG',
          'Cabang',
          'Nama Nasabah',
          'Kategori Barang',
          'Nama Barang',
          'Nilai Pencairan',
          'Tanggal Jatuh Tempo Terbaru',
          'Tanggal Sekarang',
          'Lewat Hari',
          'Status Barang',
        ],
      })
      .pipe(res);
  });
};

module.exports.scanMortgage = async () => {
  console.log('Cron scanMortgage started.');
  const startDate = moment
    .tz('Asia/Jakarta')
    .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
    .subtract(100, 'days')
    .toISOString();
  const endDate = moment
    .tz('Asia/Jakarta')
    .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
    .subtract(43, 'days')
    .toISOString();
  let idSystem = '';
  switch (process.env.STATUS) {
    case 'dummy':
      idSystem = '61c41ddd6daf502a7d352cf0';
      break;
    case 'development':
      idSystem = '61c41bf32c09a7281de7e0d5';
      break;
    case 'test':
      idSystem = '61c41af01d938e24ecdc0ae3';
      break;
    default:
      break;
  }
  const dataMortgage = await Mortgage.find({
    // TODO: updatedAt not working
    isDeleted: false,
    updatedAt: { $gte: startDate, $lt: endDate },
  })
    .select('mortgageCode mortgageOriginCode')
    .populate('latestPaymentMortgage', 'paymentStatus updatedAt paymentLeft')
    .lean()
    .exec();

  dataMortgage.forEach(async (data) => {
    console.log('loop');
    const duration = moment
      .tz('Asia/Jakarta')
      .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
      .diff(
        moment
          .tz(data.latestPaymentMortgage.updatedAt, 'Asia/Jakarta')
          .set({ hour: 0, minute: 0, second: 0, millisecond: 0 }),
        'days'
      );
    if (
      duration > 45 &&
      data.latestPaymentMortgage.paymentStatus !== 'Completed' &&
      data.latestPaymentMortgage.paymentStatus !== 'Mortgaged' &&
      data.latestPaymentMortgage.paymentStatus !== 'Repayment' &&
      data.latestPaymentMortgage.paymentStatus !== 'Overdue'
    ) {
      console.log('hit');
      const mortgagePayment = new MortgagePayment({
        paymentDate: Date.now(),
        paymentStatus: 'Overdue',
        paymentLeft: data.latestPaymentMortgage.paymentLeft,
        paymentValue: 0,
        interestValue: 0,
        mortgageCode: data.mortgageCode,
        createdBy: idSystem,
      });
      const payment = await mortgagePayment.save(mortgagePayment);
      await Mortgage.findByIdAndUpdate(
        data._id,
        { latestPaymentMortgage: payment._id },
        { useFindAndModify: false }
      );
    }
  });
  console.log('Cron scanMortgage ended.');
};

module.exports.makeMortgageObsolete = (req, res) => {
  const { id } = req.params;
  Mortgage.findByIdAndUpdate(id, { isObsolete: true })
    .then(() => {
      res.send({
        status: 'success',
        message: 'Data pembayaran SBG sukses diusangkan.',
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 'error',
        message: `Data pembayaran SBG gagal diusangkan. Error: ${err.message}`,
      });
    });
};

module.exports.addMortgageLog = async (req, res) => {
  const { id } = req.body;
  const { oldMortgageCode } = req.body;
  try {
    await Mortgage.findByIdAndUpdate(id, {
      $push: { logMortgageCode: oldMortgageCode },
    });
    res.send({
      status: 'success',
      message: 'Data log SBG sukses ditambahkan.',
    });
  } catch (error) {
    res.send({
      status: 'error',
      message: `Data log SBG gagal ditambahkan. Error: ${error.message}`,
    });
  }
};
