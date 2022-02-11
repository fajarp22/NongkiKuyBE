const router = require('express').Router();
const { authJwt } = require('../middlewares/index.js');
const user = require('../controllers/user.controller.js');

module.exports = (app) => {
  router.post('/', [authJwt.verifyToken], user.create);
  router.post('/signin', user.signin);
  router.get('/me', [authJwt.verifyToken], user.getUserByToken);
  router.post('/show', [authJwt.verifyToken], user.findAll);
  router.get('/:id', [authJwt.verifyToken], user.findOne);
  router.put('/:id', [authJwt.verifyToken], user.update);
  router.delete('/:id', [authJwt.verifyToken], user.delete);

  app.use('/api/user', router);
};
