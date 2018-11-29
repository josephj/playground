// Lilah has a string `s`, of lowercase English letters that she repeated infinitely many times.
// Given an integer `n`, , find and print the number of letter a's in the first n letters of Lilah's infinite string.
//For example, if the string s='abcac' and n=10 , the substring we consider is 'abcacabcac', the first 10 characters of her infinite string. There are 4 occurrences of 'a' in the substring.

// function repeatedString(s, n) {
//   if (s === 'a' && s.length === 1) {
//     return n;
//   }
//   let a = s.length
//   const times = Math.floor(n / s.length);
//   const remainder = n >= s.length ? n % s.length : s.length;
//   let index = -1;
//   let str = [];
//   while (++index < times) {
//     str.push(s);
//   }
//   str = str.join('') + s.substr(0, remainder);
//   const matches = str.match(/a/g);
//   return matches ? matches.length : 0;
// }

function repeatedString(s, n) {
  const calc = str => {
    const matches = str.match(/a/g);
    return matches ? matches.length : 0;
  };

  const times = Math.floor(n / s.length);
  const remainChars = n >= s.length ? n % s.length : s.length;
  const remainStr = s.substr(0, Math.min(remainChars, n));

  return calc(s) * times + calc(remainStr);
}

let a = repeatedString('abcac', 10);
console.log(a === 4);

a = repeatedString('aba', 10);
console.log(a === 7);

a = repeatedString('ba', 10);
console.log(a === 5);

a = repeatedString('ba', 2);
console.log(a === 1); // 1

a = repeatedString('ba', 1);
console.log(a === 0); // 0

a = repeatedString('ceebbcb', 817723);
console.log(a === 0);

a = repeatedString('a', 1000000000000);
console.log(a === 1000000000000);

a = repeatedString(
  'kmretasscityylpdhuwjirnqimlkcgxubxmsxpypgzxtenweirknjtasxtvxemtwxuarabssvqdnktqadhyktagjxoanknhgilnm',
  736778906400
);
console.log(a === 51574523448);
