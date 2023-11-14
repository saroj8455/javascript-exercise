// run `node index.js` in the terminal
import { greetMessage, UserObject } from './common/common-message.js';
import { TimeZone } from './common/global-message.js';
import connectToDB from './config/connect.js';
import * as dotenv from 'dotenv';

dotenv.config();

// Connect to Mongoose DB
connectToDB();

let hi = {
  name: 'Hi Team',
  get _name() {
    return this.name;
  },
};

console.log(hi._name);

const emptyCheck = (inputArray) => {
  console.log(inputArray);
};

emptyCheck([1, 2, 3, 45, 6]);

console.log(greetMessage);
console.log(TimeZone);
console.log(UserObject);

function checkEmptyObject(obj) {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }
  return true;
}

console.log(checkEmptyObject(UserObject));
