const router = require('express').Router();
const { authJwt } = require('../middlewares/index.js');
const regency = require('../controllers/regency.controller.js');

module.exports = (app) => {
  router.post('/', [authJwt.verifyToken], regency.show);
  router.post('/getname', [authJwt.verifyToken], regency.getName);
  app.use('/api/regency', router);
};
