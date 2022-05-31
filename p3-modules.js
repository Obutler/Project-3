function validDenomination(coin) {
  const index = [1, 5, 10, 25, 50, 100].indexOf(coin);
  return index >= 0;
}
// indeOf returns the index (starting at 0) of a poisition of a ceetain variable within the array.
// return index >=0 means that everything will be true because it returns -1 if the thing it is looking for is not there.

function valueFromCoinObject(obj) {
  const { count = 0, denom = 0 } = obj;
  return count * denom;
}
//object destructuring here (dont use : to define a number, use =. use {} to re-define the values in a parameter  )

function valueFromArray(arr) {
  return arr.reduce(
    (accumulator, obj) =>
      Array.isArray(obj)
        ? valueFromArray(obj)
        : accumulator + valueFromCoinObject(obj),
    0
  );
}

// ternary opertator is a shortcut for if else. The conditional (ternary) operator is the only JavaScript operator that takes three operands:
//a condition followed by a question mark ( ? ), then an expression to execute if the condition is truthy followed by a colon ( : ),
//and finally the expression to execute if the condition is falsy.

// reduce goes through every item in an array and does something depending on the function parameter. in this example, set intial value to zero and
// then add every item together as it scans item by item.

function coinCount(...coinage) {
  return valueFromArray(coinage);
}

// defining the function for export
module.exports = {
  coinCount: function (...coinage) {
    return valueFromArray(coinage);
  },
};

console.log("{}", coinCount({ denom: 5, count: 3 }));
console.log("{}s", coinCount({ denom: 5, count: 3 }, { denom: 10, count: 2 }));
const coins = [
  { denom: 25, count: 2 },
  { denom: 1, count: 7 },
];
console.log("...[{}]", coinCount(...coins));
console.log("[{}]", coinCount(coins));

//Note: If you don't use curly braces for an arrow function then it will automatically return the value.
