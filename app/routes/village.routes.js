const router = require('express').Router();
const { authJwt } = require('../middlewares/index.js');
const village = require('../controllers/village.controller.js');

module.exports = (app) => {
  router.post('/', [authJwt.verifyToken], village.show);
  router.post('/getname', [authJwt.verifyToken], village.getName);

  app.use('/api/village', router);
};
