const router = require('express').Router();
const { authJwt } = require('../middlewares/index.js');
const mortgageDocument = require('../controllers/mortgageDocument.controller.js');

module.exports = (app) => {
  router.post('/create', [authJwt.verifyToken], mortgageDocument.create);
  router.get(
    '/showbycode/:code',
    [authJwt.verifyToken],
    mortgageDocument.findDocumentByCode
  );
  router.get(
    '/download/:filename',
    [authJwt.verifyToken],
    mortgageDocument.downloadDocument
  );
  app.use('/api/mortgagedocument', [authJwt.verifyToken], router);
};
