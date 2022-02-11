const moment = require('moment-timezone');
// const mongoose = require('mongoose');
const db = require('../models/index.js');

moment.locale('id');
const Nasabah = db.nasabah;

module.exports.showAllRestaurant = async (req, res) => {
  const restaurants = await Nasabah.find({})
    .sort({ id: -1 })
    .select('nama_nasabah')
    .lean()
    .exec();
  res.send(restaurants);
};
