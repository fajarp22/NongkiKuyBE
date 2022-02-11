const router = require('express').Router();
const { authJwt } = require('../middlewares/index.js');
const province = require('../controllers/province.controller.js');

module.exports = (app) => {
  router.get('/', [authJwt.verifyToken], province.show);
  router.post('/getname', [authJwt.verifyToken], province.getName);
  app.use('/api/province', router);
};
