// add(2, 5); // 7
// add(2)(5); // 7

function add(num1, num2) {
  if (num2) {
    return num1 + num2;
  }
  return num2 => {
    return num1 + num2;
  };
}

console.log(add(2, 5));
console.log(add(2)(5));
