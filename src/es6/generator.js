// iterator is a object with value and done properties.

function* greet() {
  let msg = yield 'How'; // We can't assign anything to a newborn generator
  msg = yield msg + ' are '; // no yield no value
  yield msg + ' you'; // no yield no value
}

let greeter = greet();
console.log(greeter.next('blah').value);
console.log(greeter.next('the heck').value);
console.log(greeter.next('yoyo').value);

// for (let word of greeter) {
//   console.log(word);
// }
// console.log(greeter.next());
// console.log(greeter.next());
// console.log(greeter.next());
// console.log(greeter.next());
