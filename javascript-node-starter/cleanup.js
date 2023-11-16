import { greetMessage, UserObject } from './common/common-message.js';
import { TimeZone } from './common/global-message.js';
import { House } from './model/house.model.js';
import {
  _isEmptyObject,
  convertCode,
  errorHandeler,
  states,
} from './utils/utils.js';

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

todoRouter.get('/', async (req, res, next) => {
  try {
    const todos = Todo.find({});
    res.status(StatusCodes.OK).jsonp({
      todos,
    });
  } catch (error) {
    next(error);
  }
});
