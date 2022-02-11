const router = require('express').Router();
const { authJwt } = require('../middlewares/index.js');
const cabangKantor = require('../controllers/cabangKantor.controller.js');

module.exports = (app) => {
  router.post('/createbranch', [authJwt.verifyToken], cabangKantor.create);
  router.get('/getbranch', [authJwt.verifyToken], cabangKantor.findAll);
  router.get('/getbranch/:id', [authJwt.verifyToken], cabangKantor.findOne);
  router.put('/updatebranch/:id', [authJwt.verifyToken], cabangKantor.update);
  router.delete(
    '/deletebranch/:id',
    [authJwt.verifyToken],
    cabangKantor.delete
  );
  router.get(
    '/listallbranch',
    [authJwt.verifyToken],
    cabangKantor.findAllAsList
  );
  app.use('/api/cabangkantor', router);
};
