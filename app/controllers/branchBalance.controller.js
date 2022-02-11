const moment = require('moment-timezone');
const db = require('../models/index.js');

const BranchBalance = db.branchBalance;
moment.locale('id');

// module exports
module.exports.createBranchBalance = async (req, res) => {
  try {
    const data = await BranchBalance.findOneAndUpdate(
      {
        branch: req.body.branch,
        date: moment
          .tz(req.body.date, 'Asia/Jakarta')
          .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
          .toISOString(),
      },
      {
        initialBalance: req.body.initialBalance,
        topUp: req.body.topUp,
        createdBy: req.body.createdBy,
      },
      { upsert: true, useFindAndModify: false, new: true }
    );
    res.send({ data, status: 'success' });
  } catch (error) {
    res.send({ status: 'error', message: error.message });
  }
};

module.exports.findBranchBalance = async (req, res) => {
  try {
    const data = await BranchBalance.find({
      branch: req.query.branch,
      date: moment
        .tz(req.query.date, 'Asia/Jakarta')
        .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
        .toISOString(),
    });
    res.send({ data, status: 'success' });
  } catch (error) {
    res.send({ status: 'error', message: error.message });
  }
};
