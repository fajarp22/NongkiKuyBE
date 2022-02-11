const mongoose = require('mongoose');
const dbConfig = require('../config/db.config.js');

mongoose.set('useCreateIndex', true);
const db = {};

db.mongoose = mongoose;
db.url = dbConfig.url;
db.urlDummy = dbConfig.urlDummy;
db.urlTest = dbConfig.urlTest;

db.cabangKantor = require('./cabangKantor.model.js')(mongoose);
db.nasabah = require('./nasabah.model.js')(mongoose);
db.peranUser = require('./peranUser.model.js')(mongoose);
db.user = require('./user.model.js')(mongoose);
db.province = require('./province.model.js')(mongoose);
db.regency = require('./regency.model.js')(mongoose);
db.district = require('./district.model.js')(mongoose);
db.village = require('./village.model.js')(mongoose);
db.itemCategory = require('./itemCategory.model.js')(mongoose);
db.categoryIndicator = require('./categoryIndicator.model.js')(mongoose);
db.indicatorChoice = require('./indicatorChoice.model.js')(mongoose);
db.item = require('./item.model.js')(mongoose);
db.mortgage = require('./mortgage.model.js')(mongoose);
db.mortgageAppraisal = require('./mortgageAppraisal.model.js')(mongoose);
db.mortgageDocument = require('./mortgageDocument.model.js')(mongoose);
db.mortgagePayment = require('./mortgagePayment.model.js')(mongoose);
db.branchBalance = require('./branchBalance.model.js')(mongoose);

module.exports = db;
