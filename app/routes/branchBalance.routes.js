const router = require('express').Router();
// const { authJwt } = require('../middlewares/index.js');
const branchBalance = require('../controllers/branchBalance.controller.js');

module.exports = (app) => {
  router.post('/createbranchbalance', branchBalance.createBranchBalance);
  router.get('/findbranchbalance', branchBalance.findBranchBalance);
  app.use('/api/branchbalance', router);
};
