const router = require('express').Router();
// const { authJwt } = require('../middlewares/index.js');
const restaurant = require('../controllers/restaurant.controller.js');

module.exports = (app) => {
  router.get('/showallrestaurants', restaurant.showAllRestaurant);
  app.use('/api/restaurant', router);
};
