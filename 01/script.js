let square = {
  side:5,
  get area() {
    return this.area ** 2;
  }
}

square.side = 5
console.log(square.area)

// run `node index.js` in the terminal

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