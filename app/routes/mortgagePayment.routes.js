const router = require('express').Router();
const { authJwt } = require('../middlewares/index.js');
const mortgagePayment = require('../controllers/mortgagePayment.controller.js');

module.exports = (app) => {
  router.post('/create', [authJwt.verifyToken], mortgagePayment.create);
  router.get(
    '/showbycode/:code',
    [authJwt.verifyToken],
    mortgagePayment.findPaymentByCode
  );
  app.use('/api/mortgagepayment', [authJwt.verifyToken], router);
};
