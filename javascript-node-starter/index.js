// run `node index.js` in the terminal
import { greetMessage, UserObject } from './common/common-message.js';
import { TimeZone } from './common/global-message.js';
import connectToDB from './config/connect.js';
import * as dotenv from 'dotenv';
import { _isEmptyObject, convertCode, states } from './utils/utils.js';
import { House } from './model/house.model.js';

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
