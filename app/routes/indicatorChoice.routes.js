const router = require('express').Router();
const { authJwt } = require('../middlewares/index.js');
const indicatorChoice = require('../controllers/indicatorChoice.controller.js');

module.exports = (app) => {
  router.post('/', [authJwt.verifyToken], indicatorChoice.create);
  app.use('/api/indicatorchoice', router);
};
