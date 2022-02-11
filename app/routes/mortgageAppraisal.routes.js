const router = require('express').Router();
const { authJwt } = require('../middlewares/index.js');
const mortgageAppraisal = require('../controllers/mortgageAppraisal.controller.js');

module.exports = (app) => {
  router.post('/create', [authJwt.verifyToken], mortgageAppraisal.create);
  router.get(
    '/showbycode/:code',
    [authJwt.verifyToken],
    mortgageAppraisal.findAppraisalByCode
  );
  app.use('/api/mortgageappraisal/', router);
};
