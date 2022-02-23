const router = require('express').Router();
const { authJwt } = require('../middlewares/index.js');
const nasabah = require('../controllers/nasabah.controller.js');

module.exports = (app) => {
  router.post('/', [authJwt.verifyToken], nasabah.create);
  router.post('/show', [authJwt.verifyToken], nasabah.findAll);
  router.get('/:id', [authJwt.verifyToken], nasabah.findOne);
  router.put('/:id', [authJwt.verifyToken], nasabah.update);
  router.delete('/:id', [authJwt.verifyToken], nasabah.delete);
  router.post('/findbyidentity', [authJwt.verifyToken], nasabah.findByIdentity);
  router.post('/migrate', [authJwt.verifyToken], nasabah.migrateNasabah);
  router.post('/fixnasabah', [authJwt.verifyToken], nasabah.fixNasabah);
  router.post('/showkedai', nasabah.showKedai);
  app.use('/api/nasabah', router);
};
