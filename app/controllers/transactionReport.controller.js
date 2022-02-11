// const mongoose = require('mongoose');
const excelJS = require('exceljs');
const moment = require('moment-timezone');
const path = require('path');
// const _ = require('lodash');
// const fastcsv = require('fast-csv');
// const angkaTerbilang = require('@develoka/angka-terbilang-js');
const db = require('../models/index.js');
// const print = require('../../resources/dynamic/assets/printMortgage.js');
// const printSBPer = require('../../resources/dynamic/assets/printSBPer.js');
// const printSBPel = require('../../resources/dynamic/assets/printSBPel.js');

// const Mortgage = db.mortgage;
const MortgagePayment = db.mortgagePayment;
const BranchBalance = db.branchBalance;
const CabangKantor = db.cabangKantor;
const User = db.user;

moment.locale('id');

module.exports.incomeReport = async (req, res) => {
  const { code } = req.params;
  // filter branch
  // filter date range
  const dataMortgage = await MortgagePayment.find({
    // mortgageCode: {
    //   $regex: code.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
    //   $options: 'i',
    // },
    // paymentStatus: 'Initial Payment',
    isDeleted: false,
    isMigrated: false,
    isRepayment: false,
    paymentDate: {
      $gte: '2022-01-18T17:00:01.000Z',
      $lt: '2022-01-19T17:00:01.000Z',
    },
  })
    .select(
      'mortgageCode paymentStatus updatedAt paymentLeft paymentValue interestValue'
    )
    .exec();
  const workbook = new excelJS.Workbook();
  await workbook.xlsx.readFile(
    '/home/r/Documents/Kerja/RumahGadai/Dev/rumahgadai-backend/resources/dynamic/assets/income_report_template.xlsx'
  );
  const worksheet = workbook.getWorksheet('Sheet1');
  worksheet.getCell('C2').value = code;
  worksheet.getCell('D2').value = moment.tz('Asia/Jakarta').format('lll');

  dataMortgage.forEach((data, index) => {
    const currentRow = index + 6;
    worksheet.getCell(`A${currentRow}`).value = index + 1;
    worksheet.getCell(`B${currentRow}`).value = moment
      .tz(data.updatedAt, 'Asia/Jakarta')
      .format('DD-MM-YYYY');
    worksheet.getCell(`C${currentRow}`).value = data.mortgageCode;
    worksheet.getCell(`D${currentRow}`).value = 0;
    worksheet.getCell(`E${currentRow}`).value = 0;
    worksheet.getCell(`F${currentRow}`).value = 0;
    worksheet.getCell(`G${currentRow}`).value = 0;
    worksheet.getCell(`H${currentRow}`).value = 0;
    worksheet.getCell(`I${currentRow}`).value = 0;
    worksheet.getCell(`J${currentRow}`).value = 0;
    worksheet.getCell(`K${currentRow}`).value = 0;
    if (data.paymentStatus === 'Initial Payment') {
      worksheet.getCell(`D${currentRow}`).value = data.paymentLeft;
    } else if (data.paymentStatus === 'Extend') {
      worksheet.getCell(`E${currentRow}`).value = data.paymentValue;
      worksheet.getCell(`F${currentRow}`).value = data.interestValue;
    } else if (data.paymentStatus === 'Completed') {
      worksheet.getCell(`G${currentRow}`).value = data.paymentValue;
      worksheet.getCell(`H${currentRow}`).value = data.interestValue;
    } else if (data.paymentStatus === 'Repayment') {
      worksheet.getCell(`I${currentRow}`).value =
        data.paymentLeft + data.paymentValue;
      worksheet.getCell(`J${currentRow}`).value = data.paymentValue;
      worksheet.getCell(`K${currentRow}`).value = data.interestValue;
    } else if (data.paymentStatus === 'Mortgaged') {
      worksheet.getCell(`L${currentRow}`).value = 'Barang diluar masa gadai';
    }
  });
  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  );
  res.setHeader('Content-Disposition', 'attachment; filename=LH_RG_ALL.xlsx');

  workbook.xlsx.write(res).then(() => {
    res.status(200).end();
  });
};

module.exports.dailyIncome = async (req, res) => {
  const { branchCode } = req.params;
  const { startDate } = req.params;
  const dataMortgage = await MortgagePayment.find({
    mortgageCode: {
      $regex: branchCode.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
      $options: 'i',
    },
    isDeleted: false,
    isMigrated: false,
    isRepayment: false,
    paymentDate: {
      $gte: moment
        .tz(startDate, 'Asia/Jakarta')
        .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
        .toISOString(),
      $lt: moment
        .tz(startDate, 'Asia/Jakarta')
        .set({ hour: 23, minute: 59, second: 59, millisecond: 0 })
        .toISOString(),
    },
  })
    .select(
      'mortgageCode paymentStatus updatedAt paymentLeft paymentValue interestValue newMortgageCode'
    )
    .exec();
  res.send(dataMortgage);
};

