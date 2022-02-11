const router = require('express').Router();
const { authJwt } = require('../middlewares/index.js');
const mortgage = require('../controllers/mortgage.controller.js');

module.exports = (app) => {
  router.get('/showbyid/:id', [authJwt.verifyToken], mortgage.findMortgageById);
  router.get(
    '/generatecode/:branchcode',
    [authJwt.verifyToken],
    mortgage.generateCode
  );
  router.get(
    '/printmortgage/:code',
    [authJwt.verifyToken],
    mortgage.printByCode
  );
  router.get('/printsbg/:id', [authJwt.verifyToken], mortgage.printById);
  router.get('/printsbper/:id', [authJwt.verifyToken], mortgage.printSBPer);
  router.get('/printsbpel/:id', [authJwt.verifyToken], mortgage.printSBPel);
  router.get(
    '/checkidentity/:id/:itemCategoryId',
    [authJwt.verifyToken],
    mortgage.checkIdentityMortgage
  );
  router.post('/show', [authJwt.verifyToken], mortgage.findAll);
  router.post('/create', [authJwt.verifyToken], mortgage.create);
  router.get('/generateso/:code', mortgage.generateStockOpname);
  router.get(
    '/checkextend/:mortgagecode',
    [authJwt.verifyToken],
    mortgage.checkExtend
  );
  router.get('/makemortgageobsolete/:id', mortgage.makeMortgageObsolete);
  router.post(
    '/addlogmortgage',
    [authJwt.verifyToken],
    mortgage.addMortgageLog
  );
  // router.get('/scanmortgage', mortgage.scanMortgage);
  app.use('/api/mortgage', router);
};
