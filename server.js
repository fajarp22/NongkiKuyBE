const express = require('express');
// const cron = require('node-cron');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const moment = require('moment-timezone');
require('dotenv').config();

moment.locale('id');

const app = express();

// eslint-disable-next-line no-underscore-dangle
global.__basedir = __dirname;

// const corsOptions = {
// origin: [
// "http://192.168.18.176:3005",
// "http://192.168.8.114:3005",
// 'http://192.168.1.35:3000',
// 'http://localhost:3005',
// 'http://localhost:3000',
// 'https://rumahgadai-backend.herokuapp.com',
// 'https://rumahgadai-backend-dummy.herokuapp.com',
// 'https://rumahgadai-frontend.vercel.app',
// 'https://rumahgadai-dummy.vercel.app',
// ],
// };

app.use(helmet());
app.use(compression());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));
app.use(cors());
app.use(morgan('combined'));
app.use(express.static('resources/static/assets/images'));

const db = require('./app/models/index.js');
// const { scanMortgage } = require('./app/controllers/mortgage.controller.js');

let url = '';
switch (process.env.STATUS) {
  case 'dummy':
    url = db.urlDummy;
    break;
  case 'development':
    url = db.url;
    break;
  case 'test':
    url = db.urlTest;
    break;
  default:
    break;
}

db.mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Connected to the ${process.env.STATUS} database!`);
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err);

    // eslint-disable-next-line no-process-exit
    process.exit();
  });

app.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token',
    'Origin',
    'Content-Type',
    'Accept'
  );
  next();
});

app.get('/', (req, res) => {
  res.send({ message: 'Rumah Gadai API Endpoint.' });
});

require('./app/routes/cabangKantor.routes.js')(app);
require('./app/routes/nasabah.routes.js')(app);
require('./app/routes/peranUser.routes.js')(app);
require('./app/routes/user.routes.js')(app);
require('./app/routes/province.routes.js')(app);
require('./app/routes/regency.routes.js')(app);
require('./app/routes/district.routes.js')(app);
require('./app/routes/village.routes.js')(app);
require('./app/routes/categoryIndicator.routes.js')(app);
require('./app/routes/indicatorChoice.routes.js')(app);
require('./app/routes/itemCategory.routes.js')(app);
require('./app/routes/item.routes.js')(app);
require('./app/routes/mortgage.routes.js')(app);
require('./app/routes/mortgageDocument.routes.js')(app);
require('./app/routes/mortgageAppraisal.routes.js')(app);
require('./app/routes/mortgagePayment.routes.js')(app);
require('./app/routes/transactionReport.routes.js')(app);
require('./app/routes/branchBalance.routes.js')(app);
require('./app/routes/restaurant.routes.js')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// console.log(moment.tz('Asia/Jakarta').format());

// scanMortgage();

// cron.schedule('01 00 * * *', scanMortgage);