module.exports.dailyIncomeAllBranch = async (req, res) => {
  const { startDate } = req.params;
  const dataMortgage = await MortgagePayment.find({
    isDeleted: false,
    isMigrated: false,
    isRepayment: false,
    paymentDate: {
      $gte: moment
        .tz(startDate, 'Asia/Jakarta')
        .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
        .toISOString(),
      $lt: moment
        .tz(startDate, 'Asia/Jakarta')
        .set({ hour: 23, minute: 59, second: 59, millisecond: 0 })
        .toISOString(),
    },
  })
    .select(
      'mortgageCode paymentStatus updatedAt paymentLeft paymentValue interestValue newMortgageCode'
    )
    .exec();
  res.send(dataMortgage);
};

module.exports.downloadDailyIncome = async (req, res) => {
  const branchCode = req.query.branch;
  const startDate = req.query.date;
  const loggedUser = await User.findById(req.userId).exec();
  const dataMortgage = await MortgagePayment.find({
    mortgageCode: {
      $regex:
        branchCode === 'PUSAT' || !branchCode
          ? ''
          : branchCode.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
      $options: 'i',
    },
    isDeleted: false,
    isMigrated: false,
    isRepayment: false,
    paymentDate: {
      $gte: moment
        .tz(startDate, 'Asia/Jakarta')
        .set({ hour: 0, minute: 0, second: 1, millisecond: 0 })
        .toISOString(),
      $lt: moment
        .tz(startDate, 'Asia/Jakarta')
        .set({ hour: 23, minute: 59, second: 59, millisecond: 0 })
        .toISOString(),
    },
  })
    .select(
      'mortgageCode paymentStatus updatedAt paymentLeft paymentValue interestValue newMortgageCode'
    )
    .exec();
  const [branchBalance] = await BranchBalance.find({
    branch: branchCode,
    date: moment
      .tz(req.query.date, 'Asia/Jakarta')
      .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
      .toISOString(),
  })
    .select('initialBalance topUp')
    .exec();

  const workbook = new excelJS.Workbook();
  await workbook.xlsx.readFile(
    path.resolve(__dirname, '../../resources/dynamic/assets/LH.xlsx')
  );
  const worksheet = workbook.getWorksheet('Sheet1');
  worksheet.getCell('A2').value = branchCode;
  worksheet.getCell('A3').value = moment
    .tz(startDate, 'Asia/Jakarta')
    .format('LL');
  worksheet.getCell('I4').value = moment.tz('Asia/Jakarta').format('LLLL');
  worksheet.getCell('I5').value = loggedUser.nama_user;
  // let initialBalance = 0;
  // let finalBalance = 0;
  // let topUp = 0;
  // let totalBase = 0;
  // let totalInterest = 0;
  // let countNewMortgage = 0;
  // let countExtend = 0;
  // let countRepayment = 0;
  // let countCompleted = 0;
  let totalExpense = 0;
  let totalInterestExtend = 0;
  let totalBaseCompleted = 0;
  let totalInterestCompleted = 0;
  let totalBaseRepayment = 0;
  let totalInterestRepayment = 0;

  dataMortgage.forEach((data, idx) => {
    const row = 15 + idx;
    worksheet.getCell(`A${row}`).value = idx + 1;
    worksheet.getCell(`B${row}`).value = moment
      .tz(data.updatedAt, 'Asia/Jakarta')
      .format('ll (LT)');
    worksheet.getCell(`C${row}`).value = data.mortgageCode;
    worksheet.getCell(`D${row}`).value = data?.newMortgageCode || '-';
    worksheet.getCell(`E${row}`).value = 0;
    worksheet.getCell(`F${row}`).value = 0;
    worksheet.getCell(`G${row}`).value = 0;
    worksheet.getCell(`H${row}`).value = 0;
    worksheet.getCell(`I${row}`).value = 0;
    worksheet.getCell(`J${row}`).value = 0;
    worksheet.getCell(`K${row}`).value = '';
    if (data.paymentStatus === 'Initial Payment') {
      worksheet.getCell(`E${row}`).value = data.paymentLeft;
      totalExpense += data.paymentLeft;
      // countNewMortgage += 1;
    } else if (data.paymentStatus === 'Extend') {
      worksheet.getCell(`H${row}`).value = data.paymentLeft;
      worksheet.getCell(`J${row}`).value = data.interestValue;
      totalInterestExtend += data.interestValue;
      // countExtend += 1;
    } else if (data.paymentStatus === 'Completed') {
      worksheet.getCell(`F${row}`).value = data.paymentValue;
      worksheet.getCell(`G${row}`).value = data.interestValue;
      totalBaseCompleted += data.paymentValue;
      totalInterestCompleted += data.interestValue;
      // countCompleted += 1;
    } else if (data.paymentStatus === 'Repayment') {
      worksheet.getCell(`H${row}`).value = data.paymentLeft + data.paymentValue;
      worksheet.getCell(`I${row}`).value = data.paymentValue;
      worksheet.getCell(`J${row}`).value = data.interestValue;
      totalBaseRepayment += data.paymentValue;
      totalInterestRepayment += data.interestValue;
      // countRepayment += 1;
    }
  });
  worksheet.getCell('C4').value = branchBalance?.initialBalance;
  worksheet.getCell('C5').value = branchBalance?.topUp;
  worksheet.getCell('C6').value =
    (branchBalance?.initialBalance || 0) +
    (branchBalance?.topUp || 0) -
    (totalExpense || 0);
  worksheet.getCell('E4').value = totalBaseCompleted + totalBaseRepayment;
  worksheet.getCell('E5').value =
    totalInterestCompleted + totalInterestExtend + totalInterestRepayment;
  worksheet.getCell('E6').value =
    totalBaseCompleted +
    totalBaseRepayment +
    totalInterestCompleted +
    totalInterestExtend +
    totalInterestRepayment;
  worksheet.getCell('E12').value = totalExpense;
  worksheet.getCell('F12').value = totalBaseCompleted;
  worksheet.getCell('G12').value = totalInterestCompleted;
  worksheet.getCell('I12').value = totalBaseRepayment;
  worksheet.getCell('J12').value = totalInterestExtend + totalInterestRepayment;

  const today = moment.tz('Asia/Jakarta').format('lll').replace(/ /g, '_');
  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  );
  res.setHeader(
    'Content-Disposition',
    `attachment; filename=LH_${branchCode}_${today}.xlsx`
  );
  workbook.xlsx.write(res).then(() => {
    res.status(200).end();
  });
};

