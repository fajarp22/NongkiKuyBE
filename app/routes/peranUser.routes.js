const router = require('express').Router();
const { authJwt } = require('../middlewares/index.js');
const peranUser = require('../controllers/peranUser.controller.js');

module.exports = (app) => {
  router.post('/', [authJwt.verifyToken], peranUser.create);
  router.get('/', [authJwt.verifyToken], peranUser.findAll);
  router.get('/:id', [authJwt.verifyToken], peranUser.findOne);
  router.put('/:id', [authJwt.verifyToken], peranUser.update);
  router.delete('/:id', [authJwt.verifyToken], peranUser.delete);
  app.use('/api/peran-user', router);
};
