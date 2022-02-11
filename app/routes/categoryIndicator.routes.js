const router = require('express').Router();
const { authJwt } = require('../middlewares/index.js');
const categoryIndicator = require('../controllers/categoryIndicator.controller.js');

module.exports = (app) => {
  router.post('/', [authJwt.verifyToken], categoryIndicator.create);
  app.use('/api/categoryindicator', router);
};
