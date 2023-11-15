import connectToDB from './config/connect.js';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { House } from './model/house.model.js';
import express from 'express';
import winston, { Logger } from 'winston';

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
    new winston.transports.File({ filename: `logs/${Date.now()}.log` }),
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

// Define route
app.get('/', async (req, res, next) => {
  try {
    const houses = await House.find({});
    res.status(200).jsonp({
      message: 'OK , API check done',
      houses,
    });
  } catch (error) {
    next(error);
  }
});
// This should be the last route else any after it wont work
app.use('*', (req, res) => {
  res.status(404).json({
    success: 'false',
    message: 'Page not found',
    error: {
      statusCode: 404,
      message: 'You reached a route that is not defined on this server',
    },
  });
});

// Error handeler
const errorHandel = (eror, req, res, next) => {
  console.log(error);
  res.status(500).send('Something broke!');
};
app.use(errorHandel);

app.listen(PORT, () => {
  console.log(`Server is running on port htpp://localhost:${PORT}`);
});
