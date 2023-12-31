export function _isEmptyObject(obj) {
  if (Object.keys(obj).length === 0) {
    console.log('Empty');
    return true;
  }
  console.log('Not empty');
  return false;
}
export const states = [
  { name: 'BLR', code: 'Balangir' },
  { name: 'SBP', code: 'Samblpur' },
  { name: 'SNP', code: 'Sonepur' },
];

export function convertCode(inputArrayObject) {
  let stringArray;
  if (Array.isArray(inputArrayObject)) {
    stringArray = inputArrayObject.map((st) => {
      return st.code;
    });
  }
  return stringArray;
}

const numbersOfCount = [1, 2, 3];
const maxNum = Math.max(...numbersOfCount);
console.log(maxNum); // 3

const geoLocation = {
  loc: 'INDIA-BLR',
  getGeo: function () {
    return this.loc;
  },
};

console.log(geoLocation.getGeo()); //INDIA-BLR

export function errorHandeler(error, req, res, next) {
  console.error(error);
  return res
    .status(500)
    .jsonp({ message: 'Something went wrong, Try after sometime.' });
}
