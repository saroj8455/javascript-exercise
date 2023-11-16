import connectToDB from './config/connect.js';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { House } from './models/house.model.js';
import express from 'express';
import winston from 'winston';
import { StatusCodes } from 'http-status-codes';
import routerTemplate from './routes/index.js';
import todoRouter from './routes/todo.routes.js';

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
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Import all router
app.use('/api/v1', routerTemplate);
app.use('/todo', todoRouter);

// Define route
app.get('/', async (req, res, next) => {
  // We destructure the req.query object to get the page and limit variables from url
  const { page = 1, limit = 5 } = req.query;
  try {
    const houses = await House.find({ ...req.query })
      // We multiply the "limit" variables by one just to make sure we pass a number and not a string
      .limit(limit * 1)
      // I don't think i need to explain the math here
      .skip((page - 1) * limit);
    // We sort the data by the date of their creation in descending order (user 1 instead of -1 to get ascending order)
    // .sort({ createdAt: -1 });

    // Getting the numbers of houses stored in database
    const count = await House.countDocuments();

    return res.status(200).json({
      houses,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
    // // Access the provided 'page' and 'limt' query parameters
    // let _page = req.query.page;
    // let _limit = req.query.limit;
    // // const houses = await House.find({}).limit(2);
    // // Implement pagination
    // const houses = await House.find({});
    // res.status(StatusCodes.OK).jsonp({
    //   message: 'OK , API check done',
    //   houses,
    // });
    // 46782 + 6232
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
