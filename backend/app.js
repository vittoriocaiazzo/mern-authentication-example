const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const errorHandler = require('./controllers/errorController');

// importing routes
const userRouter = require('./routes/userRoutes');

// creating the app
const app = express();

// global middlewares
app.use(express.json()); // JSON parser for req.body
app.use(cookieParser()); // cookie parser

app.use(cors({ credentials: true, origin: 'http://localhost:3000' })); // using cors for localhost requests
app.options('*', cors());
app.use(function (req, res, next) {
  res.header('Content-Type', 'application/json;charset=UTF-8');
  res.header('Access-Control-Allow-Credentials', true);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(helmet()); // securing HTTP headers

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/', limiter); // Limit requests from same API
app.use(mongoSanitize()); // NOSQL injections protection
app.use(xss()); // XSS attacks protection
app.use(hpp()); // HTTP Parameter Pollution attacks protection

// routes
app.use('/api/v1/user', userRouter);

// errors
app.all('*', (req, res, next) => {
  res.status(404).json({
    success: 'false',
    message: 'Page not found',
    error: {
      statusCode: 404,
      message: 'You reached a route that is not defined on this server',
    },
  });
});

app.use(errorHandler);

module.exports = app;
