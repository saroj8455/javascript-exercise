// run `node index.js` in the terminal
import { greetMessage } from './common/common-message.js';
import { TimeZone } from './common/global-message.js';
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
