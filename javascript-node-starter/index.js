import connectToDB from './config/connect.js';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { House } from './model/house.model.js';
import express from 'express';
import winston from 'winston';
import { StatusCodes } from 'http-status-codes';
import routerTemplate from './routes/index.js';

dotenv.config();

// Connect to Mongoose DB
connectToDB();

const app = express();
const PORT = process.env.PORT || 3001;

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(
      (info) => ` ${info.timestamp} ${info.level}:${info.message}`
    )
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: `logs/app.log` }),
  ],
});

// Cross Origin Resource Sharing
const whitelist = ['https://www.yoursite.com', 'http://localhost:3500'];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowedby CORS'));
    }
  },
};

app.use((req, res, next) => {
  logger.info(` Received a ${req.method} request for ${req.url}`);
  next();
});

// Allow all for devlopment env
app.use(cors());

// Allow specific domain for prod env
// app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import all router
app.use('/api/v1', routerTemplate);

// Define route
app.get('/', async (req, res, next) => {
  try {
    const houses = await House.find({});
    res.status(StatusCodes.OK).jsonp({
      message: 'OK , API check done',
      houses,
    });
  } catch (error) {
    next(error);
  }
});

app.get('/mock-error', (req, res, next) => {
  try {
    throw new Error('Mock error');
  } catch (error) {
    next(error);
  }
});

// This should be the last route else any after it wont work
app.use('*', (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: 'false',
    message: 'Page not found',
    error: {
      statusCode: StatusCodes.NOT_FOUND,
      message: 'You reached a route that is not defined on this server',
    },
  });
});

// Error handeler
const errorHandel = (eror, req, res, next) => {
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).jsonp({
    message: 'Something went wrong.',
    error: eror.message || '',
  });
};
app.use(errorHandel);

app.listen(PORT, () => {
  console.log(`Server is running on port htpp://localhost:${PORT}`);
});
