// run `node index.js` in the terminal
import { greetMessage, UserObject } from './common/common-message.js';
import { TimeZone } from './common/global-message.js';
import connectToDB from './config/connect.js';
import * as dotenv from 'dotenv';
import {
  _isEmptyObject,
  convertCode,
  errorHandeler,
  states,
} from './utils/utils.js';
import { House } from './model/house.model.js';
import express from 'express';

dotenv.config();

// Connect to Mongoose DB
connectToDB();

let hi = {
  name: 'Hi Team',
  get _name() {
    return this.name;
  },
};

function checkEmptyObject(obj) {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }
  return true;
}

// console.log(checkEmptyObject(UserObject));
const user = { username: 'Jhon Deo' };
const test = {};
// console.log(_isEmptyObject(user));
// console.log(_isEmptyObject({}));

// console.log(convertCode(states)); // [ 'Balangir', 'Samblpur', 'Sonepur' ]

async function getHouses() {
  const houses = await House.find({});
  console.log(houses.length);
}

getHouses();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

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
  if (!eror) {
    return next();
  }
  console.log(error);
  res.status(500).send('Something broke!');
};
app.use(errorHandel);
app.listen(PORT, () => {
  console.log(`Server is running on port htpp://localhost:${PORT}`);
});
