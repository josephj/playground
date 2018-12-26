function jumpingOnClouds(c) {
  let steps = 0;
  while (c.length > 1) {
    if (typeof c[2] !== 'undefined' && c[2] === 0) {
      steps += 1;
      c.splice(0, 2);
    } else if (typeof c[1] !== 'undefined' && c[1] === 0) {
      steps += 1;
      c.splice(0, 1);
    }
  }
  return steps;
}

console.log(jumpingOnClouds([0, 0, 1, 0, 0, 1, 0]));
