const router = require('express').Router();
const { authJwt } = require('../middlewares/index.js');
const item = require('../controllers/item.controller.js');

module.exports = (app) => {
  router.post('/', [authJwt.verifyToken], item.create);
  router.put('/:id', [authJwt.verifyToken], item.update);
  router.delete('/:id', [authJwt.verifyToken], item.delete);
  router.post('/show', [authJwt.verifyToken], item.findAll);
  router.get('/show/:id', [authJwt.verifyToken], item.findOne);
  router.get('/showbycategory/:id', [authJwt.verifyToken], item.findByCategory);
  router.get('/generatecode/:id', [authJwt.verifyToken], item.generateItemCode);
  router.get('/generateid', [authJwt.verifyToken], item.generateItemId);
  router.get('/showall', [authJwt.verifyToken], item.findAll2);
  router.get('/showbyid/:id', [authJwt.verifyToken], item.findOneById);
  router.post('/migrate', [authJwt.verifyToken], item.migrateItems);
  router.put(
    '/migrate/addinfomigrate',
    [authJwt.verifyToken],
    item.addInfoMigrate
  );
  app.use('/api/item', router);
};
