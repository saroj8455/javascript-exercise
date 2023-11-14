let square = {
  side:5,
  get area() {
    return this.area ** 2;
  }
}

square.side = 5
console.log(square.area)