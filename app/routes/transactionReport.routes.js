const router = require('express').Router();
const { authJwt } = require('../middlewares/index.js');
const transactionReport = require('../controllers/transactionReport.controller.js');

module.exports = (app) => {
  router.get('/incomereport/:code', transactionReport.incomeReport);
  router.get(
    '/dailyincome/:branchCode/:startDate',
    [authJwt.verifyToken],
    transactionReport.dailyIncome
  );
  router.get(
    '/dailyincomeallbranch/:startDate',
    [authJwt.verifyToken],
    transactionReport.dailyIncomeAllBranch
  );
  router.get(
    '/downloaddailyincome',
    [authJwt.verifyToken],
    transactionReport.downloadDailyIncome
  );
  router.get('/recapdailyincome', transactionReport.recapDailyIncome);
  app.use('/api/transactionreport', router);
};
