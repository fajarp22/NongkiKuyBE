const router = require('express').Router();
const { authJwt } = require('../middlewares/index.js');
const itemCategory = require('../controllers/itemCategory.controller.js');

module.exports = (app) => {
  router.post('/', [authJwt.verifyToken], itemCategory.create);
  router.post('/migrate', [authJwt.verifyToken], itemCategory.migrate);
  router.post('/migrateall', [authJwt.verifyToken], itemCategory.migrateAll);
  router.get(
    '/showitemcategory',
    [authJwt.verifyToken],
    itemCategory.showItemCategory
  );
  router.get(
    '/showitemcategory/:id',
    [authJwt.verifyToken],
    itemCategory.showOneItemCategory
  );
  router.get(
    '/showdetailitemcategory/:id',
    [authJwt.verifyToken],
    itemCategory.showDetailItemCategory
  );
  router.get(
    '/showparentitemcategory',
    [authJwt.verifyToken],
    itemCategory.showParentItemCategory
  );
  router.get(
    '/showselecteditemcategory/:id',
    [authJwt.verifyToken],
    itemCategory.showSelectedItemCategory
  );
  router.get(
    '/showchilditemcategory',
    [authJwt.verifyToken],
    itemCategory.showChildItemCategory
  );
  router.post(
    '/updatetree',
    [authJwt.verifyToken],
    itemCategory.updateTreeCategory
  );
  app.use('/api/itemcategory', router);
};
