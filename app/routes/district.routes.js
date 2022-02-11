const router = require('express').Router();
const { authJwt } = require('../middlewares/index.js');
const district = require('../controllers/district.controller.js');

module.exports = (app) => {
  router.post('/', [authJwt.verifyToken], district.show);
  router.post('/getname', [authJwt.verifyToken], district.getName);
  app.use('/api/district', router);
};