module.exports.recapDailyIncome = async (req, res) => {
  const { startDate } = req.query;
  const dataMortgage = await MortgagePayment.find({
    isDeleted: false,
    isMigrated: false,
    isRepayment: false,
    paymentDate: {
      $gte: moment
        .tz(startDate, 'Asia/Jakarta')
        .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
        .toISOString(),
      $lt: moment
        .tz(startDate, 'Asia/Jakarta')
        .set({ hour: 23, minute: 59, second: 59, millisecond: 0 })
        .toISOString(),
    },
  })
    .select(
      'paymentDate mortgageCode paymentStatus updatedAt paymentLeft paymentValue interestValue newMortgageCode'
    )
    .sort({ mortgageCode: 1, _id: 1 })
    .exec();
  const dataBranch = await CabangKantor.find({})
    .select('kode_cabang')
    .sort({ kode_cabang: 1, _id: 1 })
    .exec();
  const listIncomeBranch = [];
  dataBranch.forEach((branch) => {
    const branchCode = branch.kode_cabang;
    let countNewMortgage = 0;
    let countExtend = 0;
    let countRepayment = 0;
    let countCompleted = 0;
    let totalExpense = 0;
    let totalInterestExtend = 0;
    let totalBaseCompleted = 0;
    let totalInterestCompleted = 0;
    let totalBaseRepayment = 0;
    let totalInterestRepayment = 0;

    dataMortgage.forEach((mortgagePayment) => {
      if (mortgagePayment.mortgageCode.split('-')[0] === branchCode) {
        if (mortgagePayment.paymentStatus === 'Initial Payment') {
          totalExpense += mortgagePayment.paymentLeft;
          countNewMortgage += 1;
        } else if (mortgagePayment.paymentStatus === 'Extend') {
          totalInterestExtend += mortgagePayment.interestValue;
          countExtend += 1;
        } else if (mortgagePayment.paymentStatus === 'Completed') {
          totalBaseCompleted += mortgagePayment.paymentValue;
          totalInterestCompleted += mortgagePayment.interestValue;
          countCompleted += 1;
        } else if (mortgagePayment.paymentStatus === 'Repayment') {
          totalBaseRepayment += mortgagePayment.paymentValue;
          totalInterestRepayment += mortgagePayment.interestValue;
          countRepayment += 1;
        }
      }
    });
    listIncomeBranch.push({
      branchCode,
      countNewMortgage,
      countExtend,
      countRepayment,
      countCompleted,
      totalExpense,
      totalInterestExtend,
      totalBaseCompleted,
      totalInterestCompleted,
      totalBaseRepayment,
      totalInterestRepayment,
    });
  });
  res.send(listIncomeBranch);
};
